import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpService } from '../services/http.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit {
  search: boolean;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.search = param['movie-name'] ? true : false;
      this.moviesService.search.next(this.search);
    });

    this.search = this.moviesService.searchState;

    // this.httpService.isLoading.subscribe((state) => {
    //   this.isLoading = state;
    //   console.log(!this.isLoading);
    // });

    this.moviesService.isLoading.next(false);
  }
}
