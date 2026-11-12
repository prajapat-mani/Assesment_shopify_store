import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { reviewsAdapter, ReviewsResponse } from '../../services/integrations/reviewsAdapter';

interface ReviewsSectionProps {
  productId: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ productId }) => {
  const { config } = useStore();
  const { colors, radii } = config.theme;

  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadReviews() {
      setIsLoading(true);
      try {
        const data = await reviewsAdapter.getProductReviews(productId);
        if (isMounted) setReviewsData(data);
      } catch {
        // Safe silent handling
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadReviews();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  return (
    <View style={[styles.container, { borderTopColor: colors.border }]}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Verified Customer Reviews
          </Text>
          <Text style={[styles.providerLabel, { color: colors.textSecondary }]}>
            100% Verified Community Feedback
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.writeReviewBtn, { borderColor: colors.border, borderRadius: radii.pill }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.writeReviewText, { color: colors.textPrimary }]}>
            Write Review
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="small" color={colors.accent} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading customer reviews...
          </Text>
        </View>
      ) : reviewsData ? (
        <View>
          {/* SUMMARY SCORE CARD */}
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md },
            ]}
          >
            <View style={styles.scoreBlock}>
              <Text style={[styles.ratingScore, { color: colors.textPrimary }]}>
                {reviewsData.averageRating.toFixed(1)}
              </Text>
              <Text style={styles.stars}>★★★★★</Text>
              <Text style={[styles.totalReviews, { color: colors.textSecondary }]}>
                Based on {reviewsData.totalReviews.toLocaleString()} reviews
              </Text>
            </View>
          </View>

          {/* INDIVIDUAL REVIEWS */}
          {reviewsData.reviews.map((rev) => (
            <View
              key={rev.id}
              style={[
                styles.reviewCard,
                { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radii.sm },
              ]}
            >
              <View style={styles.reviewHeader}>
                <View style={styles.authorRow}>
                  <Text style={[styles.authorName, { color: colors.textPrimary }]}>
                    {rev.author}
                  </Text>
                  {rev.verifiedBuyer && (
                    <Text style={[styles.verifiedBadge, { color: colors.success }]}>
                      ✓ Verified Buyer
                    </Text>
                  )}
                </View>
                <Text style={[styles.reviewDate, { color: colors.textSecondary }]}>
                  {rev.date}
                </Text>
              </View>

              <Text style={styles.smallStars}>{'★'.repeat(rev.rating)}</Text>
              <Text style={[styles.reviewTitle, { color: colors.textPrimary }]}>
                {rev.title}
              </Text>
              <Text style={[styles.reviewBody, { color: colors.textSecondary }]}>
                {rev.content}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  providerLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  writeReviewBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  writeReviewText: {
    fontSize: 11,
    fontWeight: '700',
  },
  loadingWrapper: {
    paddingVertical: 24,
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 12,
  },
  summaryCard: {
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreBlock: {
    alignItems: 'center',
  },
  ratingScore: {
    fontSize: 32,
    fontWeight: '900',
  },
  stars: {
    fontSize: 16,
    color: '#F59E0B',
    marginVertical: 4,
  },
  totalReviews: {
    fontSize: 12,
  },
  reviewCard: {
    padding: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorName: {
    fontSize: 13,
    fontWeight: '700',
  },
  verifiedBadge: {
    fontSize: 11,
    fontWeight: '700',
  },
  reviewDate: {
    fontSize: 11,
  },
  smallStars: {
    fontSize: 12,
    color: '#F59E0B',
    marginBottom: 4,
  },
  reviewTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  reviewBody: {
    fontSize: 12,
    lineHeight: 18,
  },
});
