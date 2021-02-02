import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IFlash } from '../flash.model';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent {

  @Input() flash: IFlash = {
    id: 1,
    question: 'React to Angular',
    answer: 'No Reaction XD',
    show: false,
  };
  @Output() onToggleCard = new EventEmitter();

  toggleCard() {
    this.onToggleCard.emit(this.flash.id);
  }

}
