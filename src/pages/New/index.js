import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiPlus } from 'react-icons/fi'
import './new.css'
import { useState, useEffect, useContext } from "react/cjs/react.development"
import { db } from "../../services/firebaseConnection"
import {getDocs, getDoc, collection, addDoc, doc, updateDoc} from 'firebase/firestore'
import { UserContext } from "../../context/AuthContext"
import { useHistory, useParams } from "react-router-dom"
import { toast } from "react-toastify"


export default function New(){
    const {user} = useContext(UserContext)

    const [ loading, setLoading] = useState(true)
    const [customers, setCustomers] = useState([])
    const [customersIndex, setCustomersIndex] = useState(0)
    const [idCustomers, setIdCustomers] = useState(false)
    const {id} = useParams()
    const history = useHistory()

    const [assunto, setAssunto] = useState('Servico')
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
                        nomeFantasia: doc.data().nomeFantasia,
                        cidade: doc.data().cidade,
                        estado: doc.data().estado
                    })
                })
                if(lista.length ===0){
                    setLoading(false)
                    setCustomers([{id:1, nomeFantasia: 'Frella'}])
                    return
                }
                setCustomers(lista)
                setLoading(false)

                if(id){
                    loadId(lista)  
                    return 
                }
            }).catch(err =>{
                setCustomers(false)
                setCustomers([{id:1, nomeFantasia: 'Frella'}])

            })

        }
        loadingDb()

    }, [])

    const loadId = async (lista)=>{
        const docRef = doc(db, 'chamados' ,id)
        // esse id e o do elemento do chamado com ele podemos pegar todos item__
        // dentro dele id do cliente que e so id
        const pegarItemDB =  await getDoc(docRef).then(snapshot =>{

            setAssunto(snapshot.data().assunto)
            setStatus(snapshot.data().status)
            setComplemento(snapshot.data().complemento)

            let findNome = lista.findIndex(item => item.id === snapshot.data().id)
            // aqui esta vendo se o id da lista e igual o id do chamando esse id do chamado__
            // e o mesmo do customer que o da lista. E vai traz o index do item da lista__
            // com ele podemos pegar o nomeFantasia certo

            setCustomersIndex(findNome)
            setIdCustomers(true)
            console.log('entrou')
        }).catch (err =>{
            console.log('erro no id passado', err)
            setIdCustomers(false)
        })
    }

    const handleRegister = async (e)=>{
        e.preventDefault()
        if(idCustomers){
            const docRef = doc(db, 'chamados', id)
            await updateDoc(docRef, {
                nome: customers[customersIndex].nomeFantasia,
                status: status,
                assunto: assunto,
                complemento: complemento,
                uid: user.uid,

            }).then(()=>{
                toast.success('Editado com sucesso')
                setCustomersIndex(0)
                setComplemento('')
                history.push('/dashboard')
                setIdCustomers(false)
            }).catch(err =>{
                toast.error('Error')
                setIdCustomers(false)
            })
            return
        }

        const collectionRef = collection(db, 'chamados')
        await addDoc(collectionRef, {
            nome: customers[customersIndex].nomeFantasia,
            created: new Date(),
            id: customers[customersIndex].id,
            cidade: customers[customersIndex].cidade,
            estado: customers[customersIndex].estado,
            uid: user.uid,
            status: status,
            assunto: assunto,
            complemento: complemento
        }).then(()=>{
            toast.success('Chamado salvo com sucesso')
            setComplemento('')
            setCustomersIndex(0)
            history.push('/dashboard')
        }).catch(err =>{
            toast.error('Error')
            console.log(err)
        })
        
    }

    const handleAssunto = (e) =>{
        setAssunto(e.target.value)
    }

    const handleStatus = (e)=>{
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    const handleChangedCustomers = (e)=>{
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
                            <option value='Servico'>Serviço</option>
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
                        
                        <button type='submit'> {idCustomers ? 'Atualizar' : 'Registar'} </button>
                    </form>
                </div>
            </div>
        </div>
    )
}