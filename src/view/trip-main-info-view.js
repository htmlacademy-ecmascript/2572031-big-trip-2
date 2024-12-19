import { createElement } from '../render.js';
import { dateModule } from '../utils.js';

function createTripMainInfoTemplate(model){
  const point = model.getPoints()[0];
  const destination = model.getDestinationById(point.destination);
  const dateFrom = new Date(point.dateFrom);
  const dateTo = new Date(point.dateTo);

  return(
    ` <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${destination.name}</h1>

              <p class="trip-info__dates">${dateModule.formatDate(dateTo)}&nbsp;&mdash;&nbsp;${dateModule.formatDate(dateFrom)}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${point.basePrice}</span>
            </p>
          </section>
          `
  );
}

export default class TripMainInfo {
  constructor(model) {
    this.model = model;
  }

  getTemplate() {
    return createTripMainInfoTemplate(this.model);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}


