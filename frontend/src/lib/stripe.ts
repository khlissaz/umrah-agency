import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export interface CreatePaymentIntentParams {
  amount: number;
  currency: string;
  customerId?: string;
  metadata?: Record<string, string>;
  description?: string;
  paymentMethodTypes?: string[];
}

export interface CreateCustomerParams {
  email: string;
  name: string;
  phone?: string;
  metadata?: Record<string, string>;
}

export interface CreateSubscriptionParams {
  customerId: string;
  priceId: string;
  metadata?: Record<string, string>;
}

export class StripeService {
  // Payment Intents
  static async createPaymentIntent(params: CreatePaymentIntentParams) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(params.amount * 100), // Convert to cents
        currency: params.currency.toLowerCase(),
        customer: params.customerId,
        metadata: params.metadata || {},
        description: params.description,
        payment_method_types: params.paymentMethodTypes || ['card'],
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error) {
      console.error('Stripe Payment Intent creation failed:', error);
      throw error;
    }
  }

  static async confirmPaymentIntent(paymentIntentId: string, paymentMethodId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
      });

      return paymentIntent;
    } catch (error) {
      console.error('Stripe Payment Intent confirmation failed:', error);
      throw error;
    }
  }

  static async getPaymentIntent(paymentIntentId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      console.error('Stripe Payment Intent retrieval failed:', error);
      throw error;
    }
  }

  // Customers
  static async createCustomer(params: CreateCustomerParams) {
    try {
      const customer = await stripe.customers.create({
        email: params.email,
        name: params.name,
        phone: params.phone,
        metadata: params.metadata || {},
      });

      return customer;
    } catch (error) {
      console.error('Stripe Customer creation failed:', error);
      throw error;
    }
  }

  static async getCustomer(customerId: string) {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      return customer;
    } catch (error) {
      console.error('Stripe Customer retrieval failed:', error);
      throw error;
    }
  }

  static async updateCustomer(customerId: string, params: Partial<CreateCustomerParams>) {
    try {
      const customer = await stripe.customers.update(customerId, {
        email: params.email,
        name: params.name,
        phone: params.phone,
        metadata: params.metadata,
      });

      return customer;
    } catch (error) {
      console.error('Stripe Customer update failed:', error);
      throw error;
    }
  }

  // Payment Methods
  static async attachPaymentMethod(paymentMethodId: string, customerId: string) {
    try {
      const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      return paymentMethod;
    } catch (error) {
      console.error('Stripe Payment Method attachment failed:', error);
      throw error;
    }
  }

  static async listPaymentMethods(customerId: string, type: string = 'card') {
    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: type as any,
      });

      return paymentMethods;
    } catch (error) {
      console.error('Stripe Payment Methods listing failed:', error);
      throw error;
    }
  }

  // Subscriptions (for installment payments)
  static async createSubscription(params: CreateSubscriptionParams) {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: params.customerId,
        items: [{ price: params.priceId }],
        metadata: params.metadata || {},
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      return subscription;
    } catch (error) {
      console.error('Stripe Subscription creation failed:', error);
      throw error;
    }
  }

  // Refunds
  static async createRefund(paymentIntentId: string, amount?: number, reason?: string) {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined,
        reason: reason as any,
      });

      return refund;
    } catch (error) {
      console.error('Stripe Refund creation failed:', error);
      throw error;
    }
  }

  // Webhooks
  static constructWebhookEvent(payload: string | Buffer, signature: string, secret: string) {
    try {
      const event = stripe.webhooks.constructEvent(payload, signature, secret);
      return event;
    } catch (error) {
      console.error('Stripe Webhook verification failed:', error);
      throw error;
    }
  }

  // Products and Prices (for packages)
  static async createProduct(name: string, description?: string, metadata?: Record<string, string>) {
    try {
      const product = await stripe.products.create({
        name,
        description,
        metadata: metadata || {},
      });

      return product;
    } catch (error) {
      console.error('Stripe Product creation failed:', error);
      throw error;
    }
  }

  static async createPrice(productId: string, amount: number, currency: string, recurring?: { interval: 'month' | 'year' }) {
    try {
      const price = await stripe.prices.create({
        product: productId,
        unit_amount: Math.round(amount * 100),
        currency: currency.toLowerCase(),
        recurring: recurring,
      });

      return price;
    } catch (error) {
      console.error('Stripe Price creation failed:', error);
      throw error;
    }
  }

  // Analytics
  static async getBalanceTransactions(limit: number = 100) {
    try {
      const transactions = await stripe.balanceTransactions.list({ limit });
      return transactions;
    } catch (error) {
      console.error('Stripe Balance Transactions retrieval failed:', error);
      throw error;
    }
  }

  static async getCharges(limit: number = 100, customerId?: string) {
    try {
      const charges = await stripe.charges.list({
        limit,
        customer: customerId,
      });

      return charges;
    } catch (error) {
      console.error('Stripe Charges retrieval failed:', error);
      throw error;
    }
  }

  // Installment Plans
  static async createInstallmentPlan(
    customerId: string,
    totalAmount: number,
    installments: number,
    currency: string = 'usd',
    metadata?: Record<string, string>
  ) {
    try {
      const installmentAmount = Math.round((totalAmount / installments) * 100);
      
      // Create a product for this installment plan
      const product = await this.createProduct(
        `Installment Plan - ${installments} payments`,
        `Payment plan for ${totalAmount} ${currency.toUpperCase()} over ${installments} installments`,
        metadata
      );

      // Create a recurring price
      const price = await this.createPrice(
        product.id,
        installmentAmount / 100,
        currency,
        { interval: 'month' }
      );

      // Create subscription
      const subscription = await this.createSubscription({
        customerId,
        priceId: price.id,
        metadata: {
          ...metadata,
          installment_plan: 'true',
          total_amount: totalAmount.toString(),
          installments: installments.toString(),
        },
      });

      return {
        product,
        price,
        subscription,
      };
    } catch (error) {
      console.error('Stripe Installment Plan creation failed:', error);
      throw error;
    }
  }
}

export default stripe;