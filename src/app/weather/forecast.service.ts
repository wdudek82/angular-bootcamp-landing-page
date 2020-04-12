import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  map,
  pluck,
  switchMap,
  mergeMap,
  filter,
  toArray,
  share,
  tap,
  catchError,
} from 'rxjs/operators';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private API_KEY = environment.weatherApiKey;

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService,
  ) {}

  getCurrentLocation() {
    return new Observable<Coordinates>((subscriber) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          subscriber.next(position.coords);
          subscriber.complete();
        },
        (err) => subscriber.error(err),
      );
    }).pipe(
      tap(() => {
        this.notificationsService.addSuccess('Weather forecast updated!');
      }),
      catchError((err) => {
        this.notificationsService.addError('Failed to get location!');
        return throwError(err);
      }),
    );
  }

  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams({
          fromObject: {
            units: 'metric',
            lat: String(coords.latitude),
            lon: String(coords.longitude),
            appid: this.API_KEY,
          },
        });
      }),
      switchMap((params: HttpParams) => {
        return this.http.get<OpenWeatherResponse>(`${this.baseUrl}`, {
          params,
        });
      }),
      pluck('list'),
      mergeMap((response) => response),
      filter((list, ind) => ind % 8 === 0),
      map((item) => {
        return {
          dt_txt: item.dt_txt,
          temp: item.main.temp,
        };
      }),
      toArray(),
      share(),
    );
  }
}
