import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpService } from '../services/http.service';

import { MoviesService } from '../services/movies.service';
import { MovieObject, RefinedResponse } from '../shared/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, AfterViewInit {
  sortValue: string = 'all';
  error: boolean = false;

  trendingMovies: Array<MovieObject>;
  trendingMoviesRating: Array<number>;
  trendingMoviesPoster: string[];
  trendingMoviesId: number[];
  trendingMoviesNames: string[];

  popularMovies: Array<MovieObject>;
  popularMoviesRating: Array<number>;
  popularMoviesPoster: string[];
  popularMoviesId: number[];
  popularMoviesNames: string[];

  popularMovies_2: Array<MovieObject>;
  popularMoviesRating_2: Array<number>;
  popularMoviesPoster_2: string[];
  popularMoviesId_2: number[];
  popularMoviesNames_2: string[];

  topRatedMovies: Array<MovieObject>;
  topRatedMoviesRating: Array<number>;
  topRatedMoviesPoster: string[];
  topRatedMoviesId: number[];
  topRatedMoviesNames: string[];

  searchState: boolean;
  searchName: string;
  searchMovies: Array<MovieObject>;
  searchMoviesRating: Array<number>;
  searchMoviesPoster: string[];
  searchMoviesId: number[];
  searchMoviesNames: string[];

  liked: boolean = false;
  likedState: boolean;

  isFetching: boolean = false;

  @ViewChild('like', { static: false }) likedEl: ElementRef<HTMLDivElement>;

  constructor(
    private moviesService: MoviesService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.moviesService.isFetching.next(this.isFetching);

    this.moviesService.sortValue.subscribe({
      next: (value) => {
        this.sortValue = value;
      },
    });

    const likedMoviesTest = this.moviesService.getLikedMovies();

    // Trending
    this.httpService.getTrending().subscribe({
      next: (movieData) => {
        this.trendingMovies = movieData.movies;
        this.trendingMoviesPoster = movieData.moviePosterPaths;
        this.trendingMoviesRating = movieData.movieRatings;
        this.trendingMoviesId = movieData.movieIds;
        this.trendingMoviesNames = movieData.movieNames;

        this.trendingMovies.forEach((movie) => {
          if (likedMoviesTest.some((item) => item.id == movie.id)) {
            movie['liked'] = true;
          }
        });
      },
      error: (err) => {
        if (err) {
          this.error = true;
          this.isFetching = false;
          this.moviesService.isFetching.next(this.isFetching);
        }
      },
    });

    // Popular
    this.httpService.getPopular().subscribe({
      next: (movieData) => {
        this.popularMovies = movieData.movies;
        this.popularMoviesPoster = movieData.moviePosterPaths;
        this.popularMoviesRating = movieData.movieRatings;
        this.popularMoviesId = movieData.movieIds;
        this.popularMoviesNames = movieData.movieNames;

        this.popularMovies.forEach((movie) => {
          if (likedMoviesTest.some((item) => item.id == movie.id)) {
            movie['liked'] = true;
          }
        });
      },
      error: (err) => {
        if (err) {
          this.error = true;
          this.isFetching = false;
          this.moviesService.isFetching.next(this.isFetching);
        }
      },
    });
    this.httpService.getPopular_2().subscribe({
      next: (movieData) => {
        this.popularMovies_2 = movieData.movies;
        this.popularMoviesPoster_2 = movieData.moviePosterPaths;
        this.popularMoviesRating_2 = movieData.movieRatings;
        this.popularMoviesId_2 = movieData.movieIds;
        this.popularMoviesNames_2 = movieData.movieNames;

        this.popularMovies_2.forEach((movie) => {
          if (likedMoviesTest.some((item) => item.id == movie.id)) {
            movie['liked'] = true;
          }
        });
      },
      error: (err) => {
        if (err) {
          this.error = true;
          this.isFetching = false;
          this.moviesService.isFetching.next(this.isFetching);
        }
      },
    });

    // Top rated
    this.httpService.getTopRated().subscribe({
      next: (movieData) => {
        this.isFetching = false;
        this.moviesService.isFetching.next(this.isFetching);
        this.topRatedMovies = movieData.movies;
        this.topRatedMoviesPoster = movieData.moviePosterPaths;
        this.topRatedMoviesRating = movieData.movieRatings;
        this.topRatedMoviesId = movieData.movieIds;
        this.topRatedMoviesNames = movieData.movieNames;

        this.topRatedMovies.forEach((movie) => {
          if (likedMoviesTest.some((item) => item.id == movie.id)) {
            movie['liked'] = true;
          }
        });
      },
      error: (err) => {
        if (err) {
          this.error = true;
          this.isFetching = false;
          this.moviesService.isFetching.next(this.isFetching);
        }
      },
    });

    // search
    if (localStorage.getItem('Movies')) {
      const movies = JSON.parse(localStorage.getItem('Movies'));

      this.searchMovies = movies.movies;
      this.searchMoviesPoster = movies.moviePosterPaths;
      this.searchMoviesRating = movies.movieRatings;
      this.searchMoviesId = movies.movieIds;
      this.searchMoviesNames = movies.movieNames;

      this.searchMovies.forEach((movie) => {
        if (likedMoviesTest.some((item) => item.id == movie.id)) {
          movie['liked'] = true;
        }
      });
    }

    if (localStorage.getItem('searchName')) {
      const name = JSON.parse(localStorage.getItem('searchName'));
      this.searchName = name;
    }

    this.moviesService.moviesSearch.subscribe({
      next: (movies) => {
        localStorage.setItem('Movies', JSON.stringify(movies));

        this.searchMovies = movies.movies;
        this.searchMoviesPoster = movies.moviePosterPaths;
        this.searchMoviesRating = movies.movieRatings;
        this.searchMoviesId = movies.movieIds;
        this.searchMoviesNames = movies.movieNames;

        this.moviesService.searchName.subscribe((name) => {
          this.searchName = name;
          localStorage.setItem('searchName', JSON.stringify(name));
        });
      },
    });

    this.searchState = this.moviesService.searchState;
  }

  ngAfterViewInit(): void {}

  addToLiked(e, id, movie) {
    movie['liked'] = !movie['liked'];

    if (movie['liked'] == true) {
      this.moviesService.onLike(movie, id);
    } else {
      this.moviesService.onDisLike(id);
    }
  }

  ratingColor(rating: number): string {
    if (rating < 51) {
      return '#DC143C';
    } else if (rating < 71) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
}
