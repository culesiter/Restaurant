
import { Pipe, PipeTransform } from '@angular/core';
import { Idish } from './share/entities/idish';

@Pipe({
  name: 'filterdata'
})
export class FilterdataPipe implements PipeTransform {

  transform(items: Idish[], value: string, label:string): Idish[] {
    if (!items) return [];
    if (!value) return [];
    if (value == '' || value == null) return [];
    return items.filter(e => e[label].toLowerCase().indexOf(value) > -1 );
    
  }

}
