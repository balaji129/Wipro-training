import { Component, Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'ratingEmoji', standalone:false
 })
export class RatingEmojiPipe implements PipeTransform {
  transform(rating: number): string {
    const map = ['😞','😕','😐','🙂','😍'];
    const idx = Math.min(Math.max(rating, 1), 5) - 1;
    return map[idx];
  }
}
