import * as Moment from "moment";
import { DocumentStore, IDocumentStore } from "ravendb";

import { Airport } from "./Airport";
import { Country } from "./Country";
import { Flight } from "./Flight";

export const createDocumentStore = (url: string, database: string) => {
  const documentStore = new DocumentStore(url, database);

  documentStore.conventions
    .registerEntityType(Country)
    .registerIdConvention<Country>(Country, async (_database, entity: object) =>
      `${documentStore.conventions.getCollectionNameForType(Country)}/${(entity as Country).code}`)
    .registerEntityType(Airport)
    .registerIdConvention<Airport>(Airport, async (_database, entity: object) =>
      `${documentStore.conventions.getCollectionNameForType(Airport)}/${(entity as Airport).code}`)
    .registerEntityType(Flight);

  return documentStore;
};

export const initializeDocumentStore = async (documentStore: IDocumentStore) => {
  const documentSession = documentStore.openSession();

  const countries = [
    new Country("AU", "Australia", "state", [
      { code: "ACT", name: "Australian Capital Territory" },
      { code: "NSW", name: "New South Wales" },
      { code: "NT", name: "Northern Territory" },
      { code: "QLD", name: "Queensland" },
      { code: "SA", name: "South Australia" },
      { code: "TAS", name: "Tasmania" },
      { code: "VIC", name: "Victoria" },
      { code: "WA", name: "Western Australia" },
    ]),
    new Country("CA", "Canada", "province", [
      { code: "AB", name: "Alberta" },
      { code: "BC", name: "British Columbia" },
      { code: "MB", name: "Manitoba" },
      { code: "NB", name: "New Brunswick" },
      { code: "NL", name: "Newfoundland and Labrador" },
      { code: "NS", name: "Nova Scotia" },
      { code: "ON", name: "Ontario" },
      { code: "PE", name: "Prince Edward Island" },
      { code: "QC", name: "Quebec" },
      { code: "SK", name: "Saskatchewan" },
      { code: "NT", name: "Northwest Territories" },
      { code: "NU", name: "Nunavut" },
      { code: "YT", name: "Yukon" },
    ]),
    new Country("PL", "Poland"),
    new Country("UK", "United Kingdom"),
    new Country("US", "United States of America", "state", [
      { code: "AL", name: "Alabama" },
      { code: "AK", name: "Alaska" },
      { code: "AZ", name: "Arizona" },
      { code: "AR", name: "Arkansas" },
      { code: "CA", name: "California" },
      { code: "CO", name: "Colorado" },
      { code: "CT", name: "Connecticut" },
      { code: "DE", name: "Delaware" },
      { code: "FL", name: "Florida" },
      { code: "GA", name: "Georgia" },
      { code: "HI", name: "Hawaii" },
      { code: "ID", name: "Idaho" },
      { code: "IL", name: "Illinois" },
      { code: "IN", name: "Indiana" },
      { code: "IA", name: "Iowa" },
      { code: "KS", name: "Kansas" },
      { code: "KY", name: "Kentucky" },
      { code: "LA", name: "Louisiana" },
      { code: "ME", name: "Maine" },
      { code: "MD", name: "Maryland" },
      { code: "MA", name: "Massachusetts" },
      { code: "MI", name: "Michigan" },
      { code: "MN", name: "Minnesota" },
      { code: "MS", name: "Mississippi" },
      { code: "MO", name: "Missouri" },
      { code: "MT", name: "Montana" },
      { code: "NE", name: "Nebraska" },
      { code: "NV", name: "Nevada" },
      { code: "NH", name: "New Hampshire" },
      { code: "NJ", name: "New Jersey" },
      { code: "NM", name: "New Mexico" },
      { code: "NY", name: "New York" },
      { code: "NC", name: "North Carolina" },
      { code: "ND", name: "North Dakota" },
      { code: "OH", name: "Ohio" },
      { code: "OK", name: "Oklahoma" },
      { code: "OR", name: "Oregon" },
      { code: "PA", name: "Pennsylvania" },
      { code: "RI", name: "Rhode Island" },
      { code: "SC", name: "South Carolina" },
      { code: "SD", name: "South Dakota" },
      { code: "TN", name: "Tennessee" },
      { code: "TX", name: "Texas" },
      { code: "UT", name: "Utah" },
      { code: "VT", name: "Vermont" },
      { code: "VA", name: "Virginia" },
      { code: "WA", name: "Washington" },
      { code: "WV", name: "West Virginia" },
      { code: "WI", name: "Wisconsin" },
      { code: "WY", name: "Wyoming" },
      { code: "DC", name: "District of Columbia" },
      { code: "AS", name: "American Samoa" },
      { code: "GU", name: "Guam" },
      { code: "MP", name: "Northern Mariana Islands" },
      { code: "PR", name: "Puerto Rico" },
      { code: "UM", name: "United States Minor Outlying Islands" },
      { code: "VI", name: "Virgin Islands, U.S." },
    ]),
  ];

  await Promise.all(countries.map(async (c) => {
    await documentSession.store(c);

    await documentSession.saveChanges();
  }));

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
