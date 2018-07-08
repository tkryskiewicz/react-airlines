import { Button, DatePicker, Form, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as Moment from "moment";
import * as React from "react";

import { Airport } from "../Airport";
import { AirportService } from "../AirportService";
import { Route } from "../Route";
import { RouteSelector } from "../RouteSelector";
import { TimetableService } from "../TimetableService";

export interface FlightSearchProps extends FormComponentProps {
  onSearch: (route: Route, departureDate: Moment.Moment) => void;
}

interface FlightSearchState {
  airports: Airport[];
  route: Route;
  departureDates: Moment.Moment[];
  departureDate?: Moment.Moment;
}

export class FlightSearch extends React.Component<FlightSearchProps, FlightSearchState> {
  private airportService = new AirportService();
  private timetableService = new TimetableService();

  constructor(props: FlightSearchProps) {
    super(props);

    this.state = {
      airports: [],
      departureDates: [],
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
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onSearch}>
        <RouteSelector
          form={this.props.form}
          airports={this.state.airports}
          isRequired={true}
          value={this.state.route}
          onChange={this.onRouteChange}
        />
        <Form.Item label="Departure date">
          {getFieldDecorator("departureDate", {
            initialValue: this.state.departureDate,
            rules: [
              { required: true, message: "This field is required" },
              { validator: this.validateDepartureDate, message: "No flights on this date" },
            ],
          })(
            <DatePicker
              disabledDate={this.isInvalidDepartureDate}
              onChange={this.onDepartureDateChange}
            />,
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    );
  }

  private onRouteChange = (route: Route) => {
    this.setState({
      route,
    }, async () => {
      if (route.origin && route.destination) {
        const departureDates = await this.timetableService.getDepartureDates(route);

        let { departureDate } = this.state;

        if (departureDate && !departureDates.some((d) => d.isSame(departureDate, "d"))) {
          departureDate = undefined;

          this.props.form.setFields({
            departureDate: undefined,
          });
        }

        this.setState({
          departureDate,
          departureDates,
        });
      } else {
        this.setState({
          departureDates: [],
        });
      }
    });
  }

  private isInvalidDepartureDate = (current: Moment.Moment) => {
    const isValid = current && current.isSameOrAfter(Moment(), "d") &&
      this.state.departureDates.some((d) => d.isSame(current, "d"));

    return !isValid;
  }

  private onDepartureDateChange = (departureDate: Moment.Moment) => {
    this.setState({
      departureDate,
    });
  }

  private validateDepartureDate = (rule: any, value: Moment.Moment | undefined, callback: any) => {
    if (value && !this.state.departureDates.some((d) => d.isSame(value, "d"))) {
      callback([rule.message]);
    }

    callback();
  }

  private onSearch = (event: React.FormEvent<any>) => {
    event.preventDefault();

    this.props.form.validateFields((errors) => {
      if (!errors) {
        const { route, departureDate } = this.state;

        this.props.onSearch(route, departureDate!);
      }
    });
  }
}

export const FlightSearchWrapped = Form.create()(FlightSearch);
