import React, { useEffect, useState } from "react";
import data from "./data.json";
import closeButton from "./assets/images/icon-remove-item.svg";
import treeIcon from "./assets/images/icon-carbon-neutral.svg";

interface Props {
  cartList: number[];
  cartItemPrices: number[];
  removeProduct: (
    cartItemPrices: number[],
    cartList: number[],
    index: number
  ) => void;
  setcartList: React.Dispatch<React.SetStateAction<number[]>>;
  setcartItemPrices: React.Dispatch<React.SetStateAction<number[]>>;
  TotalPrice: number;
}

const orders: React.FC<Props> = ({
  cartList,
  cartItemPrices,
  removeProduct,
  setcartItemPrices,
  setcartList,
  TotalPrice,
}) => {
  return (
    <div>
      <div>
        {cartList.length > 0 && (
          <div>
            {data.map((datum, productIndex) => {
              if (cartList.includes(productIndex)) {
                return (
                  <div
                    className=" pt-4 flex items-center justify-between border-b pb-3 border-gray-300"
                    key={productIndex}
                  >
                    <div>
                      <p className=" font-RedHat-B">{datum.name}</p>
                      <p>
                        <span className=" text-SCred">
                          {cartItemPrices[cartList.indexOf(productIndex)]}x
                        </span>{" "}
                        <span>@{datum.price}</span>{" "}
                        <span>
                          $
                          {(
                            parseFloat(datum.price) *
                            cartItemPrices[cartList.indexOf(productIndex)]
                          ).toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <img
                      src={closeButton}
                      alt="closeButton"
                      id="closeButton"
                      style={{ color: "black" }}
                      className="p-1 border border-black rounded-full"
                      onClick={() => {
                        console.log(cartList.indexOf(productIndex));
                        const updatingcartItemPrices = [...cartItemPrices];
                        let updatedCartList: number[] = [...cartList];
                        //You want to get the item to be removed and their index and pass it to remove product
                        removeProduct(
                          updatingcartItemPrices,
                          updatedCartList,
                          productIndex
                        );
                        setcartItemPrices(updatingcartItemPrices);
                        setcartList(updatedCartList);
                      }}
                    />
                  </div>
                );
              }
            })}
            <div className="flex flex-col pt-6 ">
              <div className=" flex justify-between items-center">
                <p className=" font-RedHat-SB text-gray-600">Order Total</p>
                <p className=" font-RedHat-B text-xl">${TotalPrice}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default orders;
