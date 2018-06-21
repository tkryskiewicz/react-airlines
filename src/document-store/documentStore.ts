import * as Moment from "moment";
import { DocumentStore, IDocumentStore } from "ravendb";

import { Airport } from "./Airport";
import { Flight } from "./Flight";

export const createDocumentStore = (url: string, database: string) => {
  const documentStore = new DocumentStore(url, database);

  documentStore.conventions
    .registerEntityType(Airport)
    .registerIdConvention<Airport>(Airport, async (_database, entity: object) =>
      `${documentStore.conventions.getCollectionNameForType(Airport)}/${(entity as Airport).code}`)
    .registerEntityType(Flight);

  return documentStore;
};

export const initializeDocumentStore = async (documentStore: IDocumentStore) => {
  const documentSession = documentStore.openSession();

  const airports = [
    new Airport("WRO", "Wroclaw", ["ATL", "STN"]),
    new Airport("ATL", "Atlanta", ["WRO", "STN"]),
    new Airport("STN", "London Stansted", ["WRO", "ATL"]),
  ];

  await Promise.all(airports.map(async (a) => {
    await documentSession.store(a);

    await documentSession.saveChanges();
  }));

  const today = Moment().startOf("d");

  const flights = [
    new Flight("WRO", "ATL", today.clone().add(17, "h").add(45, "m").toDate()),
    new Flight("WRO", "ATL", today.clone().add(21, "h").add(23, "m").toDate()),
    new Flight("WRO", "STN", today.clone().add(1, "d").add(12, "h").add(10, "m").toDate()),
    new Flight("ATL", "WRO", today.clone().add(2, "d").add(8, "h").add(25, "m").toDate()),
    new Flight("ATL", "STN", today.clone().add(4, "d").add(18, "h").toDate()),
    new Flight("STN", "WRO", today.clone().add(5, "d").add(5, "h").add(55, "m").toDate()),
    new Flight("STN", "ATL", today.clone().add(6, "d").add(23, "h").add(47, "m").toDate()),
  ];

  await Promise.all(flights.map(async (f) => {
    await documentSession.store(f);

    await documentSession.saveChanges();
  }));
};
