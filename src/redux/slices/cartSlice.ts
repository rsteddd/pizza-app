import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "redux/store";
import {getItemsFromLS} from "../../utils/getItemsFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";


// Імпортуємо функцію createSlice з Redux Toolkit для створення слайсу (slice).


 export type CartItem = {
    id: number,
    title: string,
    imageUrl: string,
    price: number,
    size: number,
    type: string,
    count:number
}

interface CartSliceState{
    totalPrice:number;
    items: CartItem[]
}
const {items , totalPrice} = getItemsFromLS()

const initialState:CartSliceState = {
    items,
    totalPrice
};

const cartSlice = createSlice({
    name: "cart",       // Назва слайсу. Це буде використано для ідентифікації даного фрагмента стану в Redux Store.
    initialState,       // Початковий стан слайсу (items і totalPrice), визначений вище.
    reducers: {         // Тут оголошуємо "редюсери" — функції, що змінюють стан.
        addItem(state, action:PayloadAction<CartItem>) {
            const findItems = state.items.find((obj) => obj.id === action.payload.id);
            if (findItems) {
                findItems.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action:PayloadAction<number>) {
            const findItems = state.items.find((obj) => obj.id === action.payload);
            if (findItems) {
                findItems.count--;
            }
        },
        removeItem(state, action:PayloadAction<number>) {
            // Функція для видалення елементу з кошика.
            // Фільтруємо items, видаляючи елемент, якщо його id збігається з action.payload (id елемента для видалення).
            state.items = state.items.filter((obj) => obj.id !== action.payload);
        },
        clearItem(state) {
            // Функція для очищення кошика.
            // Просто встановлює масив items у порожній масив, тим самим видаляючи всі елементи.
            state.items = [];
            state.totalPrice = 0;
        }
    }
});
export const selectCart = (state:RootState) => state.cart
export const selectCartItemById = (id:number) => (state:RootState) => state.cart.items.find((obj) => obj.id === id)

// Експортуємо дії, які ми описали в редюсерах (addItem, removeItem, clearItem),
// щоб використовувати їх у компонентах або деінде в коді.
export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions;

// Експортуємо сам редюсер для додавання до Redux Store.
export default cartSlice.reducer;
