import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rating' }) 
export class RatingPipe implements PipeTransform {
    transform(value: number | string): number {
        return Number.isInteger(value) ? value : value * 10;
      }
 }