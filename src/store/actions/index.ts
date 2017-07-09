
import {
  LOADING_STATUS,
} from './actionTypes';
import { Action } from '@/types';
// import AppConfig from '@/AppConfig';

export const loadingStatus: Function = function (payload: boolean): Action {
  return {
    type: LOADING_STATUS,
    payload: payload
  }
}
