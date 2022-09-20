import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ratingColor' }) 
export class RatingColorPipe implements PipeTransform {
  transform(value: number): string {
    return (rating < 51)
      ? '#DC143C'
      : (rating < 70)
        ? 'yellow'
        : 'green'
  }
}