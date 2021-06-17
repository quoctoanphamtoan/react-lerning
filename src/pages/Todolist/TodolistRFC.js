import React, { useEffect, useState } from "react";
import "./Todolist.css";
import bg from "./bg.png";
import axios from "axios"; 
export default function TodolistRFC() { 
  const [state,setState] = useState({
    taskList: [],
    taskName: "",
    errors:'',
  })
  useEffect(() => {
    getTaskList();
  }, []);
const getTaskList = ()=>{
  axios({
    url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
    method: "GET",
  })
    .then((res) => {
      setState({taskList:res.data});
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
  console.log(state);
  const onChange = (e)=>{
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  }
   

  const renderUncomplated = () => {
    return state.taskList
    .filter((item) => !item.status)
    .map((item, index) => {
      return (
        <li key={index}>
          <span>{item.taskName}</span>
          <div className="buttons">
            <button className="remove" onClick = {()=>deleteTask(item.taskName)}>
              <i className="fa fa-trash-alt"></i>
            </button>
            <button className="complete" onClick = {()=>checkTask(item.taskName)}>
              <i className="far fa-check-circle"></i>
              <i className="fas fa-check-circle"></i>
            </button>
          </div>
        </li>
      );
    });
  };
  const renderComplete = () => {
    return state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove" onClick = {()=>deleteTask(item.taskName)}>
                <i className="fa fa-trash-alt"></i>
              </button>
              <button className="complete" onClick = {()=>rejectTask(item.taskName)}>
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
    axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data:{taskName:state.taskName}
    }).then((res)=>{
      getTaskList();
    }).catch((err)=>{

    })
  };
  const deleteTask = (taskName)=>{
    console.log(taskName);
    // return;
    axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}` ,
      method: "DELETE", 
    }).then((res)=>{
      getTaskList();
    }).catch((err)=>{

    })
  }
  const rejectTask = (taskName)=>{
    console.log(taskName);
    // return;
    axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}` ,
      method: "PUT",  
    }).then((res)=>{
      getTaskList();
    }).catch((err)=>{

    })
  }
  const checkTask = (taskName)=>{
    console.log(taskName);
    // return;
    axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}` ,
      method: "PUT", 
    }).then((res)=>{
      getTaskList();
    }).catch((err)=>{

    })
  }
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
              name = "taskName"
              onChange = {onChange}
              type="text"
              placeholder="Enter an activity..."
            />
            <button id="addItem" onClick = {()=>addTask()}>
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
            <ul className="todo" id="todo" >
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
