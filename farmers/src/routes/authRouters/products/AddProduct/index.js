/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Form from "../form";
import { productsActions } from "../slice";
import { selectloadingAddproduct,} from "../slice/selectors";
import { selectuser} from "../../../unAuthRoutes/login/slice/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const dispatch = useDispatch();
  const loading = useSelector(selectloadingAddproduct);
  const user = useSelector(selectuser);
  const navigate = useNavigate();

  const [product, setproduct] = useState({
    title: "",
    image: "",
    description: "",
    quantity : "",
    price: '',

  });

  useEffect(()=>{
    if(loading === 'done') {
      navigate('/products')
    }else if(loading === 'error') {
      console.log('error')
    }
  },[loading])

  const handleSubmit = (values) => {
     dispatch(productsActions.loadingAddproduct({...values,user: user._id}))
  };



  return (
    <div>
      <p>Add Prod</p>
      <Form add product={product} handleSubmit={handleSubmit} />
    </div>
  );
}

export default AddProduct;
