import * as Moment from "moment";
import * as React from "react";
import { RouteComponentProps } from "react-router";

import { FlightSearch } from "../FlightSearch";
import { Route } from "../Route";

export interface HomePageProps extends RouteComponentProps<{ language: string }> {
}

export class HomePage extends React.Component<HomePageProps> {
  public render() {
    return (
      <>
        <h1>
          react-airlines
        </h1>
        <p>
          An airlines website created using TypeScript and React.
        </p>
        <FlightSearch onSearch={this.onFlightSearch} />
      </>
    );
  }

  private onFlightSearch = (route: Route, departureDate: Moment.Moment) => {
    this.props.history.push(
      // FIXME: this.props.match.path should work
      `${this.props.match.params.language}/booking/${route.origin}/${route.destination}/${departureDate.format("YYYY-MM-DD")}`,
    );
  }
}
