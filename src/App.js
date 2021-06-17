import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Home/Header/Header";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import Todolist from "./pages/Todolist/Todolist";
import TodoListRedux from "./pages/Todolist/TodoListRedux";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import TodoListSaga from "./pages/TodoListSaga/TodoListSaga";
import LoadingComponent from './components/GlobalSetting/LoadingComponent';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <LoadingComponent/>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/todolistrcc" component={Todolist} />
        <Route exact path="/todolistrfc" component={TodolistRFC} />
        <Route exact path="/todolistrd" component={TodoListRedux} />
        <Route exact path="/todolistsg" component={TodoListSaga} />
        <Route exact path="/" component={Home} />
        <Route   path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
