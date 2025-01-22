// point-presenter.js
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
  #onEditClose = null; // Колбэк для закрытия редактирования
  #isEditMode = false; // Флаг для отслеживания режима редактирования

  constructor(event, destination, offers, destinations, onDataChange, onEditClose) {
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#onEditClose = onEditClose; // Сохраняем колбэк
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
    if (this.#isEditMode) {
      return; // Если уже в режиме редактирования, ничего не делаем
    }

    this.#isEditMode = true; // Устанавливаем флаг режима редактирования
    this.#onEditClose(this); // Уведомляем Presenter, что открывается новый eventEdit

    replace(eventEdit, eventItem);

    eventEdit.setFormSubmitHandler(() => {
      replace(eventItem, eventEdit);
      remove(eventEdit);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#isEditMode = false; // Сбрасываем флаг режима редактирования
    });

    eventEdit.setRollupButtonClickHandler(() => {
      replace(eventItem, eventEdit);
      remove(eventEdit);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#isEditMode = false; // Сбрасываем флаг режима редактирования
    });

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replace(this.#eventItem, this.#eventEdit);
      remove(this.#eventEdit);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#isEditMode = false; // Сбрасываем флаг режима редактирования
    }
  };

  #handleRollupClick = () => {
    this.#setEditModeHandlers(this.#eventEdit, this.#eventItem);
  };

  #handleFavoriteClick = () => {
    this.#event.isFavorite = !this.#event.isFavorite;
  };

  closeEdit() {
    if (this.#eventEdit && this.#isEditMode) {
      replace(this.#eventItem, this.#eventEdit);
      remove(this.#eventEdit);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#isEditMode = false; // Сбрасываем флаг режима редактирования
    }
  }
}
