import * as Cors from "cors";
import * as Express from "express";

import { createDocumentStore, initializeDocumentStore } from "ra-document-store";

import { registerAirportsApi } from "./airports";
import { registerCountriesApi } from "./countries";
import { ravenDbRequestHandler } from "./ravenDbRequestHandler";
import { registerTimetableApi } from "./timetable";

const app = Express();

app.use(Cors());

const documentStore = createDocumentStore("http://localhost:8080", "react-airlines").initialize();

app.use(ravenDbRequestHandler(documentStore));

app.get("/init", async (_req, res) => {
  try {
    await initializeDocumentStore(documentStore);

    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

registerCountriesApi(app);
registerAirportsApi(app);
registerTimetableApi(app);

const Port = 5000;

app.listen(Port, () => {
  // tslint:disable-next-line
  console.log(`Listening on port ${Port}`);
});
