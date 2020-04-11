import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';

interface ForecastData {
  dt_txt: string;
  temp: number;
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  forecastData$: Observable<ForecastData[]>;

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    if (navigator) {
      this.forecastData$ = this.forecastService.getForecast();
    } else {
      console.log('Geolocation is not supported');
    }
  }
}
