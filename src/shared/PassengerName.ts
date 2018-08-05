export enum HonorificTitle {
  Mr = "mr",
  Mrs = "mrs",
  Ms = "ms",
}

export const HonorificTitles = [
  HonorificTitle.Mr,
  HonorificTitle.Mrs,
  HonorificTitle.Ms,
];

export class PassengerName {
  constructor(
    public title?: HonorificTitle,
    public firstName: string = "",
    public lastName: string = "",
  ) {
  }

  public clone() {
    return new PassengerName(
      this.title,
      this.firstName,
      this.lastName,
    );
  }
}
