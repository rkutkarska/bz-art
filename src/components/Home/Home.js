import React from "react";
import { Hero } from "./Hero";
import { NewItems } from "./NewItems/NewItems";
import { Categories } from "./Categories/Categories";

export const Home = () => {
    return (
        <>
            <Hero />
            <main>
                <Categories />
                <NewItems />
            </main>
        </>
    );
}