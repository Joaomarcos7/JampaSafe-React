
import { getlocalstorage } from "./LocalStorage/localstorage"

const Ranking=()=>{

let db=getlocalstorage()
let tipo=db.map(card=>card.Tipo)
const desmatamento= tipo.filter(tipo => tipo =='Desmatamento').length
 const poluicaosolo=tipo.filter(tipo => tipo =='Poluição do Solo').length
 const poluicaoagua=tipo.filter(tipo => tipo =='Poluição da água').length
 const poluicaoar=tipo.filter(tipo => tipo =='Poluição do Ar').length
 const deposito=tipo.filter(tipo => tipo =='Depósitos de Lixo a Céu Aberto').length
 const queimada=tipo.filter(tipo => tipo =='Queimada').length
 const assoreamento=tipo.filter(tipo => tipo =='Assoreamento de Rios').length
 const outros=tipo.filter(tipo => tipo =='Outros').length

return(
<ul style={{listStyle: "none",flexDirection:'column',gap:'12px'}} className='socials d-flex justify-content-around align-items-center mt-5 pb-2'>

<li>Poluição do Solo:{poluicaosolo} </li>
<li>Poluição da Água: {poluicaoagua}</li>
<li>Poluição do Ar: {poluicaoar}
</li>
<li>Depósitos de Lixo a Céu Aberto:{deposito} </li>
<li>Queimada:{queimada} </li>
<li>Desmatamento:{desmatamento} </li>
<li>Assoreamento de Rios:{assoreamento} </li>
<li>Outros: {outros}</li>

</ul>

)

}



export default Ranking