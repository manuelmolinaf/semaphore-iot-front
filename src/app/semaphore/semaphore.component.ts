import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {IotApiService} from "../../services/iot-api.service";


@Component({
  selector: 'app-semaphore',
  templateUrl: './semaphore.component.html',
  styleUrls: ['./semaphore.component.css']
})
export class SemaphoreComponent implements OnInit {
  on:boolean = false;
  count = 0;
  stepCount = new BehaviorSubject<number>(0);
  private subscription: Subscription = new Subscription();

  constructor(private _mqttService: MqttService, private iotService: IotApiService) {

  }

  ngOnInit(): void {
    this.getStepsTaken();
    this.subscribeNewTopic();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeNewTopic(): void {
    this.subscription = this._mqttService.observe('crosswalk').subscribe(async (message: IMqttMessage) => {

      if (message.payload.toString() === 'cross'){
        console.log('cross');
        this.toggleSemaphoreOnOff();
        await this.initTimer();
        this.toggleSemaphoreOnOff();
        this.sendMessage()
      }
      else if(message.payload.toString() === 'updated'){
        this.getStepsTaken();
      }

    });
  }

  getStepsTaken() {
    this.iotService.getStepsTaken().subscribe((steps)=>{
      this.stepCount.next(steps);
    })
  }

  sendMessage(): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish('crosswalk', 'crossed', {qos: 1, retain: true})
  }

  async initTimer() {
    this.count = 10;

    while (this.count > 0) {
      await this.delay(1000);
      this.count--;
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  toggleSemaphoreOnOff() {
    this.on = !this.on;
  }
}
