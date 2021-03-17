import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summarize',
})
export class SummarizePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.substring(0, 200) + '...';
  }
}
