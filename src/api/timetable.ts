const getDepartureDatesUrlBase = "/api/timetable/departureDates";

export const getDepartureDatesUrlFormat = `${getDepartureDatesUrlBase}/:origin/:destination`;

export const getDepartureDatesUrl = (origin: string, destination: string) =>
  `${getDepartureDatesUrlBase}/${origin}/${destination}`;
