import React, { Component } from "react";
import "./Todolist.css";
import bg from "./bg.png";
import axios from "axios";

export default class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      taskName: "",
      errors:'',
    };
  }
  getTaskList = () => {
    axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    })
      .then((res) => {
        this.setState({ taskList: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  renderUncomplated = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove" onClick = {()=>this.deleteTask(item.taskName)}>
                <i className="fa fa-trash-alt"></i>
              </button>
              <button className="complete" onClick = {()=>this.checkTask(item.taskName)}>
                <i className="far fa-check-circle"></i>
                <i className="fas fa-check-circle"></i>
              </button>
            </div>
          </li>
        );
      });
  };
  renderComplete = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove" onClick = {()=>this.deleteTask(item.taskName)}>
                <i className="fa fa-trash-alt"></i>
              </button>
              <button className="complete" onClick = {()=>this.rejectTask(item.taskName)}>
                <i className="far fa-undo"></i>
                <i className="fas fa-undo"></i>
              </button>
            </div>
          </li>
        );
      });
  };
  addTask = () => {
    console.log(this.state.taskName);
    axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data:{taskName:this.state.taskName}
    }).then((res)=>{
      this.getTaskList();
    }).catch((err)=>{

    })
  };
  deleteTask = (taskName)=>{
    console.log(taskName);
    // return;
    axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}` ,
      method: "DELETE", 
    }).then((res)=>{
      this.getTaskList();
    }).catch((err)=>{

    })
  }
  rejectTask = (taskName)=>{
    console.log(taskName);
    // return;
    axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}` ,
      method: "PUT",  
    }).then((res)=>{
      this.getTaskList();
    }).catch((err)=>{

    })
  }
  checkTask = (taskName)=>{
    console.log(taskName);
    // return;
    axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}` ,
      method: "PUT", 
    }).then((res)=>{
      this.getTaskList();
    }).catch((err)=>{

    })
  }
  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({ ...this.state, [name]: value });
  };
  render() {
    return (
      <div>
        {/* <button onClick={() => this.getTaskList()}>Get List</button> */}
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
                  name="taskName"
                  onChange={this.onChange}
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                />
                <p className = "text text-danger">{this.state.errors}</p>
                <button id="addItem" onClick={() => this.addTask()}>
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
                  {this.renderUncomplated()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderComplete()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
   this.getTaskList();
  }
}
