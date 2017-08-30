'use strict';

import './progressbar.scss'
import Vue from 'vue';
import Component from 'vue-class-component';

import { interval } from './progressbar.config';

@Component({
  template: `
      <el-progress :percentage="per" stroke-width="3" text-inside="true" show-text="false" class="app-progressbar"></el-progress>
  `
})

export default class ProgressbarComponent extends Vue {

  max = 100;
  min = 0;
  per = this.min;
  step = 10;
  task;

  loading () {
    if (this.per < this.max) {
      this.per += (this.max - this.per) * interval / 1000 / this.step;
    } else {
      clearInterval(this.task);
    }
  }

  update (per) {
    this.per = per;
  }

  start () {
    setTimeout(() => {
      this.loading();
    });
    this.task = setInterval(() => {
      this.loading();
    }, interval)
  }

  finish () {
    this.update(100);
    clearInterval(this.task);
  }

}
