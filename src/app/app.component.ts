import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { Subscription } from 'rxjs';

import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'movies-database-app';
  isLoading: boolean = true;
  obs: Subscription;
  searching: boolean = false;

  constructor(private router: Router, private moviesService: MoviesService) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;

          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;

          break;
        }
        default: {
          break;
        }
      }
    });

    this.moviesService.search.subscribe((data) => {
      this.moviesService.searchResult(data);
    });

    this.moviesService.isFetching.subscribe((state) => {
      this.isLoading = state;
    });

    this.moviesService.searching.subscribe((state) => {
      this.searching = state;
    });
  }
}
