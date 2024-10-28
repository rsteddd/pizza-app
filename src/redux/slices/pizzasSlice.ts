import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "redux/store";


type Pizza = {
    id: number,
    title: string,
    imageUrl: string,
    price: number,
    sizes: number[],
    types: number[],
    rating: number
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
interface PizzaSliceState {
    items: Pizza[];
    status: Status
}
const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
};

export type SearchPizzaParams = {
    category:string;
    sortBy:string;
    search:string
    currentPage:string
}
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>("pizzas/fetchPizzasStatus", async (params) => {
    const {
        category,
        sortBy,
        search,
        currentPage
    } = params;
    const res = await axios.get<{
        items: Pizza[]
    }>(`https://a11133a8d5c8f6c0.mokky.dev/items?page=${currentPage}&limit=4&${category}${sortBy}${search}`);
    return res.data.items
});


const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []

        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        })
    }
});

export const selectPizzaData = (state: RootState) => state.pizzas
// Експортуємо дії, які ми описали в редюсерах (addItem, removeItem, clearItem),
// щоб використовувати їх у компонентах або деінде в коді.
export const {setItems} = pizzasSlice.actions;

// Експортуємо сам редюсер для додавання до Redux Store.
export default pizzasSlice.reducer;
