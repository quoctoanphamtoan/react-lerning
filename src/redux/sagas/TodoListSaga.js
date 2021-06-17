import axios from "axios";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { todoListService } from "../../services/TodoListService";
import { STATUS_CODE } from "../../utils/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstant";
import {
  ADD_TASK_API,
  GET_TASK_API,
  GET_TASK_LIST_API,
} from "../constants/TodoListConstant";

function* getTaskApi(action) {
  //   console.log(result.data);
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(2000);
    let result = yield call(todoListService.getTaskApi);
    if (result.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API,
        payload: result.data,
      });
    }

    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put({
      type: HIDE_LOADING,
    });
  }
}
export function* theodoiActionGetTaskApi() {
  yield takeLatest(GET_TASK_LIST_API, getTaskApi);
}

//xu li nghiep vu
function* addTaskApi(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(2000);
    const { data, status } = yield call(() => {
      return todoListService.addTaskApi(action.payload);
    });
    // if (result.status === STATUS_CODE.SUCCESS) {
    //   yield put({
    //     type: GET_TASK_API,
    //     payload: result.data,
    //   });
    // }
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_LIST_API,
      });
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put({
      type: HIDE_LOADING,
    });
  }
}
export function* theodoiActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApi);
}
