import logo from '../logo.png'
function Header (){
    return (
<nav className="navbar">
      <img src={logo} alt="Skyrun Tech Logo" className="logo"/>
      {/* <div className="title">SKYRUN ELECTRIC POWER TECHNOLOGY NIG LTD</div> */}
        <div className="nav-links">
          <a href="#products">Product</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
</nav>

    )
}

export default Header