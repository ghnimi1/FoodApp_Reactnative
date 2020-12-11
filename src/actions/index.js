export const AddToCart = (item) => {
    return {
        type: 'ADD_TO_CART',
        payload: item
    }
}
export const totalCart = () => {
    return {
        type: 'TOTAL_PRICE',
    }
}

export const remove = (id) => {
    return {
        type: 'REMOVE',
        payload: id,
    }
}

export const AddToFavorite = (item) => {
    return {
        type: 'ADD_TO_FAVORITE',
        payload: item,
    }
}

export const removeFav = (id) => {
    return {
        type: 'REMOVE_FAV',
        payload: id,
    }
}
export const changeTheme = (currentTheme) => {
    return {
        type: 'change_theme',
        payload: !currentTheme
    }
}