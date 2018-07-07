interface Region {
  code: string;
  name: string;
}

export class Country {
  constructor(
    public code: string,
    public name: string,
    public regions: Region[] = [],
  ) {
  }
}
