import { PaymentCard } from "ra-payment";
import { Address, Flight, PassengerName } from "ra-shared";

export interface BookingState {
  flight?: Flight;
  passengerName: PassengerName;
  paymentCard: PaymentCard;
  billingAddress: Address;
}
