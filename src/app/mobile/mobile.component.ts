import { Component, OnInit } from '@angular/core';
import {IotApiService} from "../../services/iot-api.service";
import {MqttService} from "ngx-mqtt";

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  constructor(private iotApiService:IotApiService, private _mqttService: MqttService) { }

  ngOnInit(): void {
  }

  mobileMessage(): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish('crosswalk', 'cross', {qos: 1, retain: true})

  }

}
