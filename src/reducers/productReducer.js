const initialState = {
  allProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ALL_PRODUCTS':
      return {
        ...state,
        allProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
