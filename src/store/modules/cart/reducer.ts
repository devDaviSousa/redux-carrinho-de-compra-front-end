import produce from "immer";
import { Reducer } from "redux";
import { ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_PRODUCT_TO_CART_SUCCESS": {
        const { product } = action.payload;

        const productInCarIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCarIndex >= 0) {
          draft.items[productInCarIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }
      case "ADD_PRODUCT_TO_CART_FAILURE": {
        console.log(`failure`, action.payload);
        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default cart;

//   return {
//     ...state,
//     items: [
//       ...state.items,
//       {
//         product,
//         quantity: 1
//       }
//     ]
//   }
