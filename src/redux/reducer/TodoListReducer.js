import { GET_TASK_API } from "../constants/TodoListConstant";

const initialState = {
  taskList: [], 
};

export default  (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TASK_API:
      state.taskList = payload;
      return { ...state };

    default:
      return {...state};
  }
};
