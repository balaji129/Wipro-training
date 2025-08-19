import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reversepipe',
  standalone: false
})
export class ReversepipePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('').reverse().join('');
  }

}
