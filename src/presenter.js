import MainInfoView from './view/main-info-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import EventsListView from './view/events-list-view.js';
import EventsEditView from './view/events-edit-view.js';
import EventsItemView from './view/events-item-view.js';
import {render, replace, remove} from './framework/render.js';

export default class Presenter {
  sortContainer = null;
  eventsContainer = new EventsListView();

  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.sortContainer = document.querySelector('.trip-events');
  }

  init() {
    this.renderMainInfo();
    this.renderFilters();
    this.renderSort();
    this.renderEventsList();
    this.renderEventsItems();
  }

  renderMainInfo() {
    const point = this.model.getPoints()[0];
    const destination = this.model.getDestinationById(point.destination);

    render(new MainInfoView(point, destination), this.container);
  }

  renderFilters() {
    render(new FiltersView(), this.container);
  }

  renderSort() {
    render(new SortView(), this.sortContainer);
  }

  renderEventsList() {
    render(this.eventsContainer, this.sortContainer, 'beforeend');
  }

  renderEventsItems() {
    const points = this.model.getPoints().slice(0, 3);
    points.forEach((point) => {
      const destination = this.model.getDestinationById(point.destination);
      const offers = this.model.getOffersById(point.type, point.offers);
      const eventItem = new EventsItemView(point, destination, offers);
      const eventEdit = new EventsEditView(point, destination, offers, this.model.getDestinations());

      eventItem.setRollupButtonClickHandler(() => {
        replace(eventEdit, eventItem);
        this.setEditModeHandlers(eventEdit, eventItem);
      });

      render(eventItem, this.eventsContainer.element, 'beforeend');
    });
  }

  setEditModeHandlers(eventEdit, eventItem) {
    this.eventEdit = eventEdit;
    this.eventItem = eventItem;

    eventEdit.setFormSubmitHandler(() => {
      replace(eventItem, eventEdit);
      remove(eventEdit);
      document.removeEventListener('keydown', this.escKeyDownHandler);
    });

    eventEdit.setResetButtonClickHandler(() => {
      replace(eventItem, eventEdit);
      remove(eventEdit);
      document.removeEventListener('keydown', this.escKeyDownHandler);
    });

    document.addEventListener('keydown', this.escKeyDownHandler);
  }

  escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replace(this.eventItem, this.eventEdit);
      remove(this.eventEdit);
      document.removeEventListener('keydown', this.escKeyDownHandler);
    }
  };

}
