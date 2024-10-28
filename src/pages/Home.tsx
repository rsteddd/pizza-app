import React, {FC, useCallback, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import qs from "qs";
import Categories from "../components/Categories";
import SortPopup, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters
} from "../redux/slices/filterSlice";
import {useNavigate} from "react-router-dom";
import {
    fetchPizzas,
    SearchPizzaParams,
    selectPizzaData
} from "../redux/slices/pizzasSlice";
import PizzaBlock from "../components/PizzaBlock";
import {useAppDispatch} from "../redux/store";


const Home: FC = () => {
    const navigate = useNavigate();// Використовуємо useNavigate для зміни URL при навігації
    const dispatch = useAppDispatch();// Використовуємо useDispatch для відправки екшенів в Redux
    const isSearch = useRef(false);// Використовуємо useRef для створення змінної, яка не змінює своє значення між рендерами
    const isMounted = useRef(false);// Змінна для збереження стану першого рендеру компонента


    const {
        categoryId,
        sort,
        currentPage,
        searchValue
    } = useSelector(selectFilter);// Використовуємо useSelector для отримання даних з Redux: категорію, тип сортування та поточну сторінк
    const {items, status} = useSelector(selectPizzaData)

    const onChangeCategory = useCallback((id: number) => { // Зміна категорії, відправляємо екшен setCategoryId з новим id категорії
        dispatch(setCategoryId(id));
    }, [])

    const onChangePage = (page: number) => { // Зміна сторінки, відправляємо екшен setCurrentPage з новим номером сторінки
        dispatch(setCurrentPage(page));

    };


    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';// Якщо вибрана категорія більше нуля, додаємо її в URL для фільтрації
        const sortBy = `&sortBy=${sort.sortProperty}`;// Формуємо частину URL для сортування за певною властивістю
        const search = searchValue ? `&title=*${searchValue}*` : '';// Додаємо пошуковий запит у URL, якщо є введений пошуковий термін

        dispatch(
            fetchPizzas({
                category,
                sortBy,
                search,
                currentPage: String(currentPage)
            }));
    };


    useEffect(() => {
        if (!window.location.search) {
            getPizzas()
        }
    }, []);

    useEffect(() => {// Виконується один раз при першому рендері компонента
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;// Якщо в URL є рядок пошуку, розбираємо його в об'єкт за допомогою qs.parse
            const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

            dispatch(setFilters({
                searchValue: params.search,
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                sort: sort || sortList[0],
            }));
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {// Викликається при зміні категорії, сортування або сторінки
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });// Формуємо рядок запиту (query string) з поточних фільтрів і сторінки
            navigate(`/?${queryString}`);// Оновлюємо URL з новими параметрами фільтрів
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);

    useEffect(() => {// Викликається при зміні категорії, сортування, сторінки або пошукового запиту
        if (!isSearch.current) {
            getPizzas();

        }
        isSearch.current = false;
    }, [categoryId, sort.sortProperty, currentPage, searchValue]);

    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)// Відображаємо компонент PizzaBlock для кожної піци зі списку items
    const skeletons = [...new Array(5)].map((_, index) => <Skeleton
        key={index}/>) // Відображаємо Skeleton під час завантаження даних (5 штук)
    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId}
                                onChangeCategory={onChangeCategory}/>
                    <SortPopup/>
                </div>
                <h2 className="content__title">Всі піци</h2>

                {status === 'error' ? (
                    <div className="content__error-info">
                        <h2>Виникло недорозуміння всі піци зїв Влад 😕</h2>
                        <p>Не вдалось отримати піцки</p>
                    </div>
                ) : (
                    <div
                        className="content__items">{status === "loading" ? skeletons : pizzas}</div>
                )}


                <Pagination currentPage={currentPage}
                            onChangePage={onChangePage}/>
            </div>
        </>
    );
};

export default Home;


// .filter((obj) => {//пошук
//     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
//         return true
//     }
//     return false
// })
