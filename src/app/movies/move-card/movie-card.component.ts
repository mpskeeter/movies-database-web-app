import {
    Component,
    ElementRef,
    Input,
    ViewChild,
  } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieObject, RefinedResponse } from '../shared/movie.model';
  
@Component({
selector: 'app-movie-card',
templateUrl: './movie-card.component.html',
styleUrls: ['./movies-card.component.scss'],
})
export class MovieCardComponent {

@Input() movies: Array<Partial<MovieObject>> = [];

@ViewChild('like', { static: false }) likedEl: ElementRef<HTMLDivElement>;

constructor(
    private moviesService: MoviesService,
    ) {}

    addToLiked(e, id, movie) {
        movie['liked'] = !movie['liked'];

        const movieContainer = e.target.parentElement.parentElement;

        if (movie['liked'] == true) {
            this.moviesService.onLike(movie, id);

            movieContainer.classList.add('showAdd');

            setTimeout(() => {
            movieContainer.classList.remove('showAdd');
            }, 650);
        } else {
            this.moviesService.onDisLike(id);

            movieContainer.classList.add('showRemove');
            setTimeout(() => {
            movieContainer.classList.remove('showRemove');
            }, 650);
        }
    }
    
}