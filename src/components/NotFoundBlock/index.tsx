import React, {FC} from 'react';
import styles from "./NotFoundBlock.module.scss"
import {Link} from "react-router-dom";

const NotFoundBlock:FC = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>
                <span className={styles.emoji}>😬</span>
                <br />
                SPIERDALAJ KURWA(404)
            </h1>
            <p className={styles.description}>
                Можливо, ви перейшли за неправильною адресою або сторінка була видалена.
            </p>
            <Link to='/' className={styles.button}>
                Повернутися на головну
            </Link>
        </div>
    );
};

export default NotFoundBlock;
