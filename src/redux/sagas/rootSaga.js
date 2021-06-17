import { all } from "redux-saga/effects";
import { theodoiActionAddTaskApi, theodoiActionGetTaskApi } from "./TodoListSaga";
 
export function* rootSaga() {
   yield all([
    theodoiActionGetTaskApi(),
    theodoiActionAddTaskApi()

   ]) 
}
