import { Fragment, useContext } from 'react';
import {UserContext} from '../../context/AuthContext'
import Header from '../../components/Header';
import './dashboard.css'
import Title from '../../components/Title'
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi'
import { useEffect, useState } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, orderBy, limit, query, startAfter, doc } from '@firebase/firestore';
import {format} from 'date-fns'
import Modal from '../../components/Modal';

function Dashboard() {
  const {SingOut, user}= useContext(UserContext)
  const [chamados, setChamados] = useState([])
  const [loading, setLoanding] = useState(true)
  const [loadigMore, setLoadingMore] = useState(false)
  const [isEmpty, setIsEmpty] = useState (false)
  const [lastDocs, setLastDocs] = useState()
  const [showPostModal, setShowPostModal] = useState(false)
  const [detail, setDetail] = useState()




  function sair(){
    SingOut()
  }


  useEffect(()=>{

    loadChamados()

    return()=>{

    }

  }, [])


  async function loadChamados(){

    const collectionRef =  collection(db, 'chamados')
    const ordenadoWithLimit = query(collectionRef, orderBy('created', 'desc'), limit(5) )

    await getDocs(ordenadoWithLimit).then((snapshot =>{
      
      updateState(snapshot)
   
    }))
      .catch(err =>{
        setLoanding(false)
      })
    setLoadingMore(false)
  }

  function updateState(snapshot){

    const isCollectionEmpty = snapshot.size === 0
    let list = []

    if(!isCollectionEmpty){
      snapshot.forEach(doc =>{
        if(user.uid === doc.data().uid)
        list.push({
          idIElemento: doc.id,
          id: doc.data().id,
          assunto: doc.data().assunto,
          complemento: doc.data().complemento,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          nome: doc.data().nome,
          status: doc.data().status,
          uid: doc.data().uid,
          cidade: doc.data().cidade,
          estado: doc.data().estado
        })
      })

      const lastDoc = snapshot.docs[snapshot.docs.length -1]; // pegar o ultimo item pecorrido
      setChamados(chamados => [...chamados, ...list])
      // pegando os item que ja tem e adicionando mais com ..list
      setLastDocs(lastDoc)
      setLoanding(false)

    }else{
      setIsEmpty(true)
    }
    setLoanding(false)
  }

  const handleMore = async() =>{
    setLoadingMore(true)
    const collectionRef =  collection(db, 'chamados')
    const ordenadoWithLimitAndStartAfert = query(collectionRef, orderBy('created', 'desc'), limit(5), startAfter(lastDocs))
    await getDocs(ordenadoWithLimitAndStartAfert).then(snapshot =>{
      updateState(snapshot)
      setLoadingMore(false)
    }).catch(err =>{
      setLoadingMore(false)
    })
  }

  function togglePostModal(item){
    setShowPostModal(!showPostModal)
    setDetail(item)

  }

  if(loading){
    return(
      <div>
        <Header/>
         <div className='content'>
          <Title name='Antendimento'>
            <FiMessageSquare size={24} />
          </Title>

          <div className='container'>Carregando...</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header/>
      <div className='content'>

        <Title name='Antendimento'>
          <FiMessageSquare size={24} />
        </Title>

        {chamados.length === 0 ?(
          <div className='container bashboard'>
            <span>Nenhum Chamado registrado...</span>
            <Link to='/new' className='new' >
              <FiPlus  color='#fff'/>
              Novo chamado
            </Link>
          </div>
        ) :  (
          <Fragment>
            <Link to='/new' className='new' >
              <FiPlus  color='#fff'/>
              Novo chamado
            </Link>


            <table>
              <thead>
                <tr>
                  <th scope='col'>Cliente</th>
                  <th scope='col'>Assunto</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Cadastrando em</th>
                  <th scope='col'>#</th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((item, index) =>{
                  return(
                    <tr key={index} >
                      <td data-label='Cliente'>{item.nome}</td>
                      <td data-label='asunto'>{item.assunto}</td>
                      <td data-label='status'>
                        <span className='badge' style={item.status ==='Aberto' ? {backgroundColor:'#5cb85c'} :
                            {backgroundColor:'#333'}
                          }>{item.status}</span>
                      </td>
                      <td data-label='cadastrado'>{item.createdFormated}</td>
                      <td data-label='#'>
                        <button className='action' style={{backgroundColor: '#0d80c2'}} onClick={()=> togglePostModal(item) } >
                          <FiSearch color='#fff' size={17} />
                        </button>
                        <Link to={`/new/${item.idIElemento}`} className='action' style={{backgroundColor: '#4a02bf'}} >
                          <FiEdit2 color='#fff' size={17} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {loadigMore && (<h3>Carregando mais item</h3>)}
            {!isEmpty &&  !loadigMore &&  (
              <button className='btn-more' onClick={handleMore} >Buscar Mais</button>
            )}
          </Fragment>
        ) }

             
      </div>

      {showPostModal&&(
        <Modal  conteudo={detail} close={togglePostModal} />
      )}
      
    </div>
  );
}

export default Dashboard;

// 