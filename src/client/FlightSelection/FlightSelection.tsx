import { Button, Col, Row } from "antd";
import * as Moment from "moment";
import * as React from "react";

import { Airport } from "../Airport";
import { AirportService } from "../AirportService";
import { Flight } from "../Flight";
import { FlightService } from "../FlightService";
import { Route } from "../Route";

export interface FlightSelectionProps {
  route: Route;
  departureDate: Moment.Moment;
}

interface FlightSelectionState {
  airports: Airport[];
  departureDate: Moment.Moment;
  flights: Flight[];
  selectedFlight: string;
}

export class FlightSelection extends React.Component<FlightSelectionProps, FlightSelectionState> {
  private airportService = new AirportService();
  private flightService = new FlightService();

  constructor(props: FlightSelectionProps) {
    super(props);

    this.state = {
      airports: [],
      departureDate: props.departureDate,
      flights: [],
      selectedFlight: "",
    };
  }

  public async componentDidMount() {
    const [airports, flights] = await Promise.all([
      this.airportService.getAll(),
      this.flightService.get(this.props.route, this.state.departureDate),
    ]);

    this.setState({
      airports,
      flights,
    });
  }

  public render() {
    const origin = this.state.airports.find((a) => a.code === this.props.route.origin);
    const destination = this.state.airports.find((a) => a.code === this.props.route.destination);

    return (
      <>
        <h1>
          Flight selection
        </h1>
        <h2>
          {origin && origin.name} to {destination && destination.name}
        </h2>
        {this.state.flights.map(this.renderFlight)}
        <Button
          type="primary"
          disabled={!this.state.selectedFlight}
          onClick={this.onContinue}
        >
          Continue
        </Button>
      </>
    );
  }

  private renderFlight = (flight: Flight) => {
    const origin = this.state.airports.find((a) => a.code === flight.origin);
    const destination = this.state.airports.find((a) => a.code === flight.destination);

    const onSelect = () => this.onFlightSelect(flight.id);

    return (
      <Row
        style={{ marginBottom: 10 }}
        key={flight.id}
        type="flex"
        justify="center"
        align="middle"
      >
        <Col span={18}>
          <Row
            type="flex"
            justify="center"
          >
            <Col>
              {`${flight.duration.hours()} hr ${flight.duration.minutes()} min`}
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "left" }} span={12}>
              <div>
                {flight.departureDate.format("HH:mm")}
              </div>
              {origin ? origin.name : flight.origin}
            </Col>
            <Col style={{ textAlign: "right" }} span={12}>
              <div>
                {flight.arrivalDate.format("HH:mm")}
              </div>
              {destination ? destination.name : flight.destination}
            </Col>
          </Row>
        </Col>
        <Col style={{ textAlign: "center" }} span={6}>
          <Button
            type="default"
            disabled={this.state.selectedFlight === flight.id}
            onClick={onSelect}
          >
            Select
          </Button>
        </Col>
      </Row>
    );
  }

  private onFlightSelect = (id: string) => {
    this.setState({
      selectedFlight: id,
    });
  }

  private onContinue = () => {
    const flight = this.state.flights.find((f) => f.id === this.state.selectedFlight);

    // tslint:disable-next-line
    console.log(`Selected flight from ${flight!.origin} to ${flight!.destination} on ${flight!.departureDate.toDate()}`);
  }
}
