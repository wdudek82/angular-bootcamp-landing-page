import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, pluck, switchMap, tap } from 'rxjs/operators';

export interface ArticleSource {
  name: string;
}

export interface Article {
  title: string;
  url: string;
  source: ArticleSource;
}

interface NewsApiResponse {
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private baseUrl = 'http://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private country = 'us';
  private API_KEY = environment.newsAPI;

  private pageInput$: Subject<number>;
  pageOutput$: Observable<Article[]>;
  numberOfPages$: Subject<number>;

  constructor(private http: HttpClient) {
    this.numberOfPages$ = new Subject<number>();
    this.pageInput$ = new Subject<number>();
    this.pageOutput$ = this.pageInput$.pipe(
      map((page) => {
        return new HttpParams({
          fromObject: {
            pageSize: String(this.pageSize),
            page: String(page),
            country: this.country,
            apiKey: this.API_KEY,
          },
        });
      }),
      switchMap((params) => {
        return this.http.get<NewsApiResponse>(this.baseUrl, { params });
      }),
      tap((response) => {
        const pages = Math.ceil(response.totalResults / this.pageSize);
        this.numberOfPages$.next(pages);
      }),
      pluck('articles'),
    );
  }

  selectPage(page: number): void {
    return this.pageInput$.next(page);
  }

  getNumberOfPages(): Subject<number> {
    return this.numberOfPages$;
  }
}
