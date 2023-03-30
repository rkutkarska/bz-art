import { useState } from "react";
import React from 'react';

export const ItemCounter = (props) => {
    const [count, setCount] = useState(props.start || 0);

    function increaseHandler() {
        setCount(oldCount => oldCount + 1);
    }

    const decreaseHandler = () => {
        if (count > 1) {
            setCount(oldCount => oldCount - 1);
        }
    };

    const changeHandler = (e) => {
        setCount(Number(e.target.value));
    }

    return (
        <div>
            <h1>Counter</h1>
            <button onClick={decreaseHandler}>-</button>
            <input type="text" value={count} onChange={changeHandler} />
            <button onClick={increaseHandler}>+</button>
        </div>
    );
 }