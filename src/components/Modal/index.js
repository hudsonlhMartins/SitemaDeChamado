import React, {Fragment} from "react";
import { FiX } from "react-icons/fi";
import './modal.css'

export default function Modal({conteudo, close}){

    return(
        <div className='modal' >
            <div className='container'>
                <button onClick={close} className='close' ><FiX size={23} color='#fff' />Fecha</button>
        
                <div>
                    <h1>Detalhes do chamados</h1>
                    <div className='modal-conteudo'>
                        <span>Cliente: <a>{conteudo.nome}</a></span>
                        <span>Cidade: <a>{conteudo.cidade}-{conteudo.estado}</a></span> 
                    </div>

                    <div className='modal-conteudo'>
                        <span>Assunto: <a>{conteudo.assunto}</a></span>  
                        <span>Cadastrado em:  <a>{conteudo.createdFormated}</a></span>
                    </div>

                    <div className='modal-conteudo'>
                        <span>Status: <a className='status-modal' style={conteudo.status ==='Aberto' ? {backgroundColor:'#5cb85c'} :
                        {backgroundColor:'#333'}}> {conteudo.status}</a> </span> 
                    </div>

                    <Fragment>
                        <h4>Complemento</h4>
                        <p>{conteudo.complemento}</p>
                    </Fragment>
                </div>
                </div>

        </div>
    )
}