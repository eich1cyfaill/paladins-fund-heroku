import React from 'react';
import cl from '../styles/Header.module.css'
import {Link} from "react-router-dom";


const Header: React.FC = () => {
    return (
        <div className={cl.header}>


            <div className={cl.header__title_wrapper}>
                <Link to="players"><div className={cl.header_title}>Paladins Players Fund</div></Link>
            </div>



            <div className={cl.header__menu}>
                <div className={cl.header_itemlist}>
                    <Link to="players"><div className={cl.header_itemlist__item}>Player Search</div></Link>
                    {/*<Link to="champions"><div className={cl.header_itemlist__item}>Champions</div></Link>*/}
                    <Link to="ranking"><div className={cl.header_itemlist__item}>Ranking</div></Link>
                    {/*<Link to="settings"><div className={cl.header_itemlist__item}>Settings</div></Link>*/}
                </div>
            </div>

        </div>
    );
};

export default Header;