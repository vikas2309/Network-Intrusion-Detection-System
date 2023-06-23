import React ,{useState,useEffect}from "react";
import {useNavigate} from "react-router-dom";


const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
  const handleSubmit=async(e)=>{
       e.preventDefault();
       const response = await fetch("http://localhost:5000/api/auth/createUser", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
         });
         const json = await response.json();
         if(json.success){
             //Save the auth token and redirect
             localStorage.setItem('token',json.authtoken);
             navigate("/");
         }
         
  }
  
  const onChange = (e) => {
    setcredentials({...credentials,[e.target.name]:e.target.value});
  };


  useEffect(() => {
    const func = ()=>{
        if(localStorage.getItem("token")!==null)
        navigate("/Input");
    }
    func()
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

  return (
    <div className="container">
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
          
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
            minLength={5}
            
          />
        </div>
        <div className="my-2">
          {credentials.cpassword.length>0&&credentials.password!==credentials.cpassword?"Passwords donot match":""}
        </div>

        <button type="submit" class="btn btn-primary" disabled={credentials.password.length<5 || credentials.cpassword.length<5 ||credentials.password!==credentials.cpassword}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
