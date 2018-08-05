import { Button, DatePicker, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as Moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { Airport, Route } from "ra-shared";
import { AppState, loadAirports } from "ra-store";
import { SharedAction } from "ra-store/shared";

import { RouteSelector } from "../RouteSelector";
import { TimetableService } from "../TimetableService";

export interface FlightSearchProps extends FormComponentProps {
  airports: Airport[];
  onInit: () => void;
  onSearch: (route: Route, departureDate: Moment.Moment) => void;
}

interface FlightSearchState {
  route: Route;
  departureDates: Moment.Moment[];
  departureDate?: Moment.Moment;
}

export class FlightSearch extends React.Component<FlightSearchProps, FlightSearchState> {
  private timetableService = new TimetableService();

  constructor(props: FlightSearchProps) {
    super(props);

    this.state = {
      departureDates: [],
      route: new Route(),
    };
  }

  public async componentDidMount() {
    this.props.onInit();
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onSearch}>
        <RouteSelector
          form={this.props.form}
          airports={this.props.airports}
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

const mapStateToProps = (state: AppState): Pick<FlightSearchProps, "airports"> => ({
  airports: state.shared.airports,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, SharedAction>): Pick<FlightSearchProps, "onInit"> => ({
  onInit: () => dispatch(loadAirports),
});

export const FlightSearchConnected = connect(mapStateToProps, mapDispatchToProps)(FlightSearchWrapped);
