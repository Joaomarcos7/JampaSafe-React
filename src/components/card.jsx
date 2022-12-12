import {removecard} from './LocalStorage/localstorage'
import Main from './main'
import {useState} from 'react'

const Card=(props)=>{
const [bairros,setbairro]=useState('')

    async function getbairro(cep){
        const url= 'https://viacep.com.br/ws/' + cep + '/json/'
       const response = await fetch(url)
       const info =  await response.json()
       const bairro= info.bairro
       setbairro(bairro)
    } 

    getbairro(props.Bairro)


    return(

        <div className='card m-5'>
        <img src="..." class="card-img-top card-image" id="image" alt="image"/> <ul class="list-group list-group-flush"> <li class="list-group-item fw-bold">Tipo:<span class="px-2" id="type">{props.Tipo}</span></li>  <li class="list-group-item fw-bold">Bairro:<span class="px-2 card-descricao" id="bairro">{bairros}</span></li>  <li class="list-group-item fw-bold">Data: <span class="px-2 card-descricao" type="date" id='date'>{props.Data}</span></li>  <li class="list-group-item fw-bold">Descrição: <span class="px-2 card-descricao" id="description" >{props.Descrição} </span></li>   </ul>  <div class="card-body d-flex justify-content-around"> <button type="button" class="btn btn-danger card-button"data-action='excluir' id={props.id} onClick={()=>removecard(props.id)}>Excluir</button> <button type="button" class="btn btn-warning card-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-action='alterar' id='alterar-${index}' onClick={()=>{document.querySelector('#CEP').dataset.index=props.id;}}  >Alterar</button> </div>
        </div>
        
    )
}

export default Card