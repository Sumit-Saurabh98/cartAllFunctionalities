export const productReducer = (state, action) => {
  switch (action.type) {
    case "product":
      return { ...state, products: action.payload };

    case "cart":
      return {
        ...state,
        cart: [{ ...action.payload, quantity: 1 }, ...state.cart],
      };

    case "quantityChange":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.quantity = action.payload.quantity) : c.quantity
        ),
      };

      case "remove" :
        return { ...state, cart: state.cart.filter((c) =>c.id !== action.payload)}

    default:
      return state;
  }
};
