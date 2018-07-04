import * as Moment from "moment";
import * as React from "react";
import { RouteComponentProps } from "react-router";

import { FlightSelection } from "../FlightSelection";
import { Route } from "../Route";

interface FlightSelectionPageParams {
  origin: string;
  destination: string;
  departureDate: string;
}

export interface FlightSelectionPageProps extends RouteComponentProps<FlightSelectionPageParams> {
}

export class FlightSelectionPage extends React.Component<FlightSelectionPageProps> {
  public render() {
    const { origin, destination } = this.props.match.params;
    const departureDate = Moment(this.props.match.params.departureDate);

    const route = new Route(origin, destination);

    return (
      <FlightSelection
        route={route}
        departureDate={departureDate}
      />
    );
  }
}
