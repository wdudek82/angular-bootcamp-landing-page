import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsArticleListComponent } from './news-article-list/news-article-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NewsArticleListComponent],
  imports: [CommonModule, SharedModule],
  exports: [NewsArticleListComponent],
})
export class NewsApiModule {}
