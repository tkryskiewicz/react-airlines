import { Layout } from "antd";
import * as React from "react";

import { FlightSearch } from "./FlightSearch";

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
            <h1>
              react-airlines
            </h1>
            <p>
              An airlines website created using TypeScript and React.
            </p>
            <FlightSearch />
          </Layout.Content>
          <Layout.Footer>
            2018 &copy; react-airlines. All rights reserved.
          </Layout.Footer>
        </Layout>
      </>
    );
  }
}
