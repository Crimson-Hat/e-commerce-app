import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Products } from "../../actions/productsActions";
import ErrorMessage from "../../helpers/ErrorMessage";
import Loading from "../../helpers/Loading";
import SideBar from "../Home/SideBar";
import classes from "../Home/home.module.css";
import { FcFlashAuto } from "react-icons/fc";
import Slider from "react-slick";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AddToCartAction, RemoveFromCart } from "../../actions/cartActions";


export function numberWithComas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const cartList = useSelector((state) => state.cartList);
  const { cart } = cartList;

  const { products, error, loading } = productList;

  console.log(products);
  useEffect(() => {
    dispatch(Products());
  }, [dispatch]);

  const settings = {
    dots: true,
    speed: 1000,
  };

  const handleAddToCart=(product)=>{
     dispatch(AddToCartAction(product));
  }

  const handleRemoveFromCart=(product)=>{
    dispatch(RemoveFromCart(product));
  }

  return (
    <>
      <div className={classes.home}>
        {error && (
          <ErrorMessage variant={error.info ? "info" : "danger"}>
            {error}
          </ErrorMessage>
        )}
        {loading && <Loading />}
        <SideBar />
        <div className={classes.productContainer}>
          <div className={classes.header}>
            <span>
              <FcFlashAuto
                style={{
                  fontSize: "35px",
                }}
              />{" "}
              Flash Sales
            </span>
            <span>
              Time Left:<strong>11h:50m:45s</strong>{" "}
            </span>
          </div>
          {products.map((product) => {
            return (
              <Slider {...settings} key={product._id}>
                <div className="product_wrapper">
                  <Link to={`/produt/${product._id}`}>
                    <div className="products_image">
                      <img
                        src={product.image}
                        height="120px"
                        alt={product.title}
                      />
                    </div>
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="product_info">
                      <span>{product.title}</span>
                    </div>
                    <div className="product_description">  
                      <span>
                        {product.description.substring(0, 30)}{" "}
                        {product.description.length >= 30 && `...`}
                      </span>
                    </div> 
                    <h5>Ksh. {numberWithComas(product.price)}</h5>
                  </div>
                  <div>
                    {cart.some((p) => p._id === product._id) ? (
                      <Button
                        style={{
                          fontWeight: "bolder",
                        }}
                        variant="danger"
                        onClick={() => handleRemoveFromCart(product)}
                      >
                        {" "}
                        REMOVE
                      </Button>
                    ) : (
                      <Button
                        style={{
                          fontWeight: "bolder",
                        }}
                        variant="warning"
                        disabled={!product.inStock}
                        onClick={()=>handleAddToCart(product)}
                      >
                        {!product.inStock ? "Out of Stock" : "ADD"}{" "}
                      </Button>
                    )}
                  </div>
                </div>
              </Slider>
            );
          })}
        </div>
      </div>
      <div className={classes.header2}>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Fast Delivery Within Nairobi
        </span>
      </div>
    </>
  );
};

export default Home;
