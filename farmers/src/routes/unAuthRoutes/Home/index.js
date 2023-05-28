import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css"; // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectproducts, selectUsers, selectLoadingUsers } from "./slice/selectors";
import { ordersActions} from "./slice";

function WelcomePage() {
    const dispatch = useDispatch();
    const products = useSelector(selectproducts);
    const users = useSelector(selectUsers);

    useEffect(() => {
        dispatch(ordersActions.users())
        dispatch(ordersActions.products())
    },[])

  return (
    <>
      <div style={{ padding: 20, position: 'relative' }}>
        <section className="welcome-section">
          <h1>Welcome to Our Farmers and Consumers Website</h1>
          <p>
            Our mission is to connect local farmers with consumers in their
            communities. By supporting local agriculture, we aim to promote
            sustainable food systems and strengthen local economies.
          </p>
        </section>
        <section className="farmers-section">
          <h2>Our Farmers</h2>
          <ul>
            {users.filter(key=>key.roles === 'farmers').map((farmer) => (
              <li key={farmer._id}>
                <img src={'https://via.placeholder.com/150'} alt={farmer.firstName} />
                <Link to={`/farmers/${farmer._id}`}>{farmer.firstName + ' ' + farmer.lastName}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="farmers-section">
          <h2>Our Consumers</h2>
          <ul>
            {users.filter(key=>key.roles === 'Consumers').map((farmer) => (
              <li key={farmer._id}>
                <img src={'https://via.placeholder.com/150'} alt={farmer.firstName} />
                <Link to={`/farmers/${farmer._id}`}>{farmer.firstName + ' ' + farmer.lastName}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="products-section">
          <h2>Our Products</h2>
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                <img src={product.image} alt={product.title} />
                <div className="product-info">
                  <h2>{product.title}</h2>
                  <h3>{product.description}</h3>
                  <p>{product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default WelcomePage;
