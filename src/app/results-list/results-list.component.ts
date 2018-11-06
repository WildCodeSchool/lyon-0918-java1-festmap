import { Component, OnInit } from "@angular/core";
import { SearchByArtistService } from "../search-by-artist.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { City } from "../City";
import { Artist } from "../Artist";
import { Venue } from "../Venue";
import { HostListener } from '@angular/core'

@Component({
  selector: "app-results-list",
  templateUrl: "./results-list.component.html",
  styleUrls: ["./results-list.component.css"],
  
})
export class ResultsListComponent implements OnInit {
  venue: Venue;
  artist: Artist;

  constructor(
    private _searchbyArtistService: SearchByArtistService,
    private route: ActivatedRoute
  ) {}

  public mobile: boolean;
  public currentWindowWidth: number;

  public artistDisplayName: string;
  public userInput: string;

  public artists: Artist[];
  public venues: Venue[];
  public cities: City[];

  public filterArtists: boolean = true;
  public filterVenues: boolean = true;
  public filterCities: boolean = true;

  public buttonColor: string = '#000';


  @HostListener('window:resize')
  onResize() {this.currentWindowWidth = window.innerWidth}

  ngOnInit() {
    this.currentWindowWidth = window.innerWidth;

    this.route.params.subscribe((params: ParamMap) => {
      this.showAll();
      this.userInput = params["value"];
      this.artists = this._searchbyArtistService.getArtists(this.userInput);
      this.venues = this._searchbyArtistService.getVenues(this.userInput);
      this.cities = this._searchbyArtistService.getCities(this.userInput);
    });
  }

  onChoosingArtist(chosenArtist) {
    this._searchbyArtistService.setChosenArtist(chosenArtist);
  }

  onChoosingVenue(chosenVenue) {
    this._searchbyArtistService.setChosenVenue(chosenVenue);
  }

  onChoosingCity(chosenCity) {
    this._searchbyArtistService.setChosenCity(chosenCity);
  }

  changeColorClick() {
    this.buttonColor = '#7d3c98';
  }

  showArtists() {
    this.filterArtists = true;
    this.filterVenues = false;
    this.filterCities = false;
  }

  showVenues() {
    this.filterVenues = true;
    this.filterArtists = false;
    this.filterCities = false;
  }

  showAll() {
    this.filterArtists = true;
    this.filterVenues = true;
    this.filterCities = true;
  }

  showCities() {
    this.filterArtists = false;
    this.filterVenues = false;
    this.filterCities = true;
  }
}

// https://api.songkick.com/api/3.0/artists/mbid:a523bd85-01ad-4815-aaac-2b95c1946088/calendar.json?apikey=R82Hox7PJZDJyV0G
// https://api.songkick.com/api/3.0/search/artists.json?apikey=R82Hox7PJZDJyV0G&query=oldelaf
