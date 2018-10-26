import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Artist } from './Artist';
import { Venue } from './Venue';
import { City } from './City';
import { Concert } from './Concert';

@Injectable({
  providedIn: "root"
})
export class SearchByArtistService {

  public chosenArtist: Artist;
  public chosenVenue: Venue;
  public chosenCity: City;

  constructor(private http: HttpClient) {}

  setChosenArtist(chosenArtist) {
    this.chosenArtist = chosenArtist;
  }

  setChosenVenue(chosenVenue) {
    this.chosenVenue = chosenVenue;
  }

  setChosenCity(chosenCity) {
    this.chosenCity = chosenCity;
  }

  getOneArtist(artistId) {
    return this.http.get<any>(`http://api.songkick.com/api/3.0/artists/${artistId}.json?apikey=R82Hox7PJZDJyV0G`);
  }

  getChosenVenue() {
    return this.chosenVenue;
  }

  getChosenCity() {
    return this.chosenCity;
  }

  getArtists(userInput) {
    let artists: Artist[] = [];

    this.http.get<any>(`https://api.songkick.com/api/3.0/search/artists.json?apikey=R82Hox7PJZDJyV0G&query=${userInput}`)
      .subscribe((res: any) => {
        let artistes = res.resultsPage.results.artist;
        for (let artist of artistes) {
          let unArtiste = new Artist(
            artist.displayName,
            artist.id,
            artist.onTourUntil,
            artist.uri
          );

          this.getImgDescr(unArtiste.name)
            .subscribe((data: any) => {
              if (data.artist) {
                unArtiste.image = data.artist.image[3]["#text"];
                unArtiste.summary = data.artist.bio.summary;
                artists.push(unArtiste);
              }
            });
        }
      });

     return artists;
  }

  getImgDescr(artistName) {
    return this.http.get<any>(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&autocorrect=1&api_key=9b7579d5f409106928353935ac0ab5ab&format=json`);
  }

  getVenues(userInput) {
    let venues: Venue[] = [];

    this.http.get<any>(`https://api.songkick.com/api/3.0/search/venues.json?query=${userInput}&apikey=R82Hox7PJZDJyV0G`)
      .subscribe((res: any) => {
        let venuess = res.resultsPage.results.venue;
        if (venuess) {
        for (let venue of venuess) {
          let aVenue = new Venue(
            venue.displayName,
            venue.city,
            venue.country,
            venue.street,
            venue.uri,
            venue.id,
            venue.lat,
            venue.lng,
            venue.website,
            venue.description
          );

          venues.push(aVenue);
        }
      }
    });

      return venues;
  }

  getCities(userInput){
    let cities: City[] = [];
    this.http.get<any>(`https://api.songkick.com/api/3.0/search/locations.json?query=${userInput}&apikey=R82Hox7PJZDJyV0G`)
      .subscribe((data: any) => {
        let citiesTable = data.resultsPage.results.location;
        if(citiesTable) {
        for (let city of citiesTable) {
          let aCity = new City(
            city.metroArea.id,
            city.metroArea.uri,
            city.city.displayName,
            city.metroArea.country.displayName,
            city.metroArea.lat,
            city.metroArea.lng
          );
          cities.push(aCity);
        }
      }
    });

      return cities;
  }

   getVenueConcerts(venueId) {
     return this.http.get<any>(`https://api.songkick.com/api/3.0/venues/${venueId}/calendar.json?apikey=R82Hox7PJZDJyV0G`);
   }

   getCityConcerts(cityId) {
     return this.http.get<any>(`https://api.songkick.com/api/3.0/metro_areas/${cityId}/calendar.json?apikey=R82Hox7PJZDJyV0G`);
   }

   getArtistConcerts(artistId) {
    let concerts: Concert[] = [];

     this.http.get<any>(`https://api.songkick.com/api/3.0/artists/${artistId}/calendar.json?apikey=R82Hox7PJZDJyV0G`)
     .subscribe((reponse: any) => {
              let concertTable = reponse.resultsPage.results.event;
              if (concertTable) {
              for (let concert of concertTable) {
                let aConcert = new Concert(
                  concert.displayName,
                  concert.performance[0].displayName,
                  concert.venue.displayName,
                  concert.id,
                  concert.uri,
                  concert.location.city,
                  concert.location.lat,
                  concert.location.lng,
                  concert.start.datetime,
                  concert.start.date
                );
                concerts.push(aConcert);
              }
            }
          });

    return concerts;
  }
}
