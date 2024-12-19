import MainInfoView from './view/main-info-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import EventsListView from './view/events-list-view.js';
import EventsEditView from './view/events-edit-view.js';
import EventsItemView from './view/events-item-view.js';
import {render} from './render.js';

export default class Presenter {
  filtersContainer = null;
  sortContainer = null;
  eventsContainer = new EventsListView();

  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.filtersContainer = this.container.querySelector('.trip-controls');
    this.sortContainer = document.querySelector('.trip-events');
  }

  init() {
    this.renderMainInfo();
    this.renderFilters();
    this.renderSort();
    this.renderEventsList();
    this.renderEventsEdit();
    this.renderEventsItems();
  }

  renderMainInfo() {
    const point = this.model.getPoints()[0];
    const destination = this.model.getDestinationById(point.destination);

    render(new MainInfoView(point, destination), this.container);
  }

  renderFilters() {
    render(new FiltersView(), this.filtersContainer);
  }

  renderSort() {
    render(new SortView(), this.sortContainer);
  }

  renderEventsList() {
    render(this.eventsContainer, this.sortContainer, 'beforeend');
  }

  renderEventsEdit() {
    const point = this.model.getPoints()[0];
    const destination = this.model.getDestinationById(point.destination);
    const offers = this.model.getOffersById(point.type, point.offers);
    const allDestinations = this.model.getDestinations();

    render(new EventsEditView(point, destination, offers, allDestinations), this.eventsContainer.getElement(), 'beforeend');
  }

  renderEventsItems() {
    for (let i = 0; i < 3; i++) {
      const point = this.model.getPoints().shift();
      const destination = this.model.getDestinationById(point.destination);
      const offers = this.model.getOffersById(point.type, point.offers);
      const eventItem = new EventsItemView(point, destination, offers);

      render(eventItem, this.eventsContainer.getElement(), 'beforeend');
    }
  }
}
