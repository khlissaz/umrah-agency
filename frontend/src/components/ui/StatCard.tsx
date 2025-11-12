'use client';

import { LucideIcon } from 'lucide-react';
import { MotionBox } from './MotionBox';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'emerald' | 'blue' | 'purple' | 'orange';
  change: string;
  delay?: number;
}

const colorMap = {
  emerald: 'from-emerald-500 to-emerald-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600'
} as const;

export function StatCard({ title, value, icon: Icon, color, change, delay = 0 }: StatCardProps) {
  const gradient = colorMap[color];

  return (
    <MotionBox
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-sm text-emerald-600 mt-1">{change} from last month</p>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </MotionBox>
  );
}
