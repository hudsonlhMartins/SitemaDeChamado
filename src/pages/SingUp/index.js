import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import {UserContext} from '../../context/AuthContext'

function SingUp() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] =useState('')
  const [nome, setNome] = useState('')

  const {singUp} = useContext(UserContext)

  const hancleSubmit = (e)=>{
    e.preventDefault()
    singUp(email, senha, nome)
  }

    return (
      <section className='container_login' >
        <div className='container_login_itens'>
          <div className='div_logo'>
            <img src={logo} />
          </div>
          <form onSubmit={hancleSubmit} className='input_login'>
            <h2>Registrar</h2>
            <input className='input-login input_input' type='text' value={nome} onChange={e => setNome(e.target.value)}  placeholder='Nome'  required />
            <input className='input-login input_input ' placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className='input-login input_input ' placeholder='Senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)} required />
            <button type='submit' className='input-login btn ' >Cadastrar</button>
            <Link to='/' className='btn_registar' >Já possuir uma conta!</Link>
          </form>
          

        </div>
      </section>
    );
  }
  
  export default SingUp;
  