import { Layout } from "antd";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { FlightSelectionPage } from "./FlightSelectionPage";
import { HomePage } from "./HomePage";
import { PaymentPage } from "./PaymentPage";

export interface AppProps extends RouteComponentProps<{}> {
}

export class App extends React.Component<AppProps> {
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
              <Route
                path={this.props.match.path}
                exact={true}
                component={HomePage}
              />
              <Route
                path={`${this.props.match.path}/booking/:origin/:destination/:departureDate`}
                component={FlightSelectionPage}
              />
              <Route
                path={`${this.props.match.path}/booking/payment`}
                component={PaymentPage}
              />
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
