import { Component, ViewChild } from '@angular/core';
import { IFlash } from './flash.model';
import { NgForm } from '@angular/forms';

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('flashForm', { static : true }) flashForm: NgForm;
  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
  }];

  editing = false;
  editingId: number | undefined;

  trackByFlashId(index: number, flash: any): number {
    return flash.id;
  }

  handleToggleCard(id: number): any {
    const flash = this.flashs.find((flash) => flash.id === id);
    if (flash) {
      flash.show = !flash.show;
    }
  }

  handleDelete(id: number): void {
    const flashId = this.flashs.findIndex(flash => flash.id === id);
    this.flashs.splice(flashId, 1);
  }

  handleEdit(id: number): void {
    this.editing = true;
    this.editingId = id;
    const flash = this.flashs.find((flash) => flash.id === id);
    this.flash.question = flash?.question;
    this.flash.answer = flash?.answer;

  }

  handleUpdate() {
    const flash = this.flashs.find((flash) => flash.id === this.editingId);
    flash.question = this.flash.question;
    flash.answer = this.flash.answer;
    this.handleCancel();
  }

  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  handleRemeberedChange({id, flag}: {id: number, flag: string}): void {
    const flash = this.flashs.find((flash) => flash.id === id);
    if (flash) {
      flash.remembered = flag;
    }
  }

  handleSubmit(): void {
    this.flashs.push({
      id: generateId(),
      ...this.flashForm,
    })
    this.handleClear();
  }

  handleClear(): void {
    this.flash = {
      question: '',
      answer: '',
    };
    this.flashForm.reset();
  }

}
