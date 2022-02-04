import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CreditCardPipe } from '../pipes/credit-card.pipe';

@NgModule({
  declarations: [
    CreditCardPipe
  ],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, FormsModule, CreditCardPipe],
})
export class SharedModule {}
