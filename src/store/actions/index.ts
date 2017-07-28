
import {
  LOADING_STATUS,
  TO_PART
} from './actionTypes';
import { Action } from '@/types';
// import AppConfig from '@/AppConfig';

export const loadingStatus: Function = function (payload: boolean): Action {
  return {
    type: LOADING_STATUS,
    payload: payload
  }
}

export const toCarPart: Function = function (payload: boolean): Action {
  return {
    type: TO_PART,
    payload: payload
  }
}
