import EventsItemView from './view/events-item-view.js';
import EventsEditView from './view/events-edit-view.js';
import {render, replace, remove} from './framework/render.js';

export default class PointPresenter {
  #eventItem = null;
  #eventEdit = null;
  #event = null;
  #destination = null;
  #offers = null;
  #destinations = null;
  #handleDataChange = null;
  #container = null;
  #prevEdit = null;

  constructor(event, destination, offers, destinations, onDataChange) {
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
  }

  init(container) {
    this.#container = container;

    this.#eventItem = new EventsItemView(this.#event, this.#destination, this.#offers);
    this.#eventEdit = new EventsEditView(this.#event, this.#destination, this.#offers, this.#destinations);

    this.#eventItem.setRollupButtonClickHandler(this.#handleRollupClick);

    this.#eventItem.setFavoriteButtonClickHandler(this.#handleFavoriteClick);

    render(this.#eventItem, this.#container);
  }

  #setEditModeHandlers = (eventEdit, eventItem) => {
    replace(eventEdit, eventItem);

    eventEdit.setFormSubmitHandler(() => {
      replace(eventItem, eventEdit);
      remove(eventEdit);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    });

    eventEdit.setRollupButtonClickHandler(() => {
      replace(eventItem, eventEdit);
      remove(eventEdit);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    });

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replace(this.#eventItem, this.#eventEdit);
      remove(this.#eventEdit);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleRollupClick = () => {
    this.#setEditModeHandlers(this.#eventEdit, this.#eventItem);
  };

  #handleFavoriteClick = () => {
    this.#event.isFavorite = !this.#event.isFavorite;
  };
}
