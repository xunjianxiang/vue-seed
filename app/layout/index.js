'use strict';

import './layout.scss';
import Vue from 'vue';
import Component from 'vue-class-component';

import HeaderComponent from './header.component';
import SidebarComponent from './sidebar.component';
import ContainerComponent from './container.component';

@Component({
  template: `
    <div class="app-layout flex">
      <app-sidebar></app-sidebar>
      <app-container></app-container>
    </div>
  `,
  components: {
    'app-header': HeaderComponent,
    'app-sidebar': SidebarComponent,
    'app-container': ContainerComponent
  }
})

export default class LayoutComponent extends Vue {}
