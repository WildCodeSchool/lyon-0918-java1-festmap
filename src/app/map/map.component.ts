import { Component, OnInit } from '@angular/core';
import { SearchByArtistService } from "../search-by-artist.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  artistId: number;
  concerts = [];
  lat: number = 41.485818;
  lng: number = 5.618187;
  infoWindowOpened = null;

  constructor(
    private _searchbyArtistService: SearchByArtistService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: ParamMap) => {
      this.artistId = params['id'];
      this._searchbyArtistService.getArtistConcerts(this.artistId)
        .subscribe(data => this.concerts = data.resultsPage.results.event);
    });
  }
}
