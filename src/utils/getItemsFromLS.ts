import {calcTotalPrice} from "../utils/calcTotalPrice";

export const getItemsFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(items)

        return {
            items,
            totalPrice
        }
}
