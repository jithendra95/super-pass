import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard',
})
export class CreditCardPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if(typeof value === 'undefined'){
      return '';
    }

    let creditCard = value;
    if(value.length >= 8){
      creditCard =
      value.substring(0, 4) +
      ' ****** ' +
      value.substring(value.length - 4, value.length);
    }
   
    return creditCard;
  }
}
