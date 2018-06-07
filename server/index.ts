import * as Express from "express";

const app = Express();

const Port = 5000;

app.listen(Port, () => {
  // tslint:disable-next-line
  console.log(`Listening on port ${Port}`);
});
