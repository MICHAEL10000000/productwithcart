import React from "react";
import { NavLink } from "react-router-dom";
import tick from "./assets/images/icon-order-confirmed.svg";
/* import Orders from "./orders"; */
import data from "./data.json";

interface Props {
  cartList: number[];
  cartItemPrices: number[];
  TotalPrice: string;
}

const orderConfirmation: React.FC<Props> = ({
  cartList,
  cartItemPrices,
  TotalPrice,
}) => {
  return (
    <div className="flex items-center justify-center w-full max-h-screen">
      {" "}
      {/* flex min-h-screen */}
      <div
        className=" fixed top-0 min-h-screen w-full"
        style={{ backgroundColor: "rgb(17, 24, 39, 0.7)", zIndex: "1" }}
      ></div>
      <div className="special-class bg-white lg:absolute lg:top-1/2 lg:-translate-y-1/4 z-10 fixed  lg:rounded-xl w-full  px-6 pb-16 pt-9 rounded-t-xl ">
        <div>
          <img src={tick} alt="Order-confirm-icon" />
          <h1 className=" font-RedHat-B text-4xl mt-4 mb-2">
            Order <br /> Confirmed
          </h1>
          <p className=" text-SCRose500 font-RedHat-R">
            We hope you enjoy your food
          </p>
        </div>
        <div className="my-4 bg-SCRose100 py-4 px-4 rounded-lg">
          {" "}
          {/* Orders */}
          <div>
            {data.map((datum, productIndex) => {
              if (cartList.includes(productIndex)) {
                return (
                  <div
                    className=" pt-2 flex items-center justify-between border-b pb-4 border-gray-300"
                    key={productIndex}
                  >
                    <div className="flex items-center gap-4 ">
                      <img
                        src={datum.image.thumbnail}
                        alt="Product-Image"
                        width={"40px"}
                        className=" rounded-md"
                      />
                      <div>
                        <div className="overflow-hidden">
                          <p
                            style={{ width: "14ch" }}
                            className=" font-RedHat-B text-nowrap text-ellipsis"
                          >
                            {datum.name}
                          </p>
                        </div>
                        <p>
                          <span className=" text-SCred font-RedHat-B">
                            {cartItemPrices[cartList.indexOf(productIndex)]}x
                          </span>
                          &nbsp;&nbsp;
                          <span className=" text-SCRose400">
                            @{datum.price}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className=" font-RedHat-B">
                        $
                        {(
                          parseFloat(datum.price) *
                          cartItemPrices[cartList.indexOf(productIndex)]
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              } else if (cartList.length === 0) {
                return (
                  <div className=" font-RedHat-R">
                    {" "}
                    Please Start a New Order
                  </div>
                );
              }
            })}
            <div className="flex flex-col pt-6 ">
              <div className=" flex justify-between items-center">
                <p className=" font-RedHat-SB text-gray-600">Order Total</p>
                <p className=" font-RedHat-B text-xl">
                  ${TotalPrice ? TotalPrice : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className=" mt-4 bg-SCred text-white w-full py-3 rounded-full font-RedHat-SB">
          <NavLink
            /* onClick={() => {
              window.location.reload();
            }} */
            to="/productwithcart"
          >
            Start New Order
          </NavLink>
        </button>
      </div>
    </div>
  );
};
export default orderConfirmation;
