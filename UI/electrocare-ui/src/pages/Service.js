import { useEffect, useState } from "react"
import { Card, Container } from "react-bootstrap"
import { fetchServices } from "../Call"

export const Service = () =>{
    const[services,setServices] = useState([])
    useEffect(()=>{
        callFetch()
    },[])
    const callFetch = async() =>{
        const temp = await fetchServices().catch(error=>console.log("Axios error happened ",error))
        setServices(temp)
    }
    return(
        <>
            <Container>
                <div className="alert alert-success">
                    <h1 className="text-center">View Service's</h1>
                </div>
                <div className="row justify-content-evenly">
                    {services.map((val)=>(
                        <Card className="m-1 rounded-4 shadow text-light col-12 col-md-4" style={{background: 'linear-gradient(to right, var(--bs-green), var(--bs-blue))'}}>
                            <Card.Title><span className="bi bi-lightning"></span></Card.Title>
                            <Card.Body>
                                <Card.Title><p>{val.serviceName}</p></Card.Title>
                            </Card.Body>
                            <Card.Body>
                                <p className="float-start">{val.price}</p>
                                <a href={`/book/${val.serviceId}`} className="btn btn-outline-light float-end">Book</a>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    )
}