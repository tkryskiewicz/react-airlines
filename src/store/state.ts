import { BookingState } from "./booking";
import { SharedState } from "./shared";

export interface AppState {
  shared: SharedState;
  booking: BookingState;
}
