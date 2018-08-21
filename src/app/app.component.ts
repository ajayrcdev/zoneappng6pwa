import { Component, OnInit } from '@angular/core';

const Peer = window['Peer'] || {};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'zoneappng6pwa';
  defaultZoneTime =  25 * 60 * 1000; // 25 mins ; 10 * 1000; //
  defaultBreakTime = 5 * 60 * 1000; // 5 mins ; 5 * 1000; //
  oneSecond = 1000; // in terms of ms
  paused = false;

  countDownTimeLeft = 0;
  countUpTimeLeft = this.defaultBreakTime;

  timerCountDown;
  timerCountUp;

  peer; // web rtc

  constructor() {
  }

  ngOnInit() {
    this.reset();
    this.startCountDownTimer();

    try { // setup peerjs
      this.peer = new Peer({});
      this.peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
      });
    } catch (e) {
      console.log('cant use webrtc! e=', e);
    }

  }

  startCountDownTimer() {
    this.timerCountDown = setInterval( () => {
      this.countDownTimeLeft -= this.oneSecond;
      if (!this.countDownTimeLeft) {
        this.stopCountDownTimer();
        this.startCountUpTimer();
      }
    }, this.oneSecond);
  }

  stopCountDownTimer() {
    clearInterval(this.timerCountDown);
    this.countDownTimeLeft = 0;
  }

  startCountUpTimer() {
    this.timerCountUp = setInterval( () => {
      this.countUpTimeLeft -= this.oneSecond;
      if (!this.countUpTimeLeft) {
        this.stopCountUpTimer();
        this.reset();
        this.startCountDownTimer();
      }
    }, this.oneSecond);
  }

  stopCountUpTimer() {
    clearInterval(this.timerCountUp);
    this.countUpTimeLeft = 0;
  }

  pauseOrStartTimer() {
  }

  reset() {
    clearInterval(this.timerCountDown);
    clearInterval(this.timerCountUp);

    this.paused = false;
    this.countDownTimeLeft = this.defaultZoneTime;
    this.countUpTimeLeft = this.defaultBreakTime;
  }

  restart() {
    this.reset();
    this.startCountDownTimer();
  }

  toggle() {
    if (!this.paused) {
      clearInterval(this.timerCountDown);
      this.paused = true;
    } else {
      this.paused = false;
      this.startCountDownTimer();
    }
  }
}
