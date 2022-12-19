import Card from './card'
import React from 'react'
import { useState } from 'react'
import {getlocalstorage,setlocalstorage,editcard} from './LocalStorage/localstorage'
import Ranking from './ranking'

function Main(){

  const [values,setvalues]=useState('')

const handlechanges=(event)=>{
    setvalues((prevvalues)=>({...prevvalues,[event.target.name]:event.target.value,}))
}

const addcard=(card)=>{
  let db=getlocalstorage()
  db.push(card)
  setlocalstorage(db)
  //setvalues('')
}
/*
const isvalid=()=>{
 return document.querySelector('.form').reportValidity()
}*/




function formatarCEP(str){
	var re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/; // Pode usar ? no lugar do *

	if(re.test(str)){
		return str.replace(re,"$1.$2-$3");
	}else{
		alert("CEP inválido!");
    return false
	}
	
}

const handlesubmit=()=>{
  let special=document.querySelector('#CEP').dataset.index
  if(special=='new'){
    let l = formatarCEP(values.CEP)
    if (l!==false){
      addcard(values)
    }
    
  }
  else{
    editcard(values,parseInt(special))
    special='new'
    formatarCEP(values.CEP)
}
  
}



//const createrelatos=()=>{
 //let db=getlocalstorage()
  //db.map(()=>{
    //return(
      //<Card tipo={db.Tipo} data={db.Data} bairro={db.Bairro} descricao={db.Descrição}/>
    //)
  //})






    return(

    <main>
        <section className="slogan d-flex justify-content-around m-0 m-auto mt-5 mx-4">
            <div className="frase d-flex flex-column align-self-center">
                <h2 className="fs-1">Ajude João Pessoa!</h2>
                <p className="mt-3 fs-4">Encontrou algum problema ambiental?</p>
                <span className="mt-1 fs-5">Relate aqui!
                  <button type="button" className="btn btn-success mx-3 fs-6" data-bs-toggle="modal" data-bs-target="#exampleModal" id="relatar" onClick={()=>document.querySelector('#CEP').dataset.index='new'}>
                    Relatar
                  </button>
                  <span className="mt-1 fs-5"> Acompanhe nossas Estatísticas!</span>
                  <button  type="button" className="btn btn-success mx-3 fs-6" id="ranking" onClick={()=>document.querySelector('dialog').showModal()} > Ver Ranking</button>


                  
                  <dialog id="dialog" > 

                    <div  style={{width:'80%' ,display: 'flex',justifyContent: 'space-between',marginLeft: '20%'}}>

                    <h3 style={{textAlign: 'center',marginLeft:'23%',marginTop:'4%'}}>Ranking de Tipos</h3>

                      
                    <button type="button" className="btn-close" id="closedialog" onClick={()=>document.querySelector('dialog').close()} ></button>

                  </div>

                  <Ranking/>

                  </dialog>
                  
                  
                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Delatar Problema</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" id="close" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <form className="form" >
                            <div className="mb-3">
                              <p style={{color:'red',fontsize:'1.2rem'}}> Etapa Imagem ainda em Manutenção 🚧...</p>
                              <label  className="form-label" >Imagem</label>
                              <input className="form-control modal-field" type="file" id="formFile" />
                            </div>
                              <label htmlFor="formFile" className="form-label" >Tipo</label>
                            <select className="form-select mb-3 modal-field" aria-label="Default select example" id="tipo" name='Tipo' onChange={handlechanges}required>
                              <option >Escolha o Tipo:</option>
                              <option value="Poluição do Solo"  >Poluição do Solo</option>
                              <option value="Poluição da água">Poluição da Água</option>
                              <option value="Poluição do Ar">Poluição do Ar</option>
                              <option value="Depósitos de Lixo a Céu Aberto">Depósitos de Lixo a Céu Aberto</option>
                              <option value="Queimada">Queimada</option>
                              <option value="Desmatamento">Desmatamento</option>
                              <option value="Assoreamento de Rios">Assoreamento de Rios</option>
                              <option value="Outros">Outros</option>
                            </select>
                              <label htmlFor="formFile" className="form-label" >CEP</label>
                            <input type="text" className="form-control modal-field " id="CEP" data-index="new"  name='CEP' onChange={handlechanges} maxLength='8' required/>
                              <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" style={{textDecoration:'none', fontSize:'1rem'}}>Não sabe seu CEP? Clique aqui</a>
                            <div className="mb-3">
                              <label htmlFor="title" className="form-label " >Data</label>
                              <input type="date" className="form-control modal-field" onChange={handlechanges} id="title" name='Data'  required/>
                            </div>

                            <div className="mb-3">
                              <label htmlFor="exampleFormControlTextarea1" className="form-label">Descrição</label>
                              <textarea className="form-control modal-field" id="exampleFormControlTextarea1" rows="3" placeholder="Descrição do problema" name='Descrição' onChange={handlechanges} required></textarea>
                            </div>
                            <button type='submit' id='modal-button' className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={()=>handlesubmit()} >Enviar</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
            </div>

            <div className="undraw">
                <img src="imgs/undraw-nature.png" width="350px" height="300px" alt="imagem ilustrativa de interação internet e meio ambiente"/>
            </div>
        </section>

        <section className="principal mt-5">
            <h3 className="text-center text-uppercase pt-5 text-black" id="cont"> {getlocalstorage().length} Problemas relatado(s)</h3>

            <div className="cards d-flex flex-wrap" id='cards'>

          {
          getlocalstorage().map((card,index) => (
            <>
              <Card Data={card.Data.split('-').reverse().join('/')} Tipo={card.Tipo} Bairro={card.CEP} Descrição={card.Descrição} id={index} />
            </>
          ))}

            </div>
            

        </section>

        <section id="section-about" className="about">

          <div className="about-container d-flex justify-content-center align-items-center p-5">
            <div className="about-image">
              <img src="/imgs/about.png" width="480px" height="414px" alt="sobre nos"/>
            </div>
            <div className="about-us">
              <p className="text-uppercase fs-6 text-success">sobre nós</p>
              <h2 className="somos pb-3">Entenda quem somos e por que existimos</h2>
              <p className="descrip">Nós somos uma equipe que se preocupa com o destino ambiental da nossa cidade. Vemos que crimes contra o meio ambiente vem se tornando cada mês mais recorrentes e os órgãos responsáveis não tomam as medidas adequadas por falta de informação. Nesse âmbito, decidimos criar uma plataforma web bastante acessível e fácil de ser utilizada que agrupa dados e informações em relação aos problemas ambientais da cidade (João Pessoa), diretamente da população, que serão utilizadas pelos líderes governamentais para resolver esses problemas.</p>
            </div>
            </div>
          </section>
  
        <section id="section-contact" className="contact">
          <div className="contact-container d-flex justify-content-around align-items-center p-5 m-5">
            <div className="contact-us w-25">
              <h2 className="contato pb-3">Entre em contato com a gente!</h2>
              <p className="descrip pb-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum fugiat fugit velit tempore nemo. Sint repellendus nihil maxime porro id, voluptates iure commodi at a quis eveniet dolores distinctio fuga.</p>
              <a href="https://wa.me/5583988324912?text=Te+amo+" className="linkzap"><button type="button" className="zap-button btn btn-success d-flex align-items-center justify-content-around"><i className="fa-brands fa-whatsapp fs-5"></i> Entrar em contato</button></a>
            </div>
            <div className="contact-icons">
              <p className="descrip pb-2"><span className="text-success"><i className="fa-sharp fa-solid fa-phone px-2"></i></span> (83) 99999-9999</p>
              <p className="descrip pb-2"><span className="text-success"><i className="fa-solid fa-location-dot px-2"></i></span> R. Fulano de Tal</p>
              <p className="descrip pb-2"><span className="text-success"><i className="fa-solid fa-envelope px-2"></i></span> jampasafe@cgu.gov.br</p>
            </div>
          </div>
        </section>
      </main>
      )
   }

   export default Main
   
