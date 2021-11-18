import './customers.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiUser} from 'react-icons/fi' 
import { db } from '../../services/firebaseConnection'
import {setDoc, collection, addDoc} from 'firebase/firestore'
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Customers(){
    const [marcarSetting, setSetting] = useState (true)
    const [nomeFantasia, setNomeFnatasia] = useState('')
    const [cep, setCep] = useState('')

    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [bairro, setBairro] = useState('')

    const [showEndereco, setShowEndereco] = useState(false)


    useEffect(()=>{
        const setting = document.querySelector('.cliente')
        if(marcarSetting){
            setting.classList.add('active_menu')
        }
        return(()=>{
            setSetting(false)
        })
    }, [])

    async function getApi(url){
       const res = await axios.get(url)
       return res
    }

    const getCep = ()=>{
        const valueSem = cep.replace(/\D/g,'')
        const url = `https://viacep.com.br/ws/${valueSem}/json/`
        if(valueSem.length === 8){
            console.log(valueSem)
            getApi(url).then(value =>{
                if(value.status >= 200 || value.status < 300){
                    setShowEndereco(true)
                    console.log(value.data)

                    setCidade(value.data.localidade)
                    setEstado(value.data.uf)
                    setBairro(value.data.bairro)
                }
            })
        }
        setShowEndereco(false)
    }

    const handleAdd = async (e)=>{
        e.preventDefault()
        const usersCollectionRef = collection(db, 'customers')
        await addDoc(usersCollectionRef, {
            nomeFantasia: nomeFantasia,
            cidade: cidade,
            estado: estado,
            bairro: bairro
        }).then(()=>{
            setCep('')
            setCidade('')
            setNomeFnatasia('')
            setEstado('')
            setBairro('')
            toast.success('Cliente Salvo com sucesso :)')
            setShowEndereco(false)
        }).catch(err =>{
            console.log(err)
            setShowEndereco(false)
        })
        
    }

    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name='Clientes'>
                    <FiUser size={25}/>
                </Title>

                <div className='container customers'>
                    <form onSubmit={handleAdd} className='form-profile customers'>
                        <label>Nome fantasia</label>
                        <input type='text' placeholder='Nome da empresa' value={nomeFantasia} onChange={e => setNomeFnatasia(e.target.value)} required />

                        <label>CNPJ</label>
                        <input type='text' placeholder='CNPJ' value={nomeFantasia} onChange={e => setNomeFnatasia(e.target.value)} required />

                        <label>CEP</label>
                        <input onBlur={getCep} id='cep' type='text' placeholder='CEP' value={cep} onChange={e => setCep(e.target.value)}
                            pattern="[\d]{5}-?[\d]{3}" data-tipo='cep'
                        required />

                        
                        <label>Bairro</label>
                        <input placeholder='Bairro' type='text' value={bairro} onChange={e => setBairro(e.target.value)} required/>

                        {showEndereco &&(
                            <Fragment>
                                <label>Cidade</label>
                                <input type='text' value={cidade} disabled={true} />

                                <label>Estado</label>
                                <input type='text' value={estado} disabled={true} />
                            </Fragment>
                        )}

                        <button>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}