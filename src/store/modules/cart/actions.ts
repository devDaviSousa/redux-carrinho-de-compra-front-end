import { IProduct } from "./types";

export function addProductToCarRequest(product: IProduct) {
  return {
    type: "ADD_PRODUCT_TO_CART_REQUEST",
    payload: {
      product,
    },
  };
}

export function addProductToCarSuccess(product: IProduct) {
  return {
    type: "ADD_PRODUCT_TO_CART_SUCCESS",
    payload: {
      product,
    },
  };
}

export function addProductToCarFailure(productId: number) {
  return {
    type: "ADD_PRODUCT_TO_CART_FAILURE",
    payload: {
      productId,
    },
  };
}
