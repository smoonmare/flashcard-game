import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashService } from './flash.service';
import { tap } from 'rxjs/operators';
import { IFlash } from './flash.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('flashForm', { static: false }) flashForm!: NgForm;
  editing = false;
  editingId!: number;
  flash = {
    question: '',
    answer: ''
  };
  flashs$;
  flashs!: IFlash;
  constructor(private flashService: FlashService) {
    this.flashs$ = this.flashService.flashs$;
  }

  trackByFlashId(index: number, flash: IFlash): number {
    return flash.id;
  }

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  }

  handleClear(): void {
    this.flash = {
      question: '',
      answer: '',
    };
    this.flashForm.reset();
  }

  handleToggleCard(id: number): void {
    this.flashService.toggleFlash(id);
  }

  handleDelete(id: number): void {
    this.flashService.deleteFlash(id);
  }

  handleEdit(id: number): void {
    this.flash = this.flashService.getFlash(id);
    this.editing = true;
    this.editingId = id;
  }

  handleUpdate(): void {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleCancel(): void {
    this.editing = false;
    this.editingId = 0;
    this.handleClear();
  }

  handleRememberedChange({ id, flag }: {id: number, flag: any}): void {
    this.flashService.rememberedChange(id, flag);
  }
}
