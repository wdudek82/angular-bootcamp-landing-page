import { Component, OnInit } from '@angular/core';
import { Article, NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-news-article-list',
  templateUrl: './news-article-list.component.html',
  styleUrls: ['./news-article-list.component.scss'],
})
export class NewsArticleListComponent implements OnInit {
  articles: Article[] = [];
  numberOfPages: number;
  selectedPage = 1;

  constructor(private newsApiService: NewsApiService) {}

  ngOnInit(): void {
    this.newsApiService.pageOutput$.subscribe((articles) => {
      this.articles = articles;
    });
    this.newsApiService.getNumberOfPages().subscribe((numberOfPages) => {
      this.numberOfPages = numberOfPages;
      console.log(numberOfPages);
    });
    this.newsApiService.selectPage(this.selectedPage);
  }

  changeSelectedPage(newPage) {
    this.newsApiService.selectPage(newPage);
    this.selectedPage = newPage;
  }
}
