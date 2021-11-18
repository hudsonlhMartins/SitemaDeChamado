import { Fragment, useContext } from 'react';
import {UserContext} from '../../context/AuthContext'
import Header from '../../components/Header';
import './dashboard.css'
import Title from '../../components/Title'
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi'
import { useState } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';

function Dashboard() {
  const {SingOut}= useContext(UserContext)
  const [chamados, setChamados] = useState([1 ])
  function sair(){
    SingOut()
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
                <tr>
                  <td data-label='Cliente'>Hudson</td>
                  <td data-label='asunto'>front-end</td>
                  <td data-label='status'>
                    <span className='badge' style={{backgroundColor:'#5cb85c'}}>Em Aberto</span>
                  </td>
                  <td data-label='cadastrado'>18/09/2021</td>
                  <td data-label='#'>
                    <button className='action' style={{backgroundColor: '#0d80c2'}}>
                      <FiSearch color='#fff' size={17} />
                    </button>
                    <button className='action' style={{backgroundColor: '#4a02bf'}} >
                      <FiEdit2 color='#fff' size={17} />
                    </button>
                  </td>
                </tr>

                
              </tbody>
            </table>
          </Fragment>
        ) }
        

      </div>
      
    </div>
  );
}

export default Dashboard;

// 