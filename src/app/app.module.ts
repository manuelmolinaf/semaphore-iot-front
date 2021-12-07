import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
;
import { HttpClientModule } from '@angular/common/http';
import { SemaphoreComponent } from './semaphore/semaphore.component';
import { MobileComponent } from './mobile/mobile.component';
import {CommonModule} from "@angular/common";
const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: '/mqtt'
}
@NgModule({
  declarations: [
    AppComponent,
    SemaphoreComponent,
    MobileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
