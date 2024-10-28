import React, {FC, memo} from 'react';


type CategoriesProps = {
    value: number;
    onChangeCategory: (i:number) => void
}
const categories = ['Всi', 'Мясні', 'для довбойобів(Веганська)', 'Гриль',]

const Categories: FC<CategoriesProps> = memo(({value, onChangeCategory}) => {
    // Оголошуємо компонент Categories, який приймає value (поточна категорія) та onChangeCategory (функція для зміни категорії) як пропси.
    return (
        <div className="categories">
            <ul>{categories.map((categoryName, i) => (
                <li
                    key={i}// Встановлюємо унікальний ключ для кожного елемента списку на основі індексу.
                    onClick={() => onChangeCategory(i)}// Додаємо обробник події onClick, який викликає onChangeCategory з індексом категорії.
                    className={value === i ? 'active' : ''}// Додаємо клас 'active', якщо поточне значення (value) відповідає індексу категорії.
                >
                    {categoryName}{/* Виводимо назву категорії. */}
                </li>))}</ul>
        </div>
    );
});

export default Categories;
