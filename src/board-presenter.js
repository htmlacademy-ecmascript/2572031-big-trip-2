import SortView from './view/sort-view.js';
import EventsListView from './view/events-list-view.js';
import FormEditView from './view/form-edit-view.js';
import PointView from './view/point-view.js';
import FilterView from './view/filter-view.js';
import {render} from './render.js';


export default class BoardPresenter {

  sortComponent = new SortView();
  eventsListComponent = new EventsListView();
  filterComponent = new FilterView();

  filterContainer = document.querySelector('.trip-controls__filters');

  constructor(container) {
    this.container = container;
  }

  init () {
    render(this.filterComponent, this.filterContainer);
    render(this.sortComponent, this.container);
    render(this.eventsListComponent, this.container);
    render(new FormEditView(), this.eventsListComponent.getElement());

    for (let i = 0; i < 3; ++i) {
      render(new PointView(), this.eventsListComponent.getElement());
    }
  }
}
