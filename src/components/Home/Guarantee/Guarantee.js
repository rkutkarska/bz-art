import React from "react";
import './Guarantee.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export const Guarantee = () => {
    return (
        <article className="guarantee">
            <h1 className="caption">Ако ни се доверите ще получите:</h1>
            <section className="guarantee__article">
                <ul className="guarantee__list ul-clear">
                    <li>
                        <div className="blob">
                            <img className="blob__yellow" src={require("../../../img/blobs/first-blob.svg")} alt="yellow blob" />
                            <img className="blob__purple" src={require("../../../img/blobs/second-blob.svg")} alt="purple blob" />
                            <FontAwesomeIcon icon={solid('gem')} className="icon"></FontAwesomeIcon>
                        </div>
                        <p>100% ръчна изработка, получавате бутиково бижу.</p>
                    </li>
                    <li>
                        <div className="blob">
                            <img className="blob__yellow" src={require("../../../img/blobs/first-blob.svg")} alt="yellow blob" />
                            <img className="blob__purple" src={require("../../../img/blobs/second-blob.svg")} alt="purple blob" />
                            <FontAwesomeIcon icon={solid('thumbs-up')} className="icon"></FontAwesomeIcon>
                        </div>
                        <p>Качество без компромиси.</p>
                    </li>
                    <li>
                        <div className="blob">
                            <img className="blob__yellow" src={require("../../../img/blobs/first-blob.svg")} alt="yellow blob" />
                            <img className="blob__purple" src={require("../../../img/blobs/second-blob.svg")} alt="purple blob" />
                            <FontAwesomeIcon icon={solid('truck')} className="icon"></FontAwesomeIcon>
                        </div>
                        <p>Доставка в рамките на 24 часа от поръчката.</p>
                    </li>
                    <li>
                        <div className="blob">
                            <img className="blob__yellow" src={require("../../../img/blobs/first-blob.svg")} alt="yellow blob" />
                            <img className="blob__purple" src={require("../../../img/blobs/second-blob.svg")} alt="purple blob" />
                            <FontAwesomeIcon icon={solid('heart')} className="icon"></FontAwesomeIcon>
                        </div>
                        <p>Внимание в детайлите, защото обичаме работата си.</p>
                    </li>
                    <li>
                        <div className="blob">
                            <img className="blob__yellow" src={require("../../../img/blobs/first-blob.svg")} alt="yellow blob" />
                            <img className="blob__purple" src={require("../../../img/blobs/second-blob.svg")} alt="purple blob" />
                            <FontAwesomeIcon icon={solid('hand-holding-heart')} className="icon"></FontAwesomeIcon>
                        </div>
                        <p>Изработка изцяло по Ваш вкус.</p>
                    </li>
                </ul>
            </section>
        </article>
    );
}