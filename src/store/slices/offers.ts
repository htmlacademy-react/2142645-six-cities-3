import { CityName, AppRoute } from '../../const';
import { reviewsOffer } from '../../mock/reviews-offer';
import { OfferPreview, DetailedOffer, OffersPreview } from '../../types/offer-types';
import { ReviewOffer } from '../../types/review-offer';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getFilteredByCityOffers, SortingOptions } from '../../util';
import {
  fetchOffersPreviewAction,
  fetchDetailedOfferAction,
  fetchOffersNearbyAction,
} from '../api-actions';
import browserHistory from '../../browser-history';

type InitialState = {
  city: CityName;
  offersPreview: OfferPreview[];
  reviewsOffer: ReviewOffer[];
  detailedOffer: DetailedOffer | null;
  offersNearby: OfferPreview[];
  isLoading: boolean;
  sorting: (offers: OffersPreview) => OffersPreview;
};

const initialState: InitialState = {
  city: 'Paris',
  offersPreview: [],
  reviewsOffer: [...reviewsOffer],
  detailedOffer: null,
  offersNearby: [],
  isLoading: false,
  sorting: SortingOptions[0].functionSorting,
};

export const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    fillingReviewOffer: (state) => {
      state.reviewsOffer = [...reviewsOffer];
    },
    setSorting: (state, action: PayloadAction<(offers: OffersPreview) => OffersPreview>) => {
      state.sorting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersPreviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersPreviewAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offersPreview = action.payload;
      })
      .addCase(fetchDetailedOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDetailedOfferAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailedOffer = action.payload;
      })
      .addCase(fetchDetailedOfferAction.rejected, () => {
        browserHistory.push(AppRoute.Error);
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
      });
  },
  selectors: {
    city: (state) => state.city,
    offersPreview: (state) => state.offersPreview,
    reviewsOffer: (state) => state.reviewsOffer,
    detailedOffer: (state) => state.detailedOffer,
    offersNearby: (state) => state.offersNearby,
    isLoading: (state) => state.isLoading,
    showOffers: (state) => state.sorting(getFilteredByCityOffers(state.offersPreview, state.city)),
  }
});

export const offersSelectors = offersSlice.selectors;
export const offersActions = offersSlice.actions;
