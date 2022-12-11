import card from './main'



function Card(tipo,data,bairro,descricao){


    return(
        <div className='card m-5'>
        <img src="..." class="card-img-top card-image" id="image" alt="image"/> <ul class="list-group list-group-flush"> <li class="list-group-item fw-bold">Tipo:<span class="px-2" id="type">{tipo}</span></li>  <li class="list-group-item fw-bold">Bairro:<span class="px-2 card-descricao" id="bairro">{bairro}</span></li>  <li class="list-group-item fw-bold">Data: <span class="px-2 card-descricao" type="date" id='date'>{data}</span></li>  <li class="list-group-item fw-bold">Descrição: <span class="px-2 card-descricao" id="description" >{descricao} </span></li>   </ul>  <div class="card-body d-flex justify-content-around"> <button type="button" class="btn btn-danger card-button"data-action='excluir' id='excluir-${index}'>Excluir</button> <button type="button" class="btn btn-warning card-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-action='alterar' id='alterar-${index}'>Alterar</button> </div>
        </div>
    )
}

export default Card