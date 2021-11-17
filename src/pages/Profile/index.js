import {useState, useContext, useEffect} from 'react'
import Header from "../../components/Header"
import { FiSettings, FiUpload } from "react-icons/fi";
import Title from "../../components/Title";
import { UserContext } from '../../context/AuthContext';


import { db } from '../../services/firebaseConnection';
import {updateDoc, doc, setDoc} from 'firebase/firestore'
import { storege } from '../../services/firebaseConnection';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'

import avatar from '../../assets/avatar.png';
import './profile.css'
import { async } from '@firebase/util';


export default function Profile (){

    const [marcarSetting, setSetting] = useState (true)
    const {user, SingOut, addLocacalStorege, setUser} = useContext(UserContext)
    const [email, setEmail] = useState(user && user.email)
    const [nome, setNome] = useState(user && user.nome)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [avatarImage, setAvatarImage] = useState(null)

    useEffect(()=>{
        const setting = document.querySelector('.setting')
        if(marcarSetting){
            setting.classList.add('active_menu')
        }
        return(()=>{
            setSetting(false)
        })
    }, [])



     const handleImage = (e)=>{
       // isso e so um previl
        const image = e.target.files[0]
        if(image){
          if(image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/gif'){
            setAvatarImage(image)
            setAvatarUrl(URL.createObjectURL(image))
            // para criar uma url com esse objecto que e fimagem passada
          }else{
            alert('imagem não valida')
            setAvatarImage(null)
            return null
          }
          
        }
       
     }


     const handleUpload = async ()=>{
      const currentUid = user.uid
      const imagem = ref(storege, `image/${currentUid}/${avatarImage.name}`)
      // criando uma pasta nome imagem outra pasta com uid e outra com o nome da imagem
      const uploadTask = uploadBytesResumable(imagem, avatarImage)  
      uploadTask.on('state_changed', (snapshot) =>{},

        (err) => console.log(err),
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then( async (url)=>{
            const usuario = doc(db, 'users', currentUid)
            await updateDoc(usuario, {'avatarUrl': url, 'nome': nome})
              .then(()=>{
                // caso salvar no banco de dados com exito
                let data = {
                  ...user,
                  'nome': nome,
                  'avatarUrl': url
                }
                addLocacalStorege(data)
                setUser(data)
              })
          })
        }
      )
     }

    const updateUser = async (e)=>{
        e.preventDefault()
        alert('clicou')
        if(avatarImage === null && nome !== ''){
          const dado = doc(db, 'users', user.uid)
          const atualizar = await updateDoc(dado, {nome: nome}).then(()=>{
            const data = {
              ...user,
              nome: nome
            }
            addLocacalStorege(data)
            setUser(data)
          })
        }else if(nome !=='' && avatarImage !== null){
          handleUpload()
        }
    }

    return(
        <div>
        <Header/>
  
        <div className="content">
          <Title name="Meu perfil">
            <FiSettings size={25} />
          </Title>
  
  
          <div className="container">
            <form onSubmit={updateUser} className="form-profile">
              <label className="label-avatar">
                <span>
                  <FiUpload color="#FFF" size={25} />
                </span>
  
                <input type="file" accept="image/*"  onChange={handleImage} /><br/>
                { avatarUrl === null ? 
                  <img src={avatar} width="250" height="250" alt="Foto de perfil do padrão" />
                  :
                  <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuario" />
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
              <button className="logout-btn" onClick={ () => {SingOut()} } >
                 Sair
              </button>
          </div>
  
        </div>
      </div>
        
    )
}