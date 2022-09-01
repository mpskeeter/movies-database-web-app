import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

import { MoviesService } from '../services/movies.service';
import { MovieObject } from '../shared/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MoviesComponent implements OnInit {
  trendingMovies: Array<MovieObject>;
  trendingMoviesRating: Array<number>;
  trendingMoviesPoster: string[];
  trendingMoviesId: number[];

  popularMovies: Array<MovieObject>;
  popularMoviesRating: Array<number>;
  popularMoviesPoster: string[];
  popularMoviesId: number[];

  popularMovies_2: Array<MovieObject>;
  popularMoviesRating_2: Array<number>;
  popularMoviesPoster_2: string[];
  popularMoviesId_2: number[];

  topRatedMovies: Array<MovieObject>;
  topRatedMoviesRating: Array<number>;
  topRatedMoviesPoster: string[];
  topRatedMoviesId: number[];

  searchState: boolean;
  searchName: string;
  searchMovies: Array<MovieObject>;
  searchMoviesRating: Array<number>;
  searchMoviesPoster: string[];
  searchMoviesId: number[];

  liked: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Trending
    this.httpService.getTrending().subscribe((movieData) => {
      this.trendingMovies = movieData.movies;
      this.trendingMoviesPoster = movieData.moviePosterPaths;
      this.trendingMoviesRating = movieData.movieRatings;
      this.trendingMoviesId = movieData.movieIds;
    });

    // Popular
    this.httpService.getPopular().subscribe((movieData) => {
      this.popularMovies = movieData.movies;
      this.popularMoviesPoster = movieData.moviePosterPaths;
      this.popularMoviesRating = movieData.movieRatings;
      this.popularMoviesId = movieData.movieIds;
    });
    this.httpService.getPopular_2().subscribe((movieData) => {
      this.popularMovies_2 = movieData.movies;
      this.popularMoviesPoster_2 = movieData.moviePosterPaths;
      this.popularMoviesRating_2 = movieData.movieRatings;
      this.popularMoviesId_2 = movieData.movieIds;
    });

    // Top rated
    this.httpService.getTopRated().subscribe((movieData) => {
      this.topRatedMovies = movieData.movies;
      this.topRatedMoviesPoster = movieData.moviePosterPaths;
      this.topRatedMoviesRating = movieData.movieRatings;
      this.topRatedMoviesId = movieData.movieIds;
    });

    // search
    if (localStorage.getItem('Movies')) {
      const movies = JSON.parse(localStorage.getItem('Movies'));

      this.searchMovies = movies.movies;
      this.searchMoviesPoster = movies.moviePosterPaths;
      this.searchMoviesRating = movies.movieRatings;
      this.searchMoviesId = movies.movieIds;
    }

    if (localStorage.getItem('searchName')) {
      const name = JSON.parse(localStorage.getItem('searchName'));
      this.searchName = name;
    }

    this.moviesService.moviesSearch.subscribe((movies) => {
      localStorage.setItem('Movies', JSON.stringify(movies));

      this.searchMovies = movies.movies;
      this.searchMoviesPoster = movies.moviePosterPaths;
      this.searchMoviesRating = movies.movieRatings;
      this.searchMoviesId = movies.movieIds;

      this.moviesService.searchName.subscribe((name) => {
        this.searchName = name;
        localStorage.setItem('searchName', JSON.stringify(name));
      });
    });

    this.searchState = this.moviesService.searchState;

    this.moviesService.isLiked.subscribe((state) => {
      this.liked = state;
      console.log(this.liked);
    });
  }

  toggleLike(movie: MovieObject, index: number) {
    if (this.liked) {
      this.trendingMovies.filter((movietype, index) => {
        if (this.trendingMovies.indexOf(movie) == index) {
          this.moviesService.onLike(movie);
        }
      });
    } else {
      this.moviesService.onDisLike(index);
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
