import { Button, Form, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

import { Airport } from "../Airport";
import { AirportService } from "../AirportService";
import { Route } from "../Route";
import { RouteSelector } from "../RouteSelector";

export interface FlightSearchProps extends FormComponentProps {
}

interface FlightSearchState {
  airports: Airport[];
  route: Route;
}

export class FlightSearch extends React.Component<FlightSearchProps, FlightSearchState> {
  private airportService = new AirportService();

  constructor(props: FlightSearchProps) {
    super(props);

    this.state = {
      airports: [],
      route: new Route(),
    };
  }

  public async componentDidMount() {
    try {
      const airports = await this.airportService.getAll();

      airports.sort((a, b) => a.name.localeCompare(b.name));

      this.setState({
        airports,
      });
    } catch (error) {
      message.error(`Loading resources failed - ${error}`);
    }
  }

  public render() {
    return (
      <Form onSubmit={this.onSearch}>
        <RouteSelector
          form={this.props.form}
          airports={this.state.airports}
          isRequired={true}
          value={this.state.route}
          onChange={this.onRouteChange}
        />
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    );
  }

  private onRouteChange = (route: Route) => {
    this.setState({
      route,
    });
  }

  private onSearch = (event: React.FormEvent<any>) => {
    event.preventDefault();

    this.props.form.validateFields((errors) => {
      if (!errors) {
        // tslint:disable-next-line
        console.log(`Searching for flights from ${this.state.route.origin} to ${this.state.route.destination}`);
      }
    });
  }
}

export const FlightSearchWrapped = Form.create()(FlightSearch);
