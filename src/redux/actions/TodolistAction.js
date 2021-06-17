import axios from "axios";
import { GET_TASK_API } from "../constants/TodoListConstant";

export const getTaskListApi = () => {
  return (dispath) => {
    // dispath(getTaskListRequest());
    axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    })
      .then((res) => {
        dispath({
          type: GET_TASK_API,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addTaskApi = (taskName) => {
  return (dispath) => {
    axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: taskName },
    })
      .then((res) => {
        dispath(getTaskListApi());
      })
      .catch((err) => {});
  };
};

export const deleteTaskApi = (taskName) => {
  return (dispath) => {
    axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    })
      .then((res) => {
        dispath(getTaskListApi());
      })
      .catch((err) => {});
  };
};
export const rejectTaskApi = (taskName) => {
  return (dispath) => {
    axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    })
      .then((res) => {
        dispath(getTaskListApi());
      })
      .catch((err) => {});
  };
};
export const checkTaskApi = (taskName) => {
  return (dispath) => {
    axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    })
      .then((res) => {
        dispath(getTaskListApi());
      })
      .catch((err) => {});
  };
};
 
