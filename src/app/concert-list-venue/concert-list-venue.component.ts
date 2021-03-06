import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Concert } from '../Concert';
import { SearchByArtistService } from '../search-by-artist.service';
import { Artist } from '../Artist';

@Component({
  selector: 'app-concert-list-venue',
  templateUrl: './concert-list-venue.component.html',
  styleUrls: ['./concert-list-venue.component.css']
})
export class ConcertListVenueComponent implements OnInit, OnChanges {

  @Input() concerts: Concert[];

  page = 1;

  constructor(
    private _searchByArtistService: SearchByArtistService
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.page = 1;
  }

  onChoosingArtist(artistId) {
    this._searchByArtistService.getOneArtist(artistId)
    .subscribe(res => {
      const obj = res.resultsPage.results.artist;
      const artist = new Artist(
          obj.displayName,
          obj.id,
          obj.onTourUntil,
          obj.uri
        );

        this._searchByArtistService.getImgDescr(obj.displayName)
        .subscribe(data => {
          artist.image = data.artist.image[3]['#text'];
          artist.summary = data.artist.bio.summary;
        });

      this._searchByArtistService.setChosenArtist(artist);
      });
  }

  onPageChange(page: number) {
    window.scrollTo({ top: 600, behavior: 'smooth' });
    setTimeout(() => (this.page = page), 200);
  }

}

