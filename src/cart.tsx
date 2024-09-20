import React, { useEffect, useState } from "react";
import Orders from "./orders";
import { Link, NavLink } from "react-router-dom";
import treeIcon from "./assets/images/icon-carbon-neutral.svg";

interface HeadProps {
  cartList: number[];
  cartItemPrices: number[];
  removeProduct: (
    cartItemPrices: number[],
    cartList: number[],
    index: number
  ) => void;
  setcartList: React.Dispatch<React.SetStateAction<number[]>>;
  setcartItemPrices: React.Dispatch<React.SetStateAction<number[]>>;
  TotalPrice: string;
}

const cart: React.FC<HeadProps> = ({
  cartList,
  cartItemPrices,
  removeProduct,
  setcartList,
  setcartItemPrices,
  TotalPrice,
}) => {
  const [TotalOrderQuantity, setTotalOrderQuantity] = useState<number>(0);
  useEffect(() => {
    if (cartItemPrices.length > 0) {
      setTotalOrderQuantity(
        cartItemPrices.reduce((prev, next) => {
          return prev + next;
        })
      );
      //reduce method reduce the element of an array into a single value
    } else {
      setTotalOrderQuantity(0);
    }
  }, [cartItemPrices]);

  function fixMainPage() {
    if (window.innerWidth < 1024) {
      const mainPage = document.querySelector(".main-page");
      mainPage?.classList.add("fixed");
      mainPage?.classList.add("top-0");
    }
  }

  return (
    <div className="py-4 bg-white px-6 mt-8 rounded-lg animate__animated animate__slideInLeft ">
      <h1 className="text-2xl font-RedHat-B text-SCred">
        Your Cart ({TotalOrderQuantity})
      </h1>
      <div className="special-width">
        {cartList.length > 0 && (
          <div>
            <Orders
              cartList={cartList}
              cartItemPrices={cartItemPrices}
              removeProduct={removeProduct}
              setcartItemPrices={setcartItemPrices}
              setcartList={setcartList}
              TotalPrice={parseInt(TotalPrice)}
            />
            <div>
              <div className="flex bg-SCRose100 py-3 rounded-lg my-4 gap-1 items-center justify-center">
                <img src={treeIcon} alt="Carbon-Icon" />
                <p className=" font-RedHat-R text-nowrap text-sm">
                  This is a{" "}
                  <span className="font-RedHat-B">carbon-neutral</span> delivery
                </p>
              </div>
              <button className="flex justify-center bg-SCred text-white w-full py-2 rounded-full ">
                <NavLink
                  className={"block"}
                  onClick={fixMainPage}
                  to="/productwithcart/OrderConfirmation"
                >
                  Confirm Order
                </NavLink>
              </button>
            </div>
          </div>
        )}
      </div>
      {cartList.length === 0 && (
        <div className=" emptyCart flex flex-col items-center pt-16">
          <img
            src="./assets/images/illustration-empty-cart.svg"
            alt="empty-cart-illustration"
            style={{ width: "100px" }}
            className="pb-4"
          />
          <p className="font-RedHat-B text-nowrap text-SCred">
            Your added items will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default cart;
