import React from "react";
import { Link ,useNavigate} from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const LogoutHandle = ()=>{
      localStorage.removeItem("token");
      navigate("/login")
  }

  const LoggedInOrNot = ()=>{
    if(localStorage.getItem("token")!=null)
      return true;
    else
      return false;
}

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={LoggedInOrNot()===true?"/Input":"/login"}>
            Network Intrusion Detection System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link`} aria-current="page" to={LoggedInOrNot()===true?"/Input":"/login"}>
                  Home
                </Link>
              </li>
            </ul>
                {
              !localStorage.getItem("token")?
                  
                  <form className="d-flex">
                    
                    <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
                  
                
                </form>
                  :<button className="btn btn-primary mx-2" onClick={LogoutHandle}>Logout</button>}
                
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
