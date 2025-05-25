import { useState } from "react"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { callLogin } from "../Call"
import { jwtDecode } from 'jwt-decode'

export const Login = () => {
    const nav = useNavigate()
    const[request,setRequest] = useState({
        "username":"",
        "password":""
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
        try{
            const temp = await callLogin(request)
            if (typeof(temp)=="string"){
                localStorage.setItem("logged",temp)
                const decode = jwtDecode(temp)
                localStorage.setItem("username",decode.sub)
                // nav("/")
                window.location.assign("/")
            }
            else
                alert("invalid login")
        }
        catch(err){
            nav("/error/401")
        }
    }
    const onCancel = () =>{
        setRequest({
            "username":"",
            "password":""
        })
    }
    return(
        <>
            <Container>
                <div className="alert alert-primary">
                    <h1 className="text-center">Login and start booking electrician in the leading booking app</h1>
                    <div className="row justify-content-center align-items-center p-4 shadow-lg">
                        <div className="form group">
                            <label>User name</label>
                            <input onChange={gather} value={request.username} type="text" name="username" placeholder="Enter user name" className="form-control" />
                        </div>
                        <div className="form group">
                            <label>Password</label>
                            <input onChange={gather} value={request.password} type="password" name="password" placeholder="Enter password" className="form-control" />
                        </div>
                        <div className="mt-4 row justify-content-around">
                            <button onClick={onSumbit} className="col-md-1 col-2 btn btn-outline-primary">
                                <span className="bi bi-box-arrow-up-right" ></span>
                            </button>
                            <button onClick={onCancel} className="col-md-1 col-2 btn btn-outline-danger">
                                <span className="bi bi-x-circle-fill"></span>
                            </button>
                        </div>
                        <a href={`/signup`} className="col-md-2 col-12 btn btn-outline-success">Want to signup</a>
                    </div>
                </div>
            </Container>
        </>
    )
}