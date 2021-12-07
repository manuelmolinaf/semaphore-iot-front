import {Component, ElementRef, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import {IotApiService} from "../services/iot-api.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private iotService: IotApiService) { }

  ngOnInit(): void {
  }
}
