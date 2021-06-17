import axios from "axios";
import { DOMAIN } from "../utils/constants/settingSystem";

export class TodoListService {
  constructor() {}
  getTaskApi = () => {
    return axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: "GET",
    });
  };

  addTaskApi = (taskName)=>{
    return axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: taskName },
    })
  }
}
export const todoListService = new TodoListService();
