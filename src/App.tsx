import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Product from "./product";
import data from "./data.json";
import Cart from "./cart";
import OrderConfirmation from "./orderConfirmation";

function App() {
  const [cartList, setcartList] = useState<number[]>([]);
  const [cartItemPrices, setcartItemPrices] = useState<number[]>([]);
  /* const cartList: number[] = []; */

  function addToCart(index: number) {
    focusChnages(index);
    setcartList([...cartList, index]); //Just working with the indexes
    setcartItemPrices([...cartItemPrices, 1]);
    document.querySelector(".emptyCart")?.classList.add("hidden");
  }

  function focusChnages(index: number) {
    const allAddToCart = document.querySelectorAll("#AddToCart");
    const allQuantityCounter = document.querySelectorAll("#quantityCounter"); //?
    const allProductImages = document.querySelectorAll(".productImage");
    allProductImages[index]
      .querySelectorAll(".productShow")
      .forEach((productShow) => {
        productShow.classList.toggle("border-2");
        productShow.classList.toggle("border-SCred");
      });
    console.log(allProductImages);
    allAddToCart[index]?.classList.toggle("hidden");
    allAddToCart[index]?.classList.toggle("flex");
    allQuantityCounter[index]?.classList.toggle("hidden");
    allQuantityCounter[index]?.classList.toggle("flex");
  }

  function increaseQuantity(index: number) {
    const updatingcartItemPrices = [...cartItemPrices];
    updatingcartItemPrices[cartList.indexOf(index)] += 1;
    setcartItemPrices(updatingcartItemPrices);
  }
  function decreaseQuantity(index: number) {
    const updatingcartItemPrices = [...cartItemPrices];
    let updatedCartList: number[] = [...cartList];

    updatingcartItemPrices[cartList.indexOf(index)] -= 1;
    console.log(updatingcartItemPrices[cartList.indexOf(index)]);
    //item removal function
    if (updatingcartItemPrices[cartList.indexOf(index)] === 0) {
      removeProduct(updatingcartItemPrices, updatedCartList, index);
    }
    setcartItemPrices(updatingcartItemPrices);
    setcartList(updatedCartList);
  }

  const [TotalPrice, setTotalPrice] = useState<string>("");
  useEffect(() => {
    if (cartList.length > 0) {
      getTotalPrice();
      console.log(TotalPrice);
    }
  }, [cartItemPrices]);

  function getTotalPrice() {
    let datumPricesArray: number[] = [];

    data.map((datum, productIndex) => {
      if (cartList.includes(productIndex)) {
        let eachDatumPrice =
          parseFloat(datum.price) *
          cartItemPrices[cartList.indexOf(productIndex)];
        datumPricesArray.push(eachDatumPrice);
      }
    });
    let Total = datumPricesArray.reduce((prev, next) => {
      return prev + next;
    });
    setTotalPrice(Total.toFixed(2));
  }

  function removeProduct(
    cartItemPrices: number[],
    cartList: number[],
    index: number
  ) {
    let updatingcartItemPrices = cartItemPrices.splice(
      cartItemPrices.indexOf(cartList.indexOf(index)),
      1
    ); //From the index of the productindex in cartList-- getting same index in cartprice
    let updatedCartList = cartList.splice(cartList.indexOf(index), 1);
    focusChnages(index);
    setcartItemPrices(updatingcartItemPrices);
    setcartList(updatedCartList);

    console.log(index); //The issue is cartlist index is different from the product index on the page
  }

  return (
    <BrowserRouter>
      <div className="App lg:relative px-6 lg:px-16 pt-6 pb-6 md:p-8 lg:flex gap-4">
        <div>
          <h1 className=" font-RedHat-B text-4xl mb-5">Dessert</h1>
          <div className="products md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 ">
            {data.map((datum, index) => (
              <div
                key={index}
                className="animate__animated animate__slideInUp "
              >
                <Product
                  imageMobile={datum.image.mobile}
                  imageTab={datum.image.tablet}
                  imageDesktop={datum.image.desktop}
                  productCategory={datum.category}
                  productName={datum.name}
                  productPrice={datum.price}
                  increaseQuantity={() => {
                    increaseQuantity(data.indexOf(datum));
                  }}
                  decreaseQuantity={() => {
                    decreaseQuantity(data.indexOf(datum));
                  }}
                  addToCart={() => {
                    data.indexOf(datum);
                    console.log("added", data.indexOf(datum));
                    addToCart(data.indexOf(datum));
                  }}
                  cartItemPrices={cartItemPrices}
                  cartList={cartList}
                  productIndex={index}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="cart">
          <Cart
            setcartItemPrices={setcartItemPrices}
            setcartList={setcartList}
            cartList={cartList}
            cartItemPrices={cartItemPrices}
            removeProduct={removeProduct}
            TotalPrice={TotalPrice}
          />
        </div>
      </div>
      <Routes>
        <Route
          path="/productwithcart/OrderConfirmation"
          element={
            <OrderConfirmation
              cartList={cartList}
              cartItemPrices={cartItemPrices}
              TotalPrice={TotalPrice}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//If it is updateable best to set it as a state
