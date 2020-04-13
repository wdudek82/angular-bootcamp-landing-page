import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitPipe } from './split.pipe';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [SplitPipe, PaginatorComponent],
  imports: [CommonModule],
  exports: [SplitPipe, PaginatorComponent],
})
export class SharedModule {}
