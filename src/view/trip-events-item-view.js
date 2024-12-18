import { createElement } from '../render.js';
import { dateModule } from '../utils.js';

function createTripEventsItemTemplate(model){
  const point = model.getPoints().shift();
  const destination = model.getDestinationById(point.destination);
  const offers = model.getOffersById(point.type, point.offers);
  const dateFrom = new Date(point.dateFrom);
  const dateTo = new Date(point.dateTo);

  return(
    ` 
        <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${dateModule.formatDate(dateFrom)} </time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${point.type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${dateModule.formatTime(dateFrom)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${dateModule.formatTime(dateTo)}</time>
                  </p>
                  <p class="event__duration">${dateModule.formatDuration(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${offers.map((offer) => `
                  <li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>
                `).join('')}
                </ul>
                <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
    `
  );
}

export default class TripEventsItem {
  constructor(model) {
    this.model = model;
  }

  getTemplate() {
    return createTripEventsItemTemplate(this.model);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}