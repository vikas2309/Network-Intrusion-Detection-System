import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles.css"

const Input=()=>{
    let navigate = useNavigate();
    const [filename,setfilename] = useState({FileName:""})
    const [loading, setloading] = useState(false);

    const predictKNN = ()=>{
        document.getElementById('truth').textContent="";
        document.getElementById('Prediction').textContent = "";
        setloading(true);
        const url = `http://localhost:5000/api/auth/predictKNN?Input=${JSON.stringify(filename)}`
        axios.get(url).then(response=>{
            document.getElementById('truth').textContent = response.data.result;
            formatResult();
            setloading(false);
        }).catch(error=>{
            console.log(error)
        })
        
    }
    const predictLDA = ()=>{
        document.getElementById('truth').textContent="";
        document.getElementById('Prediction').textContent = "";
        setloading(true);
        const url = `http://localhost:5000/api/auth/predictLDA?Input=${JSON.stringify(filename)}`
        axios.get(url).then(response=>{
            document.getElementById('truth').textContent = response.data.result;
            formatResult();
            setloading(false);
        }).catch(error=>{
            console.log(error)
        })
        
    }

    const predictAE = ()=>{
        document.getElementById('truth').textContent = "";
        document.getElementById('Prediction').textContent = "";
        setloading(true);
        const url = `http://localhost:5000/api/auth/predictAE?Input=${JSON.stringify(filename)}`
        axios.get(url).then(response=>{
            document.getElementById('truth').textContent = response.data.result;
            formatResult();
            setloading(false);
        }).catch(error=>{
            console.log(error)
        })
        
    }

  
     useEffect(() => {
        const func = ()=>{
            if(localStorage.getItem("token")===null)
            navigate("/login");
        }
        func()
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

    
    const updateFileName=(e)=>{
        setfilename({...filename,[e.target.name]:e.target.value.slice(12)})
    }

    useEffect(() => {
        console.log(filename)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateFileName])
    

    const formatResult = ()=>{
        let result = document.getElementById("truth").textContent.split("\r\n");
        console.log(result)
        document.getElementById("truth").textContent = result[0]
        document.getElementById("Prediction").textContent = result[1]
    }
      
    return(
        <div className="container" style={{fontStyle:"italic"}}>
        <div className="d-flex justify-content-center" style={{paddingTop:"3rem",paddingBottom:"5rem"}}>
            <h2>Choose File for Prediction</h2>
        </div>

        <div className="d-flex justify-content-center" style={{borderStyle: 'dashed',borderRadius: 0,width:"100%"}}>
            <input  id="file-input" type="file" className="btn btn-primary" accept=".txt" name="FileName" onChange={updateFileName}/> 
        </div>

        <div className="d-flex justify-content-center" id="preview" style={{paddingLeft:"100px"}}>
            <div>
                <h6>The uploaded text file should contain the paramaters of a network traffic in the below order</h6>
            </div>        
        </div>

        <div className="d-flex justify-content-center" id="loading">
            <div className="d-flex justify-content-center">
                 <img src={require('D:/Downloads/nids/src/Order.png')} alt="order"/>
            </div>
        </div>

        <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={predictKNN} disabled={filename.FileName===""?true:false}>Predict by KNN</button>
            <button className="btn btn-primary" onClick={predictLDA} disabled={filename.FileName===""?true:false}>Predict by LDA</button>
            <button className="btn btn-primary" onClick={predictAE} disabled={filename.FileName===""?true:false}>Predict by AutoEncoder</button>
        </div>

        <div className="d-flex justify-content-center" id="loading">
            {loading===true?<img src={require('D:/Downloads/nids/src/loading.gif')} alt='loading...'/>:<img src="" alt=""/>}
        </div>
        <div className="d-flex justify-content-center">
            <h5 id="truth">Truth Value</h5>
        </div>

        <div className="d-flex justify-content-center">
            <h5 id="Prediction">Prediction Value</h5>
        </div>

    </div>
    )

}

export default Input;