import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CreditCardPipe } from '../pipes/credit-card.pipe';
import { UiElementsModule } from '../ui-elements/ui-elements.module';

@NgModule({
  declarations: [CreditCardPipe],
  imports: [CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreditCardPipe,
    MaterialModule,
    UiElementsModule,
  ],
})
export class SharedModule {}
