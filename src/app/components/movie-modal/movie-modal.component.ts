import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Movie} from "../../models/movie.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent {
  @Input() movie: Movie = {Id: '-1', Title: '', Description: '', Genres: []};
  @Output() onModalClose: EventEmitter<any> = new EventEmitter<any>();

  closeModal(): void {
    this.onModalClose.emit();
  }
}
