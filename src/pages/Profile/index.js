import {useState, useContext, useEffect} from 'react'
import Header from "../../components/Header"
import { FiSettings, FiUpload } from "react-icons/fi";
import Title from "../../components/Title";
import { UserContext } from '../../context/AuthContext';
import avatar from '../../assets/avatar.png';
import './profile.css'


export default function Profile (){

    const [marcarSetting, setSetting] = useState (true)
    const {user} = useContext(UserContext)
    const [email, setEmail] = useState(user && user.email)
    const [nome, setNome] = useState(user && user.nome)

    useEffect(()=>{
        const setting = document.querySelector('.setting')
        if(marcarSetting){
            setting.classList.add('active_menu')
        }
        return(()=>{
            setSetting(false)
        })
    }, [])



    const updateUser = (e)=>{
        e.preventDefault()
        alert('clicou')
    }

    return(
        <div>
        <Header/>
  
        <div className="content">
          <Title name="Meu perfil">
            <FiSettings size={25} />
          </Title>
  
  
          <div className="container">
            <form className="form-profile">
              <label className="label-avatar">
                <span>
                  <FiUpload color="#FFF" size={25} />
                </span>
  
                <input type="file" accept="image/*" /><br/>
                { user.avatarUrl === null ? 
                  <img src={avatar} width="250" height="250" alt="Foto de perfil do usuario" />
                  :
                  <img src={user.avatarUrl} width="250" height="250" alt="Foto de perfil do usuario" />
                }
              </label>
  
              <label>Nome</label>
              <input type="text" value={nome} onChange={ (e) => setNome(e.target.value) } />
  
              <label>Email</label>
              <input type="text" value={email} disabled={true} />     
  
              <button type="submit">Salvar</button>       
  
            </form>
          </div>
  
          <div className="container">
              <button className="logout-btn" onClick={ () => {} } >
                 Sair
              </button>
          </div>
  
        </div>
      </div>
        
    )
}