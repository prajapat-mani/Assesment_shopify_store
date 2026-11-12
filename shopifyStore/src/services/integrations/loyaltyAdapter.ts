import { IntegrationStatus } from './reviewsAdapter';

export interface LoyaltyAccount {
  pointsBalance: number;
  tierName: string;
  nextTierPoints: number;
  availableDiscountDollars: number;
}

class MockLoyaltyAdapter {
  private status: IntegrationStatus = 'ONLINE';

  getStatus(): IntegrationStatus {
    return this.status;
  }

  setStatus(status: IntegrationStatus) {
    this.status = status;
  }

  toggleStatus(): IntegrationStatus {
    this.status = this.status === 'ONLINE' ? 'FALLBACK' : 'ONLINE';
    return this.status;
  }

  async getCustomerLoyalty(): Promise<LoyaltyAccount> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 200));

    if (this.status === 'FALLBACK') {
      throw new Error('Smile.io API unavailable: degraded to standard guest checkout.');
    }

    return {
      pointsBalance: 450,
      tierName: 'VIP Member',
      nextTierPoints: 500,
      availableDiscountDollars: 15,
    };
  }
}

export const loyaltyAdapter = new MockLoyaltyAdapter();
