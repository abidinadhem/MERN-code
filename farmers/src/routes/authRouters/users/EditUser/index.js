/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { usersActions } from "../slice";
import { selectLoadinggetUser,selectgetUser,selectloadingEditUser } from "../slice/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import Form from "../form";
import { useParams } from 'react-router-dom';

function EditUser() {
  const dispatch = useDispatch();
  const loadingEdit = useSelector(selectloadingEditUser);
  const user = useSelector(selectgetUser);
  const loadingGetUser = useSelector(selectLoadinggetUser);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{
    if(loadingEdit === 'done') {
      navigate('/user')
    }else if(loadingEdit === 'error') {
      console.log('error')
    }
  },[loadingEdit])

  const getData = () => {
    dispatch(usersActions.setEditUser(id))
  }

  useEffect(()=>{
    getData()
  },[])

  if(loadingGetUser === 'loading' || loadingGetUser === 'idle') {
    return <Spin />
  }

  const handleSubmit = (values) => {

    dispatch(usersActions.loadingEditUser({...values,_id:id}))
  };

  return (
    <div>
    <p>Edit User</p>
    <Form user={user} handleSubmit={handleSubmit} />
  </div>
  )
}

export default EditUser