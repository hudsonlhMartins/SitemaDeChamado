import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SingIn.css'
import logo from '../../assets/logo.png'

function SingIn() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] =useState('')

  const hancleSubmit = (e)=>{
    e.preventDefault()
    alert('clicou')
  }

    return (
      <section className='container_login' >
        
        <div className='container_login_itens'>
          <div className='div_logo'>
            <img src={logo} />
          </div>
          <form onSubmit={hancleSubmit} className='input_login'>
            <h2>Login</h2>
            <input className='input-login input_input ' placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className='input-login input_input ' placeholder='Senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)} required />
            <button type='submit' className='input-login btn ' >Acessar</button>
            <Link to='/register' className='btn_registar' >Criar conta</Link>
          </form>
          

        </div>
      </section>
    );
  }
  
  export default SingIn;
  