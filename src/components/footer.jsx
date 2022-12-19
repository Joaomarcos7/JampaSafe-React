function Footer(){

 return(
    <footer>
        <div className="footer-container d-flex justify-content-center align-items-center flex-column text-center">
          <ul className="socials d-flex justify-content-center align-items-center pb-2">
            <li className="mx-3 scale"><a className="face" href="#"><i className="fa-brands fa-facebook fs-3"></i></a></li>
            <li className="mx-3 scale"><a className="insta" href="#"><i className="fa-brands fa-instagram fs-3"></i></a></li>
            <li className="mx-3 scale"><a className="twit" href="#"><i className="fa-brands fa-twitter fs-3"></i></a></li>
          </ul>
          <p className="text-white">© 2022 - Todos os direitos reservados</p>
        </div>
      </footer>
 ) 
 
 
}

export default Footer