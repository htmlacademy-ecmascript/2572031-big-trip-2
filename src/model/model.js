

export default class Model {

  constructor(points, offers, destination) {
    this.point = points;
    this.offers = offers;
    this.destination = destination;
  }

  getPoints() {
    return this.point;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destination;
  }

  getOffersByType(type){
    const allOffers = this.getOffers();
    return allOffers.find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    if (!this.getOffersByType(type)){
      return [];
    }
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }


  getDestinationById(id) {
    const allDestination = this.getDestinations();

    return allDestination.find((item) => item.id === id);
  }
}
