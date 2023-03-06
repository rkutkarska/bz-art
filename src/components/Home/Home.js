import React from "react";
import { Hero } from "./Hero";
import { NewItems } from "./NewItems/NewItems";
import { Categories } from "./Categories/Categories";
import { DiscountedItems } from "./DiscountedItems/DiscountedItems";

export const Home = () => {
    return (
        <>
            <Hero />
            <main>
                <Categories />
                <NewItems />
                <DiscountedItems />
            </main>
        </>
    );
}