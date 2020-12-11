import { data } from "../data/data"

const initialState = {
    data: data,
    cart: [],
    favorite: [],
    total: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const indexcart = state.cart.findIndex(item => item.id === action.payload.id)
            if (indexcart !== -1)
                return {
                    ...state,
                    //cart: state.cart.filter((item, index) => index !== indexcart)
                }
            else return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        }
        case 'REMOVE': {
            return {
                ...state,
                cart: [...state.cart.filter(item => item.id !== action.payload)]
            }
        }
        /*  case 'TOTAL_PRICE': {
             return {
                 ...state,
                 total: state.cart.map(item => state.total + item.price)
             }
         } */
        case 'ADD_TO_FAVORITE': {
            const indexFavorite = state.favorite.findIndex(item => item.id === action.payload.id)
            if (indexFavorite !== -1)
                return {
                    ...state,
                    //cart: state.cart.filter((item, index) => index !== indexcart)
                }
            else return {
                ...state,
                favorite: [...state.favorite, action.payload],
            }
        }
        case 'REMOVE_FAV': {
            return {
                ...state,
                favorite: [...state.favorite.filter(item => item.id !== action.payload)],
            }
        }
        default:
            return state
    }
}
export default reducer