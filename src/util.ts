import { OfferPreview } from './types/offer-types';
import { CityName } from './const';
import dayjs from 'dayjs';
import { MAX_RATING } from './const';

export function getFilteredByCityOffers(offers: OfferPreview[], city: CityName): OfferPreview[] {
  return offers.filter((offer) => offer.city.name === city);
}

export function getFormatedDate(date: string, format: string): string {
  return dayjs(date).format(format);
}

export function getPluralForm(word: string, count: number): string {
  if (count === 1) {
    return word;
  }
  return `${word}s`;
}

export function getRoundedRatingInPercentage(rating: number): number {
  return Math.round(rating) / MAX_RATING * 100;
}

export type SortingOption = {
  name: string;
  functionSorting: (array: OfferPreview[]) => OfferPreview[];
}

export const SortingOptions: SortingOption[] = [
  {
    name: 'Popular',
    functionSorting: function sortByPopular(array) {
      return array;
    }
  },
  {
    name: 'Price: low to high',
    functionSorting: function sortLowToHigh(array) {
      return array.slice().sort((a, b) => a.price - b.price);
    }
  },
  {
    name: 'Price: high to low',
    functionSorting: function sortHighToLow(array) {
      return array.slice().sort((a, b) => b.price - a.price);
    }
  },
  {
    name: 'Top rated first',
    functionSorting: function sortTopRatedFirst(array) {
      return array.slice().sort((a, b) => b.rating - a.rating);
    }
  },
];

const getRandomNumber = (min: number, max: number, afterCommaNumbers: number) => {
  if (min >= max) {
    return NaN;
  }
  let randomValue;
  if (afterCommaNumbers === 0) {
    randomValue = min + (max - min + 1) * Math.random();
    return Math.trunc(randomValue);
  }
  randomValue = min + (max - min) * Math.random();
  return Number(randomValue.toFixed(afterCommaNumbers));
};

export const getRandomItemArray = <T>(array: readonly T[]):T => array[getRandomNumber(0, array.length - 1, 0)];
