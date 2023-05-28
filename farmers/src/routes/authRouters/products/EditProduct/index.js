/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { productsActions } from "../slice";
import { selectLoadinggetproduct,selectgetproduct,selectloadingEditproduct } from "../slice/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import Form from "../form";
import { useParams } from 'react-router-dom';

function EditProduct() {
  const dispatch = useDispatch();
  const loadingEdit = useSelector(selectloadingEditproduct);
  const product = useSelector(selectgetproduct);
  const loadingGetproduct = useSelector(selectLoadinggetproduct);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{
    if(loadingEdit === 'done') {
      navigate('/products')
    }else if(loadingEdit === 'error') {
      console.log('error')
    }
  },[loadingEdit])

  const getData = () => {
    dispatch(productsActions.setEditproduct(id))
  }

  useEffect(()=>{
    getData()
  },[])

  if(loadingGetproduct === 'loading' || loadingGetproduct === 'idle') {
    return <Spin />
  }

  const handleSubmit = (values) => {
    dispatch(productsActions.loadingEditproduct({...values,_id:id}))
  };

  return (
    <div>
    <p>Edit product</p>
    <Form product={product} handleSubmit={handleSubmit} />
  </div>
  )
}

export default EditProduct