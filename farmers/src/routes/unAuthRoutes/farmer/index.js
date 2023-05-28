import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUsers, selectproducts } from "../Home/slice/selectors";
import { ordersActions } from "../Home/slice";
import './index.css'

const FarmerDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectproducts);
  const users = useSelector(selectUsers);
    console.log(products)
  useEffect(() => {
    dispatch(ordersActions.users());
    dispatch(ordersActions.products());
  }, []);
  // fetch the farmer data based on the farmerId parameter
  const farmerData = {
    id: 1,
    name: "John Smith",
    image: "https://via.placeholder.com/150",
  }; // fetch data logic here

  return (
    <div className="farmer-detail-page">
      <div className="farmer-header">
        <img src={farmerData.image} alt={farmerData.name} />
        <h1>{farmerData.name}</h1>
      </div>
      <div className="farmer-info">
        <p>{farmerData.description}</p>
        <h2>Products</h2>
        <ul>
          {products.filter(key=>key.user._id === id).map((product) => (
            <li key={product._id}>
              <img src={product.image} alt={product.name} />
              <div>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FarmerDetailPage;
