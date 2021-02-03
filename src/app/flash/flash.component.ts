import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IFlash } from '../flash.model';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlashComponent {
  @Input() flash: IFlash = {
    question: '',
    answer: '',
    id: 0,
    show: false,
  };
  @Output() toggleCard = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() rememberedChange = new EventEmitter();

  onToggleCard(): void {
    this.toggleCard.emit(this.flash.id);
  }

  deleteFlash(): void {
    this.delete.emit(this.flash.id);
  }

  editFlash(): void {
    this.edit.emit(this.flash.id);
  }

  markCorrect(): void {
    this.rememberedChange.emit({
      id: this.flash.id,
      flag: 'correct'
    });
  }

  markIncorrect(): void {
    this.rememberedChange.emit({
      id: this.flash.id,
      flag: 'incorrect'
    });
  }

}
