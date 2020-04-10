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
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface WeatherData {
  dt_txt: string;
  main: {
    temp: number;
  };
}

interface OpenWeatherResponse {
  list: WeatherData[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private API_KEY = environment.weatherApiKey;

  constructor(private http: HttpClient) {}

  getCurrentLocation() {
    return new Observable<Coordinates>((subscriber) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          subscriber.next(position.coords);
          subscriber.complete();
        },
        (err) => subscriber.error(err),
      );
    });
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
    );
  }
}
