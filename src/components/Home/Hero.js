import { Link } from "react-router-dom";

export const Hero = () => {
    return (
        <div className="hero">
            <div className="hero__caption">
                <div className="caption__container">
                    <p className="caption__text">50% отстъпка на бижута с естествени камъни!</p>
                    <Link to="/current-promotion" className="button white same-size">Разгледай</Link>
                </div>
            </div>
            <img className="hero__image"src={require("../../img/index-banner.jpg")} alt="jewellery" />
        </div>
    );
}