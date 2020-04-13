import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() numberOfPages: number;
  @Input() currentPage: number;
  @Output() pageChanged = new EventEmitter<number>();

  pageOptions: number[];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log(this.numberOfPages);
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
    ].filter(
      (pageNumber) => pageNumber >= 1 && pageNumber <= this.numberOfPages,
    );
  }

  onPageChanged(newPage: number) {
    this.pageChanged.emit(newPage);
  }
}
