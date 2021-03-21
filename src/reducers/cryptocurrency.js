const initialState = {
  items: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEMS_FETCH_SUCCEEDED':
      return {
        ...state,
        items: action.items,
      }
    default:
      return state
  }
}

export default reducer
