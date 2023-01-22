import { Book } from "./Book";
import React from 'react';

export const BookList = (props) => {
    return (
        <ul>
            {props.data.map(x => <Book {...x} />)}
        </ul>
    );
};