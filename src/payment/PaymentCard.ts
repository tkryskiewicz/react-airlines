import * as Moment from "moment";

export class PaymentCard {
  constructor(
    public cardNumber: string = "",
    public cardType: string = "",
    public expiryDate?: Moment.Moment,
    public securityCode: string = "",
    public cardholdersName: string = "",
  ) {
  }

  public clone() {
    return new PaymentCard(
      this.cardNumber,
      this.cardType,
      this.expiryDate,
      this.securityCode,
      this.cardholdersName,
    );
  }
}
