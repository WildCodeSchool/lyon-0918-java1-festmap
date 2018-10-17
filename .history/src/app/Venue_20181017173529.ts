export class Venue {
  name: string;
  city: string;
  country: string;
  uri: string;
  road: string;

  constructor(name, city, country, uri, street) {
    this.name = name;
    this.city = city;
    this.country = country;
    this.uri = uri;
    this.street = street;
  }
}
