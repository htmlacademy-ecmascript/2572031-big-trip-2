import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import EventView from './view/events-view.js';
import { render } from './render.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');

render(new FilterView(), siteFiltersElement);
render(new SortView(), siteTripEventsElement);
render(new EventView(), siteTripEventsElement);
