import React, {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import styles from "./FullPizza.module.scss"

const FullPizza:FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl:string,
        title:string,
        desc:string,
        rating:number
    }>();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const res = await axios.get("https://a11133a8d5c8f6c0.mokky.dev/items/" + id);
                setPizza(res.data)
            } catch (error) {
                alert("oops")
                navigate('/')
            }
        }
        fetchPizza()
    }, [id, navigate]);

    if (!pizza) {
        return "Завантаження...";
    }

    return (
        <div className={styles.container}>
            <img className={styles.pizzaImage} src={pizza.imageUrl} alt={pizza.title} />
            <div className={styles.pizzaInfo}>
                <h2>{pizza.title}</h2>
                <p>{pizza.desc}</p>
                <span>Rating: {pizza.rating} ★</span>
            </div>
        </div>
    );
};

export default FullPizza;
