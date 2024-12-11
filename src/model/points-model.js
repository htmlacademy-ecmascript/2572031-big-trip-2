import { getRandomPoints } from "../mock/points.js";
import { mockOffers } from "../mock/offers.js";
import { mockDestinations } from "../mock/destinations.js";

export default class PointModel {
    point = Array.from(1, getRandomPoints);
    offers = mockOffers
    destination = mockDestinations;

    getPoints() {
        return this.point;
    }

    getOffers() {
        return this.offers;
    }

    getOffersByType(type){
        const allOffers = this.getOffers();
        return allOffers.find((offer) => offer.type === type);
    }

    getOffersById(type, itemsId) {
        const offersType = this.getOffersByType(type);

        return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
    }

    getDestination() {
        return this.destination;
    }

    getDestinationById(id) {
        const allDestination = this.getDestination();

        return allDestination.find((item) => item.id === id);
    }
}