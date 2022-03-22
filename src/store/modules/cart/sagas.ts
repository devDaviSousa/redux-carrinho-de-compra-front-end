import { AxiosResponse } from "axios";
import { all, call, select, takeLatest, put } from "redux-saga/effects";
import { IState } from "../..";
import api from "../../../services/api";
import {
  addProductToCarFailure,
  addProductToCarRequest,
  addProductToCarSuccess,
} from "./actions";

interface IStokeResponse {
  id: number;
  quantity: number;
}

type CheckProductStockRequest = ReturnType<typeof addProductToCarRequest>;
function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;
  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  const availableStokeResponse: AxiosResponse<IStokeResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStokeResponse.data.quantity > currentQuantity) {
    yield put(addProductToCarSuccess(product));
  } else {
    yield put(addProductToCarFailure(product.id));
  }
}

export default all([
  takeLatest("ADD_PRODUCT_TO_CART_REQUEST", checkProductStock),
]);
