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
  #currentEdit = null; // Флаг для хранения текущего открытого eventEdit

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
}
