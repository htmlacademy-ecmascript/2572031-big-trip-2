import BoardPresenter from './board-presenter.js';

const mainContainer = document.querySelector('.trip-events');

new BoardPresenter(mainContainer).init();
