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
            <el-button size="small" @click="update(scope.row)">年龄增长</el-button>
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
  update (item) {
    item.age ++;
    this.$store.dispatch('users/set', item);
  }
  get items () {
    return this.$store.state.users.list;
  }
}
