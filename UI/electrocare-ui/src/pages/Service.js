import { useEffect, useState } from "react"
import { Card, Container } from "react-bootstrap"
import { fetchServices } from "../Call"

export const Service = () =>{
    const[services,setServices] = useState([])
    useEffect(()=>{
        callFetch()
    },[])
    const callFetch = async() =>{
        const temp = await fetchServices()
        setServices(temp)
    }
    return(
        <>
            <Container>
                <div className="alert alert-success">
                    <h1 className="text-center">View Service's</h1>
                </div>
                <div className="row justify-content-center">
                    {services.map((val)=>(
                        <Card className="m-5 rounded-3 shadow text-light" style={{background: 'linear-gradient(to right, var(--bs-green), var(--bs-blue))'}}>
                            <Card.Title><span className="display-6 bi bi-lightning"></span></Card.Title>
                            <Card.Body>
                                <Card.Title><h1>{val.serviceName}</h1></Card.Title>
                            </Card.Body>
                            <Card.Body>
                                <p className="float-start display-6">{val.price}</p>
                                <a href={`/book/${val.serviceId}`} className="btn btn-outline-light float-end">Book</a>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    )
}