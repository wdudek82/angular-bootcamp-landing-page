import { Component, OnInit } from '@angular/core';
import { Article, NewsApiService } from '../news-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-article-list',
  templateUrl: './news-article-list.component.html',
  styleUrls: ['./news-article-list.component.scss'],
})
export class NewsArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private newsApiService: NewsApiService) {}

  ngOnInit(): void {
    this.newsApiService.pageOutput$.subscribe((articles) => {
      this.articles = articles;
    });

    this.newsApiService.selectPage(1);
  }
}
