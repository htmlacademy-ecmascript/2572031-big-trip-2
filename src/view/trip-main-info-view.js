import { createElement } from '../render.js';

function createTripMainInfoTemplate(destinations, points){
  const {destination, basePrice, dateFrom, dateTo} = points;
  const timeFrom = new Date(dateFrom).getUTCDate();
  const timeTo = new Date(dateTo).getUTCDate();
  const month = new Date(dateFrom).toLocaleString('en-GB', { month: 'short' });
  const randomDestination = destinations.find((dest) => dest.id === destination);
  const city = randomDestination;

  return(
    ` <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${city}</h1>

              <p class="trip-info__dates">${timeFrom}&nbsp;&mdash;&nbsp;${timeTo} ${month}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePrice}</span>
            </p>
          </section>
          `
  );
}

export default class TripMainInfo {
  constructor(destinations, points) {
    this.destinations = destinations;
    this.points = points;
  }

  getTemplate() {
    return createTripMainInfoTemplate(this.destinations, this.points);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}


