import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  forecastData: any;

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    if (navigator) {
      this.forecastService.getForecast().subscribe(
        (forecastData) => {
          console.log(forecastData);
          this.forecastData = forecastData;
        },
        (err) => console.log(err),
      );
    }
  }
}
