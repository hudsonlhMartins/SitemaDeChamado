import React, {Fragment, useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

import { FiHome, FiMenu, FiUser, FiSettings } from "react-icons/fi";
import avatar_default from '../../assets/avatar.png'
import './header.css'
export default function Header(){

    const {user} = useContext(UserContext)

    const handleMenu = (e)=>{
        const header = document.querySelector('.header')
        if(header.classList.contains('header-mobile-active')){
            header.classList.remove('header-mobile-active')
        }else{
            header.classList.add('header-mobile-active')
        }
    }

    return(
        <Fragment>
            <header className='btn_menu'>
                <FiMenu onClick={handleMenu} color='#000' size={30} />
            </header>

            <div className='header'>
                
            <div className='cover_img' >
                <img  src={ user.avatarUrl === null ? avatar_default : user.avatarUrl} alt='Foto do usuario' />
            </div>
            <div className='naveBar'>
                <Link className='chamados' to='/dashboard'>
                    <FiHome  color='#fff' size={24} />
                    Chamados
                </Link>
                <Link className='cliente' to='/customers'>
                    <FiUser  color='#fff' size={24} />
                    Clientes
                </Link>
                <Link className='setting' to='/profile'>
                    <FiSettings  color='#fff' size={24} />
                    Configuração
                </Link>
            </div>
        </div>

        </Fragment>
        
    )
}