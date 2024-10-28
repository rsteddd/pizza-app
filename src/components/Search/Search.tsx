import React, {ChangeEvent, FC, useCallback, useRef, useState} from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";


const Search:FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState<string>('') // Використовуємо хук useState для збереження значення введеного пошуку.
    const inputRef = useRef<HTMLInputElement>(null)// Використовуємо useRef для створення посилання на input елемент, щоб потім його фокусувати

    const onClickClear = () => { // Функція для очищення поля вводу.
        dispatch(setSearchValue(''))
        setValue('')      // Очищаємо локальне значення.
        inputRef.current?.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str:string) => {
            dispatch(setSearchValue(str))
        }, 500),
        // Оновлюємо значення пошуку в глобальному стані, після затримки у 500 мс.
        []
    )// Використовуємо useCallback для оптимізації функції оновлення значення пошуку, щоб вона не створювалася знову при кожному рендері.
    // debounce обмежує частоту викликів функції.

    const onChangeInput = (event:ChangeEvent<HTMLInputElement>) => { // Функція, що викликається при зміні значення в input.
        setValue(event.target.value)     // Оновлюємо локальне значення пошуку
        updateSearchValue(event.target.value)// Викликаємо функцію для оновлення значення пошуку в глобальному стані.
    }
    return (
        <div className={styles.root}>
            <input
                ref={inputRef}// Прив'язуємо input елемент до inputRef для доступу до DOM.
                value={value}// Призначаємо значення поля вводу з локального стану.
                onChange={onChangeInput}// Додаємо обробник події onChange, що викликає onChangeInput.
                className={styles.input}// Призначаємо клас для стилізації.
                placeholder="Пошук піц..."// Встановлюємо текст-підказку для input.
            />
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg"
                 height="512px"
                 id="Layer_1"
                 version="1.1"
                 viewBox="0 0 512 512"
                 width="512px"
            >
                <path
                    d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"/>
            </svg>
            {value && <svg
                onClick={onClickClear}
                className={styles.close}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48">
                <path
                    d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
                <path d="M0 0h48v48h-48z" fill="none"/>
                {/*// Якщо є значення в input, відображаємо іконку закриття, яка очищує поле вводу.*/}
            </svg>}
        </div>

    );
};

export default Search;
