import TripMainInfo from './view/trip-main-info-view.js';
import TripFilters from './view/trip-filters-view.js';
import TripSort from './view/trip-sort-view.js';
import TripEventsList from './view/trip-events-list.js';
import TripEventsEdit from './view/trip-events-edit-view.js';
import TripEventsItem from './view/trip-events-item.js';

import { mockDestinations} from './mock/destinations.js';
import { mockOffers } from './mock/offers.js';
import { getRandomPoints } from './mock/points.js';
import {render} from './render.js';

import TripModel from './model/points-model.js';

export default class BoardPresenter {
  model = new TripModel(getRandomPoints(), mockOffers, mockDestinations);
  tripMainComponent = new TripMainInfo(mockDestinations, getRandomPoints);
  TripFiltersComponent = new TripFilters();
  tripSortComponent = new TripSort();
  tripEventsList = new TripEventsList();
  tripEventsEdit = new TripEventsEdit(this.model);

  

  tripMainContainer = document.querySelector('.trip-main');
  tripFiltersContainer = document.querySelector('.trip-controls');
  tripSortContainer = document.querySelector('.trip-events');

  constructor(container) {
    this.container = container;
  }

  init () {
    render(this.tripMainComponent, this.tripMainContainer);
    render(this.TripFiltersComponent, this.tripFiltersContainer);
    render(this.tripSortComponent, this.tripSortContainer);
    render(this.tripEventsList, this.tripSortContainer, 'beforeend');
    render(this.tripEventsEdit, this.tripEventsList.getElement(),'beforeend');

    for (let i = 0; i < 3; i++) {
      const tripEventsItem = new TripEventsItem(this.model);
      render(tripEventsItem, this.tripEventsList.getElement(),'beforeend');
    }
  }
}
