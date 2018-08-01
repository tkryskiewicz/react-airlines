import { BookingState } from "./booking";
import { PaymentsState } from "./payments";
import { SharedState } from "./shared";

export interface AppState {
  shared: SharedState;
  payments: PaymentsState;
  booking: BookingState;
}
