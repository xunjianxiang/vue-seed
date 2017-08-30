'use strict';

import '../style/index.scss';

import Vue from 'vue';
import Component from 'vue-class-component';

import LayoutComponent from './layout';

@Component({
  template: `
    <app-layout><app-layout>
  `,
  components: {
    'app-layout': LayoutComponent
  }
})

export default class AppComponent extends Vue {}
