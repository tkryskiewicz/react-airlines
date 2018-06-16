import * as Cors from "cors";
import * as Express from "express";

import { registerAirportsApi } from "./airports";
import { createDocumentStore } from "./documentStore";
import { ravenDbRequestHandler } from "./ravenDbRequestHandler";

const app = Express();

app.use(Cors());

const documentStore = createDocumentStore("http://localhost:8080", "react-airlines").initialize();

app.use(ravenDbRequestHandler(documentStore));

registerAirportsApi(app);

const Port = 5000;

app.listen(Port, () => {
  // tslint:disable-next-line
  console.log(`Listening on port ${Port}`);
});
