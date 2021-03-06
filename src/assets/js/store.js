"use strict";
/**
 * @file Vuex 状态封装
 * @author DJ
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  //数据源申明
  state: {
    isReload: false,
    userId: {},
    userInfo: {},
    userType: 0, // 用户身份: 1、工程、合作； 2、供应商
    loginInfo: {},
    taskModel: "",
    backRouter: "",
    codeValue: [],
    clientInfo: {},
    projectInfo: {},
    filterParams: "",
    taskParams: {},
    goodsParams: "",
    suppParams: {},
    confirmParams: {},
    contractParams: {},
    servePath: "",
    tabsShow: true,
    tabsActive: 0
  },
  //写入缓存并同步state
  mutations: {
    cleanStore: (state, val) => {
      if (val) {
        state.isReload = false;
        state.userId = {};
        state.userInfo = {};
        state.taskModel = "";
        state.backRouter = "";
        state.clientInfo = {};
        state.projectInfo = {};
        state.filterParams = "";
        state.taskParams = {};
        state.goodsParams = "";
        state.suppParams = {};
        state.confirmParams = {};
        state.contractParams = {};
      }
    },
    isReload: (state, val) => {
      state.isReload = val;
    },
    userId: (state, val) => {
      state.userId = val;
    },
    userInfo: (state, val) => {
      state.userInfo = val;
    },
    userType: (state, val) => {
      state.userType = parseInt(val);
    },
    loginInfo: (state, val) => {
      state.loginInfo = val;
    },
    taskModel: (state, val) => {
      state.taskModel = val;
    },
    backRouter: (state, val) => {
      state.backRouter = val;
    },
    codeValue: (state, val) => {
      state.codeValue = val;
    },
    clientInfo: (state, val) => {
      state.clientInfo = val;
    },
    projectInfo: (state, val) => {
      state.projectInfo = val;
    },
    filterParams: (state, val) => {
      state.filterParams = val;
    },
    taskParams: (state, val) => {
      state.taskParams = val;
    },
    goodsParams: (state, val) => {
      state.goodsParams = val;
    },
    suppParams: (state, val) => {
      state.suppParams = val;
    },
    confirmParams: (state, val) => {
      state.confirmParams = val;
    },
    contractParams: (state, val) => {
      state.contractParams = val;
    },
    servePath: (state, val) => {
      state.servePath = val;
    },
    tabsShow: (state, val) => {
      state.tabsShow = val;
    },
    tabsActive: (state, val) => {
      state.tabsActive = val;
    }
  }
});