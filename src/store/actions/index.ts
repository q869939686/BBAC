
import {
  LOADING_STATUS,
  TO_PART,
  SHOW_CHART
} from './actionTypes';
import { Action } from '@/types';
// import AppConfig from '@/AppConfig';

export const changeLoadingStatus: Function = function (payload: boolean): Action {
  return {
    type: LOADING_STATUS,
    payload: payload
  }
}

export const changeToPartStatus: Function = function (payload: boolean): Action {
  return {
    type: TO_PART,
    payload: payload
  }
}

export const changeShowChartStatus: Function = function (payload: boolean): Action {
  return {
    type: SHOW_CHART,
    payload: payload
  }
}