import React from "react";
import plus from "./assets/images/icon-increment-quantity.svg";
import minus from "./assets/images/icon-decrement-quantity.svg";

interface Props {
  imageMobile: string;
  imageTab: string;
  imageDesktop: string;
  productCategory: string;
  productName: string;
  productPrice: string;
  addToCart: () => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  cartItemPrices: number[];
  cartList: number[];
  productIndex: number;
}

const product: React.FC<Props> = ({
  imageMobile,
  imageTab,
  imageDesktop,
  productCategory,
  productName,
  productPrice,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  cartItemPrices,
  cartList,
  productIndex,
}) => {
  return (
    <div className="relative productImage">
      <img
        src={imageMobile}
        alt="Product-image-mobile"
        className="rounded-lg md:hidden productShow  "
      />
      <img
        src={imageTab}
        alt="Product-image-tab"
        className="hidden rounded-lg md:inline lg:hidden productShow"
      />
      <img
        src={imageDesktop}
        alt="Product-image-desktop"
        className="hidden rounded-lg lg:inline productShow"
      />

      <div>
        <div className="bottom-1/4  md:bottom-20  left-1/2 -translate-x-1/2  w-1/2 lg:w-3/4  absolute ">
          <div
            onClick={addToCart}
            id="AddToCart"
            className="flex items-center justify-center border border-SCred gap-2 bg-white px-2 py-3 rounded-full"
          >
            <img src="./assets/images/icon-add-to-cart.svg" alt="Cart-Icon" />
            <p className="font-RedHat-B text-nowrap">Add to cart</p>
          </div>
          <div
            id="quantityCounter"
            className="bg-SCred hidden text-white items-center w-full justify-between px-4 rounded-full py-3"
          >
            <img
              src={plus}
              alt="plus"
              className="border border-white p-1 rounded-full"
              onClick={increaseQuantity}
            />
            <p id="currentquantity">
              {cartItemPrices[cartList.indexOf(productIndex)]}
            </p>
            <img
              src={minus}
              alt="minus"
              className="border border-white px-1 py-2 rounded-full"
              onClick={decreaseQuantity}
            />
          </div>
        </div>
      </div>

      <div className="pt-4 text-nowrap">
        <p className="font-RedHat-R" id="productCategory">
          {productCategory}
        </p>
        <p className="font-RedHat-B text-xl lg:text-base">{productName}</p>
        <p className="font-RedHat-SB text-lg" id="productPrice">
          ${productPrice}
        </p>
      </div>
    </div>
  );
};

export default product;
