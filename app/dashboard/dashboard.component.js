'use strict';

import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';

@Component({
  template: `
    <div>
      <el-card>
        <el-button>Dashboard</el-button>
      </el-card>
      <el-table stripe :data="items">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" content="年龄增长" placement="top">
              <el-button size="small" type="text" icon="arrow-up" @click="up(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="年龄降低" placement="top">
              <el-button size="small" type="text" icon="arrow-down" @click="down(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </table>
    </div>
  `
})

export default class DashboardComponent extends Vue {
  mounted () {
    this.$store.dispatch('users/get');
  }
  up (item) {
    item.age ++;
    this.$store.dispatch('users/set', item);
  }
  down (item) {
    if (!item.age) return;
    item.age --;
    this.$store.dispatch('users/set', item);
  }
  get items () {
    return this.$store.state.users.list;
  }
}
