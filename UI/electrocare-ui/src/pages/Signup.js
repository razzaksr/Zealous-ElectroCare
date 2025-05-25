import { useState } from "react"
import { Container } from "react-bootstrap"
import { callSignUp } from "../Call"
import { useNavigate } from "react-router-dom"

export const Signup = () =>{
    const nav = useNavigate()
    const [request,setRequest] = useState({
        "mobile":0,
        "username":"",
        "fullName":"",
        "role":"",
        "password":"",
        "email":""
    })
    const gather = (eve) =>{
        const{name,value} = eve.target
        setRequest((old)=>{
            return{
                ...old,
                [name]:value
            }
        })
    }
    const onSumbit = async() =>{
        // alert(JSON.stringify(request))
        const temp = await callSignUp(request)
        if (typeof(temp)=="object")
            nav("/")
        else
            alert("invalid signup")
    }
    const onCancel = () =>{
        setRequest({
            "mobile":0,
            "username":"",
            "fullName":"",
            "role":"",
            "password":"",
            "email":""
        })
    }
    return(
        <>
            <Container>
                <div className="alert alert-primary">
                    <h1 className="text-center">Signup and experience the leading electrician booking app</h1>
                    <div style={{height:'70vh'}} className="row justify-content-center align-items-center p-4 shadow-lg">
                        <div className="form group">
                            <label>Full Name</label>
                            <input onChange={gather} value={request.fullName} type="text" name="fullName" placeholder="Enter full name" className="form-control" />
                        </div>
                        <div className="form group">
                            <label>Mobile Number</label>
                            <input onChange={gather} value={request.mobile} type="tel" name="mobile" placeholder="Enter mobile number" className="form-control" />
                        </div>
                        <div className="form group">
                            <label>Email </label>
                            <input onChange={gather} value={request.email} type="email" name="email" placeholder="Enter email id" className="form-control" />
                        </div>
                        <div className="form group">
                            <label>User name</label>
                            <input onChange={gather} value={request.username} type="text" name="username" placeholder="Enter user name" className="form-control" />
                        </div>
                        <div className="form group">
                            <label>Password</label>
                            <input onChange={gather} value={request.password} type="password" name="password" placeholder="Enter password" className="form-control" />
                        </div>
                        <div className="form group">
                            <label className="form-check-inline">Role</label>
                            <input onChange={gather} type="radio" name="role" value="customer" className="form-check-input"/>Customer&nbsp;&nbsp;
                            <input onChange={gather} type="radio" name="role" value="technician" className="form-check-input"/>Technician
                        </div>
                        <div className="mt-4 row justify-content-around">
                            <button onClick={onSumbit} className="col-md-1 col-2 btn btn-outline-primary">
                                <span className="bi bi-person-fill-add" ></span>
                            </button>
                            <button onClick={onCancel} className="col-md-1 col-2 btn btn-outline-danger">
                                <span className="bi bi-x-circle-fill"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}