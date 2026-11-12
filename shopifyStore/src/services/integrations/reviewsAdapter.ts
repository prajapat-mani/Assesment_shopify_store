export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedBuyer: boolean;
}

export interface ReviewsResponse {
  averageRating: number;
  totalReviews: number;
  breakdown: Record<number, number>;
  reviews: ReviewItem[];
}

export type IntegrationStatus = 'ONLINE' | 'FALLBACK';

class MockReviewsAdapter {
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

  async getProductReviews(productId: string): Promise<ReviewsResponse> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 250));

    if (this.status === 'FALLBACK') {
      throw new Error(
        'Yotpo Reviews API Error: 502 Bad Gateway. Degrading gracefully to fallback view.'
      );
    }

    return {
      averageRating: 4.9,
      totalReviews: 1248,
      breakdown: { 5: 980, 4: 210, 3: 35, 2: 15, 1: 8 },
      reviews: [
        {
          id: 'rev-1',
          author: 'Alex M.',
          rating: 5,
          date: '2 days ago',
          title: 'Best gym gear I own',
          content: 'Fits tight across shoulders and chest, loose around the waist. Incredible breathable material for leg days.',
          verifiedBuyer: true,
        },
        {
          id: 'rev-2',
          author: 'Jordan K.',
          rating: 5,
          date: '1 week ago',
          title: 'Incredible silhouette & durability',
          content: 'Washed it 15 times already, zero pilling or fading. True to size.',
          verifiedBuyer: true,
        },
        {
          id: 'rev-3',
          author: 'Marcus D.',
          rating: 4,
          date: '2 weeks ago',
          title: 'Solid compression',
          content: 'Great material. Size XL was sold out so I got L and it fits well.',
          verifiedBuyer: true,
        },
      ],
    };
  }
}

export const reviewsAdapter = new MockReviewsAdapter();
