import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  transform(value: Array<any>): Array<any> {
    if (!value) {
      return;
    }

    let newVal = value.sort((a: any, b: any) => {
        let date1 = a.Date;
        let date2 = b.Date;

        if (date1 > date2) {
            return 1;
        } else if (date1 < date2) {
            return -1;
        } else {
            return 0;
        }
    });

    return newVal;
  }

}
