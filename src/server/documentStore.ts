import { DocumentStore } from "ravendb";

import { Airport } from "./Airport";

export const createDocumentStore = (url: string, database: string) => {
  const documentStore = new DocumentStore(url, database);

  documentStore.conventions
    .registerEntityType(Airport)
    .registerIdConvention<Airport>(Airport, async (_database, entity: object) =>
      `${documentStore.conventions.getCollectionNameForType(Airport)}/${(entity as Airport).code}`);

  return documentStore;
};
