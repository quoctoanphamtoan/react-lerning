import React, { useEffect, useState } from "react";
import "./Todolist.css";
import bg from "./bg.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  ADD_TASK_API,
  GET_TASK_LIST_API,
} from "../../redux/constants/TodoListConstant";
export default function TodoListSaga() {
  const [state, setState] = useState({
    taskName: "",
    errors: "",
  });
  useEffect(() => {
    getTaskList();
  }, []);
  const { taskList } = useSelector((state) => state.TodoListReducer);
  const onChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const renderUncomplated = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                onClick={() => deleteTask(item.taskName)}
              >
                <i className="fa fa-trash-alt"></i>
              </button>
              <button
                className="complete"
                onClick={() => checkTask(item.taskName)}
              >
                <i className="far fa-check-circle"></i>
                <i className="fas fa-check-circle"></i>
              </button>
            </div>
          </li>
        );
      });
  };
  const renderComplete = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                onClick={() => deleteTask(item.taskName)}
              >
                <i className="fa fa-trash-alt"></i>
              </button>
              <button
                className="complete"
                onClick={() => rejectTask(item.taskName)}
              >
                <i className="far fa-undo"></i>
                <i className="fas fa-undo"></i>
              </button>
            </div>
          </li>
        );
      });
  };
  const getTaskList = () => {
    dispatch({
      type: GET_TASK_LIST_API,
    });
  };
  const addTask = () => { 
    dispatch({ type: ADD_TASK_API, payload: state.taskName });
  };
  const deleteTask = (taskName) => {};
  const rejectTask = (taskName) => {};
  const checkTask = (taskName) => {};
  const dispatch = useDispatch();
  return (
    <div className="card">
      <div className="card__header">
        <img src={bg} />
      </div>
      {/* <h2>hello!</h2> */}
      <div className="card__body">
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div className="card__add">
            <input
              id="newTask"
              name="taskName"
              onChange={onChange}
              type="text"
              placeholder="Enter an activity..."
            />
            <button id="addItem" onClick={() => addTask()}>
              <i className="fa fa-plus" />
            </button>
          </div>
          <div
            id="notiInput"
            className="alert-danger"
            style={{ display: "none" }}
          />
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderUncomplated()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderComplete()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
