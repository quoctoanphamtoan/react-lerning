import React from 'react'
import { Redirect } from 'react-router-dom'

export default function Profile(props) {
    // const 
    if(localStorage.getItem("user")){
        return (
            <div>
                profile
            </div>
        )

    }else{
         return <Redirect to = "/login"/>
    }
}
