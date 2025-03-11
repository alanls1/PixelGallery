import { configureStore, createSelector, createSlice } from "@reduxjs/toolkit";

type Reviews = {
  userId: number;
  rated: number;
  totalReviews: number;
};

const rated = createSlice({
  name: "reviews",
  initialState: [] as Reviews[],
  reducers: {
    AddReviews(state, action: { payload: Reviews }) {
      const { userId, rated, totalReviews } = action.payload;

      const existingIndex = state.findIndex(
        (review) => review.userId === userId
      );

      if (existingIndex !== -1) {
        const existingReview = state[existingIndex];

        if (existingReview.rated === rated) {
          state.splice(existingIndex, 1);
        } else {
          existingReview.rated = rated;
        }
      } else {
        state.push({
          ...action.payload,
          totalReviews: (totalReviews || 0) + 1,
        });
      }
    },
  },
});

export const selectReviewUser = createSelector(
  (state: any) => state.reviews,
  (_: any, userId: number) => userId,
  (reviews, userId) =>
    reviews.find((review: Reviews) => review?.userId === userId) || null
);

export const store = configureStore({
  reducer: {
    reviews: rated.reducer,
  },
});

export const { AddReviews } = rated.actions;
