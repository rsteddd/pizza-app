import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "redux/store";


export enum SortPropertyEnum {
    RATING =  "rating",
    TITLE = "title",
    PRICE = "price"
}
export type Sort = {
    name: string;
    sortProperty:SortPropertyEnum
}
export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort
}

const initialState: FilterSliceState = {// Визначаємо початковий стан нашого слайсу (slice).
    searchValue: "",
    categoryId: 0, // categoryId — це ID обраної категорії, за замовчуванням 0 (усі категорії).
    sort: {
        name: "популярності", // За замовчуванням ми сортуємо за популярністю.
        sortProperty: SortPropertyEnum.RATING
    },
    currentPage: 1// currentPage — це номер поточної сторінки, за замовчуванням 1.
};

const filterSlice = createSlice({// Створюємо слайс з нашими даними.
    name: "filters", // Назва слайсу — 'filters'.
    initialState, // Вказуємо початковий стан, який ми визначили вище.
    reducers: {// Тут описуємо функції (редюсери), які змінюють стан.
        setCategoryId(state, action:PayloadAction<number>) {// Функція для зміни категорії. Вона приймає дію (action) з новим ID категорії.
            state.categoryId = action.payload;// Оновлюємо categoryId на нове значення з payload (дані дії).
        },
        setSearchValue(state, action:PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action:PayloadAction<Sort>) {// Функція для зміни способу сортування. Вона приймає нові дані сортування.
            state.sort = action.payload;// Оновлюємо sort на нові дані з payload.
        },
        setCurrentPage(state, action:PayloadAction<number>) {// Функція для зміни поточної сторінки. Вона приймає номер нової сторінки.
            state.currentPage = action.payload;// Оновлюємо currentPage на нове значення з payload.
        },
        setFilters(state, action:PayloadAction<FilterSliceState>) {// Функція для зміни кількох фільтрів одночасно (категорії, сортування, сторінки).
            state.currentPage = Number(action.payload.currentPage);// Оновлюємо currentPage на нове значення з payload, перетворюючи його на число.
            state.sort = action.payload.sort;// Оновлюємо sort на нові дані з payload.
            state.categoryId = Number(action.payload.categoryId);// Оновлюємо categoryId на нове значення з payload, перетворюючи його на число.
        }
    }
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;
// Експортуємо дії (actions), які можна використовувати для зміни стану.
export const {
    setCategoryId,
    setSort,
    setCurrentPage,
    setFilters,
    setSearchValue
} = filterSlice.actions;

export default filterSlice.reducer;
// Експортуємо редюсер для використання в Redux Store.
