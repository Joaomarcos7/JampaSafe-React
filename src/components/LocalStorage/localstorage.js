


export const getlocalstorage=()=>JSON.parse(localStorage.getItem('db')) ?? []

export const setlocalstorage=(card)=>localStorage.setItem('db',JSON.stringify(card))



 export const editcard=(card,index)=>{
let db =getlocalstorage()
db[index]=card
setlocalstorage(db)
 }
  



export const removecard=(index)=>{
    const response= confirm('Deseja mesmo excluir o seu Relato?')
    if (response){
    let db=getlocalstorage()
    db.splice(index,1)
    setlocalstorage(db)
    window.location.reload(false)
    }

  }