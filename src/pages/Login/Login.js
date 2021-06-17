import React, { useState } from 'react'
import {Prompt} from 'react-router-dom'
export default function Login(props) {
    const [userLogin, setUserLogin] = useState({
        user:'',
        password:'',
        status:true,
    })
    const onChange = (e)=>{
        const {name,value} = e.target;
        
        setUserLogin({...userLogin,[name]:value},console.log(userLogin));
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(userLogin);
        if(userLogin.user ==='user'&&userLogin.password ==='user'){
            props.history.push("/");
            localStorage.setItem("user",JSON.stringify(userLogin));

        }
    }
    return (
        <form className ="container" onSubmit = {onSubmit}>
            <h3 className ="display-4">Login</h3>
            <div className= "form-group">
                <p>User</p>
                <input name = "user" className="form-control" onChange= {onChange} />
            </div>
            <div className= "form-group">
                <p>Password</p>
                <input name = "password" className="form-control" onChange= {onChange} />
            </div>
            <button className ="btn btn-success">Login</button>
            <Prompt when = {true} message ={(localtion)=>{
                console.log(localtion);
                return 'bạn  có chắc chắn rời khỏi trang này!';
            }} />
        </form>
    )
}
