import * as Moment from "moment";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";

import { Flight, Route } from "ra-shared";
import { AppState } from "ra-store";
import { BookingAction, changeFlight } from "ra-store/booking";

import { FlightSelection } from "../FlightSelection";

interface FlightSelectionPageParams {
  origin: string;
  destination: string;
  departureDate: string;
}

export interface FlightSelectionPageProps extends RouteComponentProps<FlightSelectionPageParams>, DispatchProp {
  selectedFlight?: Flight;
  onSelectedFlightChange?: (flight: Flight) => void;
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
        selectedFlight={this.props.selectedFlight}
        onSelectedFlightChange={this.props.onSelectedFlightChange}
      />
    );
  }
}

const mapStateToProps = (state: AppState): Pick<FlightSelectionPageProps, "selectedFlight"> => ({
  selectedFlight: state.booking.flight,
});

const mapDispatchToProps = (dispatch: Dispatch<BookingAction>): Pick<FlightSelectionPageProps, "onSelectedFlightChange"> => ({
  onSelectedFlightChange: (flight) => dispatch(changeFlight(flight)),
});

export const FlightSelectionPageConnected = connect(mapStateToProps, mapDispatchToProps)(FlightSelectionPage);
