import { Layout } from "antd";
import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { FlightSelectionPage } from "./FlightSelectionPage";
import { HomePage } from "./HomePage";
import { PaymentPage } from "./PaymentPage";

export class App extends React.Component {
  public render() {
    return (
      <>
        <Layout>
          <Layout.Header>
            <a
              style={{ color: "#fff" }}
              href="/"
            >
              react-airlines
            </a>
          </Layout.Header>
          <Layout.Content>
            <Switch>
              <Route path="/" exact={true} component={HomePage} />
              <Route path="/booking/:origin/:destination/:departureDate" component={FlightSelectionPage} />
              <Route path="/booking/payment" component={PaymentPage} />
            </Switch>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: "center" }}>
            2018 &copy; react-airlines. All rights reserved.
          </Layout.Footer>
        </Layout>
      </>
    );
  }
}
