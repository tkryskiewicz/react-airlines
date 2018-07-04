import * as React from "react";

import { FlightSearch } from "../FlightSearch";

export class HomePage extends React.Component {
  public render() {
    return (
      <>
        <h1>
          react-airlines
        </h1>
        <p>
          An airlines website created using TypeScript and React.
        </p>
        <FlightSearch />
      </>
    );
  }
}
