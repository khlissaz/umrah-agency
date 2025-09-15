import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pilgrim, PilgrimStatus, Gender } from '../entities/pilgrim.entity';
import { CreatePilgrimDto } from './dto/create-pilgrim.dto';
import { UpdatePilgrimDto } from './dto/update-pilgrim.dto';

@Injectable()
export class PilgrimsService {
  constructor(
    @InjectRepository(Pilgrim)
    private pilgrimsRepository: Repository<Pilgrim>,
  ) {}

  async create(createPilgrimDto: CreatePilgrimDto): Promise<Pilgrim> {
    const pilgrim = this.pilgrimsRepository.create(createPilgrimDto);
    return this.pilgrimsRepository.save(pilgrim);
  }

  async findAll(
    page = 1,
    limit = 10,
    status?: PilgrimStatus,
    gender?: Gender,
    search?: string,
  ): Promise<{ pilgrims: Pilgrim[]; total: number }> {
    const query = this.pilgrimsRepository.createQueryBuilder('pilgrim')
      .leftJoinAndSelect('pilgrim.user', 'user')
      .leftJoinAndSelect('pilgrim.group', 'group');

    if (status) {
      query.andWhere('pilgrim.status = :status', { status });
    }

    if (gender) {
      query.andWhere('pilgrim.gender = :gender', { gender });
    }

    if (search) {
      query.andWhere(
        '(pilgrim.name ILIKE :search OR pilgrim.email ILIKE :search OR pilgrim.passportNumber ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [pilgrims, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('pilgrim.createdAt', 'DESC')
      .getManyAndCount();

    return { pilgrims, total };
  }

  async findOne(id: string): Promise<Pilgrim> {
    const pilgrim = await this.pilgrimsRepository.findOne({
      where: { id },
      relations: ['user', 'group', 'bookings'],
    });

    if (!pilgrim) {
      throw new NotFoundException('Pilgrim not found');
    }

    return pilgrim;
  }

  async update(id: string, updatePilgrimDto: UpdatePilgrimDto): Promise<Pilgrim> {
    const pilgrim = await this.findOne(id);
    Object.assign(pilgrim, updatePilgrimDto);
    return this.pilgrimsRepository.save(pilgrim);
  }

  async remove(id: string): Promise<void> {
    const pilgrim = await this.findOne(id);
    await this.pilgrimsRepository.remove(pilgrim);
  }

  async getStats(): Promise<any> {
    const total = await this.pilgrimsRepository.count();
    const confirmed = await this.pilgrimsRepository.count({
      where: { status: PilgrimStatus.CONFIRMED },
    });
    const visaProcessing = await this.pilgrimsRepository.count({
      where: { status: PilgrimStatus.VISA_PROCESSING },
    });
    const pending = await this.pilgrimsRepository.count({
      where: { status: PilgrimStatus.PENDING },
    });

    const byGender = await this.pilgrimsRepository
      .createQueryBuilder('pilgrim')
      .select('pilgrim.gender', 'gender')
      .addSelect('COUNT(*)', 'count')
      .groupBy('pilgrim.gender')
      .getRawMany();

    const byNationality = await this.pilgrimsRepository
      .createQueryBuilder('pilgrim')
      .select('pilgrim.nationality', 'nationality')
      .addSelect('COUNT(*)', 'count')
      .groupBy('pilgrim.nationality')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    return {
      total,
      confirmed,
      visaProcessing,
      pending,
      byGender: byGender.reduce((acc, item) => {
        acc[item.gender] = parseInt(item.count);
        return acc;
      }, {}),
      topNationalities: byNationality.map(item => ({
        nationality: item.nationality,
        count: parseInt(item.count),
      })),
    };
  }

  async bulkUpdateStatus(ids: string[], status: PilgrimStatus): Promise<void> {
    await this.pilgrimsRepository.update(ids, { status });
  }
}