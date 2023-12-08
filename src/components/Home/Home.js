import { Hero } from "./Hero";
import { NewItems } from "./NewItems/NewItems";
import { Categories } from "./Categories/Categories";
import { DiscountedItems } from "./DiscountedItems/DiscountedItems";
import { Guarantee } from "./Guarantee/Guarantee";

export const Home = () => {

    return (
        <>
            <Hero />
            <main>
                <Categories />
                <NewItems />
                <DiscountedItems />
                <Guarantee />
            </main>
        </>
    );
}