import {configureStore} from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizzas from "./slices/pizzasSlice";
import {useDispatch} from "react-redux";


export const store = configureStore({// Створюємо і експортуємо наш Redux store
    reducer: {// Тут ми визначаємо редюсери для нашого store
        filter,// Додаємо редюсер фільтра
        cart,
        pizzas
    }
})

export type RootState = ReturnType<typeof store.getState>
 type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
