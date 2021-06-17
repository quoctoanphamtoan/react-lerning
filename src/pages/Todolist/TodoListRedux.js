import React, { useEffect, useState } from "react";
import "./Todolist.css";
import bg from "./bg.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTaskApi, checkTaskApi, deleteTaskApi, getTaskListApi, rejectTaskApi } from "../../redux/actions/TodolistAction";
export default function TodoListRedux() {
  const { taskList } = useSelector((state) => state.TodoListReducer);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    taskName: "",
    errors: "",
  });

  useEffect(() => {
    getTaskList();
  }, []);
  const getTaskList = () => {
    dispatch(getTaskListApi());
  };
  console.log(state);
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
  const addTask = () => {
    console.log(state.taskName);
   dispatch(addTaskApi(state.taskName))
  };
  const deleteTask = (taskName) => {
    console.log(taskName);
    // return;
    dispatch(deleteTaskApi( taskName))
  };
  const rejectTask = (taskName) => {
    console.log(taskName);
    // return;
   dispatch(rejectTaskApi( taskName))
  };
  const checkTask = (taskName) => {
    console.log(taskName);
    // return;
  dispatch(checkTaskApi( taskName))
  };
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
