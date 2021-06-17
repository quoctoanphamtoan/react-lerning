import React from "react";
import style from "./LoadingComponent.module.css";
import loading from "./../../assets/img/loading.gif";
import { useSelector } from "react-redux";
export default function LoadingComponent() {

    const {isLoading} = useSelector(state => state.loadingReducer)


  return (
    <div className={style.bgLoading} style={{display:isLoading?'block':'none'}}>
      <img src={loading} />
    </div>
  );
}
