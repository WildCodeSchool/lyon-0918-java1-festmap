import { Component, OnInit } from '@angular/core';
import { SearchByArtistService } from "../search-by-artist.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Artist } from '../Artist';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})

export class ResultsListComponent implements OnInit {
  artist: Artist = {
    name: '',
    image: '',
    id: 0,
    onTourUntil: '',
    summary: '',
    uri: '',
  };
  p: number = 1;

  constructor(
    private _searchbyArtistService: SearchByArtistService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  public artistDisplayName: string;
  public userInput: string;
  public artists : Artist[] = [];

  // onChoosing(id) {
  //   this.router.navigate(['/artist', id]);
  // }

  ngOnInit() {
    this.route.params.subscribe((params: ParamMap) => {
        this.userInput = params['value'];

        this._searchbyArtistService.getResults(this.userInput).subscribe((res: any) => {
          this.artists = [];
          let artistes = res.resultsPage.results.artist;
          for (let artist of artistes){
            let unArtiste = new Artist(artist.displayName, artist.id, artist.onTourUntil, artist.uri);
            this._searchbyArtistService.getImgDescr(unArtiste.name).subscribe((data: any) => {
              unArtiste.image = data.artist.image[2]['#text'];
              // unArtiste.summary = data.artist.bio.summary;
              this.artists.push(unArtiste);
          });
          }
      });
    });
  }
  onPageChange(page: number) {
    this.p = page;
    window.scrollTo(0, 0);
    }
}

