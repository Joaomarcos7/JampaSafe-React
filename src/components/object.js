 const getlocalstorage=()=> JSON.parse(localStorage.getItem('db')) ?? [] 

const setlocalstorage=(db_card)=> localStorage.setItem('db',JSON.stringify(db_card))



//CREATE
const createcard=(card)=>{
   let db_card= getlocalstorage()  
   db_card.push(card)
   setlocalstorage(db_card)
}

//READ
const readcard=()=> getlocalstorage()

//UPDATE

const updatecard=(index,card) => {
    const db_card=readcard()
db_card[index]=card //dados atualizados
setlocalstorage(db_card)
}

//ERASE

const deletecard = (index) => {
    const dbcard=readcard()
    dbcard.splice(index,1)
     setlocalstorage(dbcard)      //método splice para arrays. param1: índice de start , param2: qtd de elementos a remover!
}


const isvalid=()=> {
   return document.getElementById('form').reportValidity()// método retorna true se todos os required foram atendidos e falso se não!!
}



const clearfields=()=>{
   const fields= document.querySelectorAll('.modal-field') //antes de atualizar os cards da maneira que esta no localstorage, ele exclui o lixo restante no DOM para nao duplicar cards.
   fields.forEach(
 field => field.value=''   
   )
}

 
const somar=(tipo)=>{
    const dialog=document.getElementById('dialog')
 const desmatamento= tipo.filter(tipo => tipo =='Desmatamento').length
 const poluicaosolo=tipo.filter(tipo => tipo =='Poluição do Solo').length
 const poluicaoagua=tipo.filter(tipo => tipo =='Poluição da água').length
 const poluicaoar=tipo.filter(tipo => tipo =='Poluição do Ar').length
 const deposito=tipo.filter(tipo => tipo =='Depósitos de Lixo a Céu Aberto').length
 const queimada=tipo.filter(tipo => tipo =='Queimada').length
 const assoreamento=tipo.filter(tipo => tipo =='Assoreamento de Rios').length
 const outros=tipo.filter(tipo => tipo =='Outros').length
 if(dialog.childElementCount === 1){
createdialog(desmatamento,poluicaosolo,poluicaoar,poluicaoagua,deposito,assoreamento,outros,queimada)
 }
 replacedialog(desmatamento,poluicaosolo,poluicaoar,poluicaoagua,deposito,assoreamento,outros,queimada)
}
const replacedialog=(desmatamento,poluicaosolo,poluicaoar,poluicaoagua,deposito,assoreamento,outros,queimada)=>{

    const list=document.getElementById('lista')
    list.innerHTML=`<li>Desmatamento: ${desmatamento} relato(s)</li> 
    <li>Poluição do Solo: ${poluicaosolo} relato(s)</li>
    <li> Poluição da Água: ${poluicaoagua} relato(s)</li>
    <li>Poluição do Ar: ${poluicaoar} relato(s)</li>
    <li>Dépositos de Lixo a Céu Aberto: ${deposito} relato(s)</li>
    <li>Queimada: ${queimada} relato(s)</li>
    <li>Assoreamento de Rios: ${assoreamento} relato(s)</li>
    <li>Outros: ${outros} relato(s)</li> `

}

const createdialog=(desmatamento,poluicaosolo,poluicaoar,poluicaoagua,deposito,assoreamento,outros,queimada)=>{

    const list= document.createElement('ul')
    list.classList.add('socials')
    list.classList.add('d-flex')
    list.classList.add('justify-content-around')
    list.classList.add('align-items-center')
    list.classList.add('mt-5')
    list.classList.add('pb-2')
    list.id='lista'
    list.style.flexDirection='column'
    list.style.gap='12px'
    
    list.innerHTML=`<li>Desmatamento: ${desmatamento} relato(s)</li> 
    <li>Poluição do Solo: ${poluicaosolo} relato(s)</li>
    <li> Poluição da Água: ${poluicaoagua} relato(s)</li>
    <li>Poluição do Ar: ${poluicaoar} relato(s)</li>
    <li>Dépositos de Lixo a Céu Aberto: ${deposito} relato(s)</li>
    <li>Queimada: ${queimada} relato(s)</li>
    <li>Assoreamento de Rios: ${assoreamento} relato(s)</li>
    <li>Outros: ${outros} relato(s)</li> `
    const dialog=document.getElementById('dialog')
    dialog.appendChild(list)
    }


const filtrar=()=>{
    const db_card=readcard()
 const tipo= db_card.map(card => card.tipo)
 somar(tipo)
}


filtrar()

