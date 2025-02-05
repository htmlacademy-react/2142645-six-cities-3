import { rating } from '../../../const';
import { Fragment } from 'react';
import { getPluralForm } from '../../../util';
import { ChangeEventHandler } from 'react';

type ReviewsFormProps = {
  review: {
    rating: number;
    review: string;
  };
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function ReviewsForm({ review, handleChange }: ReviewsFormProps): JSX.Element {
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {rating.map(({ value, label }) => (
          <Fragment key={label}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={value}
              id={`${value}-${getPluralForm('star', value)}`}
              type="radio"
              onChange={handleChange}
            />
            <label
              htmlFor={`${value}-${getPluralForm('star', value)}`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.review}
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={review.review.length < 50 || review.rating === 0}>Submit</button>
      </div>
    </form>
  );
}
