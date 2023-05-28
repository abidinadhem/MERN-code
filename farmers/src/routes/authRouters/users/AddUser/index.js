/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Form from "../form";
import { usersActions } from "../slice";
import { selectloadingAddUser } from "../slice/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const dispatch = useDispatch();
  const loading = useSelector(selectloadingAddUser);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: "",
    age: "",
  });

  useEffect(()=>{
    if(loading === 'done') {
      navigate('/user')
    }else if(loading === 'error') {
      console.log('error')
    }
  },[loading])

  const handleSubmit = (values) => {
    dispatch(usersActions.loadingAddUser(values))
  };

  return (
    <div>
      <p>Add User</p>
      <Form add user={user} handleSubmit={handleSubmit} />
    </div>
  );
}

export default AddUser;
