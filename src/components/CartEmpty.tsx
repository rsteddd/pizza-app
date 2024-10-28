import React, {FC} from "react";

import cartEmpty from "../assets/img/empty-cart.png";
import {Link} from "react-router-dom";

const CartEmpty:FC = () => {
    return (
        <>
            <div className="cart cart--empty">
                <h2>Корзина пуста <span>😕</span></h2>
                <p>
                    Замов піцку йоууу.<br/>
                    Для того, щоб замовити пицку, перейди на головну сторінку.
                </p>
                <img src={cartEmpty} alt="Empty cart"/>
                <Link to="/" className="button button--black">
                    <span>Повернутись назад</span>
                </Link>
            </div>
        </>
    );
};

export default CartEmpty;
