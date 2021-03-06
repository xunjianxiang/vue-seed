'use strict';

import Vue, { ComponentOptions } from 'vue';
import DashboardComponent from './dashboard.component';

import store from '../../store';

describe('dashboard component', () => {
  let trimString = (string) => {
    return string.trim();
  }
  let vm;
  beforeAll(() => {
    let app = document.createElement('app');
    document.body.appendChild(app);
    vm = new DashboardComponent({
      store
    }).$mount('app');
  })
  it('test button', () => {
    let button = vm.$el.querySelector('h1');
    if (!button) return;
    expect(trimString(button.textContent)).toBe('Dashboard');
  })
  it('test table', done => {
    vm.$watch('items', value => {
      expect(vm.$el.querySelectorAll('table tbody tr').length).toBe(3);
      done();
    })
  })
})
