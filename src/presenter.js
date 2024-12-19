import TripMainInfo from './view/trip-main-info-view.js';
import TripFilters from './view/trip-filters-view.js';
import TripSort from './view/trip-sort-view.js';
import TripEventsList from './view/trip-events-list-view.js';
import TripEventsEdit from './view/trip-events-edit-view.js';
import TripEventsItem from './view/trip-events-item-view.js';

import { mockDestinations} from './mock/destinations.js';
import { mockOffers } from './mock/offers.js';
import { getRandomPoints } from './mock/points.js';
import {render} from './render.js';

import Model from './model/model.js';

export default class Presenter {
  model = new Model(getRandomPoints(), mockOffers, mockDestinations);

  mainContainer = document.querySelector('.trip-main');
  filtersContainer = document.querySelector('.trip-controls');
  sortContainer = document.querySelector('.trip-events');
  eventsContainer = new TripEventsList();

  constructor(container) {
    this.container = container;
  }

  init () {
    render(new TripMainInfo(this.model), this.mainContainer);
    render(new TripFilters(), this.filtersContainer);
    render(new TripSort(), this.sortContainer);
    render(this.eventsContainer, this.sortContainer, 'beforeend');
    render(new TripEventsEdit(this.model), this.eventsContainer.getElement(),'beforeend');

    for (let i = 0; i < 3; i++) {
      const tripEventsItem = new TripEventsItem(this.model);
      render(tripEventsItem, this.eventsContainer.getElement(),'beforeend');
    }
  }
}