const contar=()=>{
    let cont=document.getElementById('cont')
    const db_card=readcard()
    cont.innerHTML=` ${db_card.length} Problemas relatado(s)`
}


const createrelato=(card,index)=> {
    const newrelato=document.createElement('div')
    newrelato.classList.add("card");
    newrelato.classList.add("m-5");
    newrelato.innerHTML=` <img src="${card.img}" class="card-img-top card-image" id="image" alt="image"> <ul class="list-group list-group-flush"> <li class="list-group-item fw-bold">Tipo:<span class="px-2" id="type">${card.tipo}</span></li>  <li class="list-group-item fw-bold">Bairro:<span class="px-2 card-descricao" id="bairro">${card.bairro}</span></li>  <li class="list-group-item fw-bold">Data: <span class="px-2 card-descricao" type="date" id='date'>${card.data}</span></li>  <li class="list-group-item fw-bold">Descrição: <span class="px-2 card-descricao" id="description" >${card.descrição} </span></li>   </ul>  <div class="card-body d-flex justify-content-around"> <button type="button" class="btn btn-danger card-button"; data-action='excluir' id='excluir-${index}'>Excluir</button> <button type="button" class="btn btn-warning card-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-action='alterar' id='alterar-${index}'>Alterar</button> </div> `
    newrelato.style.width='18rem'

    const cards=document.getElementById('cards')
    cards.appendChild(newrelato)
    }

    const clearcards=()=> {
        const cards=document.querySelectorAll('.cards .card')
         //retorna uma array dos elementos correspondente
        cards.forEach(card => card.parentNode.removeChild(card)) //apagando o proprio elemento filho para evitar repetição dos cards!
    }

const updatecards=()=>{  
    const db_card=readcard()
    clearcards() // para evitar que ao atualizar os cards se dupliquem na busca no localstorage
    db_card.forEach(createrelato)
}

const addcard=()=>{

    if(isvalid()){

        const card={
            descrição: document.getElementById('exampleFormControlTextarea1').value,
            tipo: document.getElementById('tipo').value,
            bairro: document.getElementById('CEP').value, 
            data:  document.getElementById('title').value.split('-').reverse().join('/'),
            img:document.getElementById('formFile').value
        }
        
        let index= document.getElementById('CEP').dataset.index

        if(index=='new'){
        
        createcard(card)
        console.log('cadastrando...')
        clearfields()
        updatecards()
        contar()
        filtrar()
        }
        else{
           
            updatecard(parseInt(index),card)
            updatecards()
            clearfields()
            filtrar()
        }
       
    }


    else{
        alert('Voce nao preencheu tudo!')
    }


}
const preencher=(card)=>{
            document.getElementById('exampleFormControlTextarea1').value=card.descrição
            document.getElementById('tipo').value=card.tipo
            document.getElementById('CEP').value =card.bairro
            document.getElementById('title').value=card.data.split('/').reverse().join('-')
           //document.getElementById('formFile').value=card.img
           document.getElementById('CEP').dataset.index=card.index
}



const editarcard=(index)=>{
    const card=readcard()[index]
    card.index=index
     preencher(card)
}



const editdelet=(event)=> {
    console.log(event.target.type) // retorna um pointerveent, target te retorna qual elemento vc clicou! type vai te informar o type do botao ja que so apenas o botoes possuem esse atributo

    if (event.target.type==='button'){
       let [action,index] = event.target.id.split('-')
       index=parseInt(index) //maneira diferente de nomear os indices de uma array
       if (action=='alterar'){
        editarcard(index)

       }
       else{
        const response= confirm('Deseja mesmo excluir o seu Relato?')
        if(response){
            console.log('apagando...')
            console.log(typeof(index))  /////typeof method para descobrir o tipo de dado que a variavel possui
       deletecard(index)
       updatecards()
       contar()
       filtrar()
        }
       }
    }
}

const mudança= ()=>{
document.getElementById('CEP').dataset.index='new'
clearfields()
}



document.getElementById('modal-button').addEventListener('click',addcard) //param1: tipo do evento; param2: o que vai ser realizado, função sem o () senão vai  dar erro!!!!

document.getElementById('relatar').addEventListener('click',mudança)


document.querySelector('.cards').addEventListener('click',editdelet)

const loadrefresh=()=>{
    updatecards()
}


const opendialog=()=>{
    const dialog=document.getElementById('dialog')
    dialog.showModal()
}

const closedialog=()=>{
    const dialog=document.getElementById('dialog')
    dialog.close()
}


document.getElementById('ranking').addEventListener('click',opendialog)


document.getElementById('closedialog').addEventListener('click',closedialog)


loadrefresh()
contar()