import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(title: string, outletName: string): string {
    return title.replace(/ - .+$/, '');
  }

}
