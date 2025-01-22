// presenter.js
import MainInfoView from './view/main-info-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import EventsListView from './view/events-list-view.js';
import {render} from './framework/render.js';
import PointPresenter from './point-presenter.js';

export default class Presenter {
  sortContainer = null;
  eventsContainer = new EventsListView();
  #currentEdit = null;
  #currentSortType = 'day';
  #points = [];
  #model = null;

  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.sortContainer = document.querySelector('.trip-events');
    this.#points = this.model.getPoints();
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
    const sortView = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(sortView, this.sortContainer);
  }

  renderEventsList() {
    render(this.eventsContainer, this.sortContainer, 'beforeend');
  }

  renderEventsItems() {
    const sortedPoints = this.#sortPoints(this.#points, this.#currentSortType);
    this.eventsContainer.element.innerHTML = '';

    sortedPoints.forEach((point) => {
      const destination = this.model.getDestinationById(point.destination);
      const offers = this.model.getOffersById(point.type, point.offers);
      const pointPresenter = new PointPresenter(
        point,
        destination,
        offers,
        this.model.getDestinations(),
        this.#handleDataChange,
        this.#handleEditOpen // Передаем колбэк для уведомления об открытии редактирования
      );
      pointPresenter.init(this.eventsContainer.element);
    });
  }

  #handleDataChange = (updatedEvent) => {
    this.model.updatePoint(updatedEvent);
  };

  #handleEditOpen = (pointPresenter) => {
    if (this.#currentEdit && this.#currentEdit !== pointPresenter) {
      this.#currentEdit.closeEdit(); // Закрываем предыдущий открытый eventEdit
    }
    this.#currentEdit = pointPresenter; // Сохраняем текущий открытый eventEdit
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.renderEventsItems();
  };

  #sortPoints = (points, sortType) => {
    switch (sortType) {
      case 'day':
        return points.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
      case 'time':
        return points.sort((a, b) => (new Date(b.dateTo) - new Date(b.dateFrom)) - (new Date(a.dateTo) - new Date(a.dateFrom)));
      case 'price':
        return points.sort((a, b) => b.basePrice - a.basePrice);
      default:
        return points;
    }
  };
}
