import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiPlus } from 'react-icons/fi'
import './new.css'
import { useState, useEffect, useContext } from "react/cjs/react.development"
import { db } from "../../services/firebaseConnection"
import {getDocs, collection} from 'firebase/firestore'
import { UserContext } from "../../context/AuthContext"
export default function New(){
    const {user} = useContext(UserContext)

    const [ loading, setLoading] = useState(true)
    const [customers, setCustomers] = useState([])
    const [customersIndex, setCustomersIndex] = useState(0)

    const [assunto, setAssunto] = useState('')
    const [status, setStatus] = useState('Aberto')
    const [complemento, setComplemento] = useState('')


    useEffect(()=>{

        async function loadingDb (){
            const collectionRef = collection(db, 'customers')
            const pegarItemDB = await getDocs(collectionRef).then(dados =>{
                let lista = []
                dados.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })
                if(lista.length ===0){
                    setLoading(false)
                    setCustomers([{id:1, nomeFantasia: 'Frella'}])
                    return
                }
                setCustomers(lista)
                setLoading(false)
            }).catch(err =>{
                setCustomers(false)
                setCustomers([{id:1, nomeFantasia: 'Frella'}])

            })

        }
        loadingDb()

    })

    const handleRegister = (e)=>{
        e.preventDefault()
        alert('Foi')
    }

    const handleAssunto = (e)=>{
        setAssunto(e.target.value)
        console.log(e.target.value)
    }

    const handleStatus = (e)=>{
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    const handleChangedCustomers = (e)=>{
        console.log(e.target.value)
        setCustomersIndex(e.target.value)
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name='Novo Chamado'>
                    <FiPlus size={24} />
                </Title>

                <div className='container'>
                    <form onSubmit={handleRegister} className='form-profile newChamado'>
                        <label>Cliente</label>

                        {loading ?(<input type='text' disabled={true} placeholder='Carregando Clientes..' />) : (
                            <select value={customersIndex} onChange={handleChangedCustomers}>
                                {customers.map((item, index)=>{
                                    return <option value={index} key={item.id}>{item.nomeFantasia}</option>
                                })}
                            </select>
                        )}



                        <label>Assunto</label>
                        <select onChange={handleAssunto} >
                            <option value='layant'>Serviço</option>
                            <option value='Financeiro'>Financeiro</option>
                            <option value='Suporte'>Visita de suporte</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input type='radio' name='radio' value='Aberto'
                                onChange={handleStatus}
                                checked={status === 'Aberto'}
                            />
                            <span>Em aberto</span>

                            <input type='radio' name='radio' value='Progresso'
                                onChange={handleStatus}
                                checked={status === 'Progresso'}
                            />
                            <span>Progresso</span>

                            <input type='radio' name='radio' value='Completo'
                                onChange={handleStatus}
                                checked={status === 'Completo'}
                            />
                            <span>Completo</span>
                        </div>

                        <label>Complemento</label>
                        <textarea type='text' placeholder='descreva seu problema (opcional)' 
                            value={complemento}
                            onChange={e => setComplemento(e.target.value)}
                        />
                        
                        <button type='submit'>Registar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}