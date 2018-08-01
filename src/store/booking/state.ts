import { PaymentCard } from "ra-payment";
import { Address, PassengerName } from "ra-shared";

export interface BookingState {
  passengerName: PassengerName;
  paymentCard: PaymentCard;
  billingAddress: Address;
}
