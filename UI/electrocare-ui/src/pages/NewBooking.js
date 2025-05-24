import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { bookings } from "../Call"
import { Card } from "react-bootstrap"

export const NewBooking = () =>{
    const {service} = useParams()
    const nav = useNavigate()
    const [res,setRes] = useState()
    const [book,setBook] = useState({
        "bookingBy":"rasheedha",
        "service":service,
        "latitude":0.0, 
        "longitude":0.0
    })
    const findGeo = () =>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setBook((old)=>{
                        return{
                            ...old,
                            latitude:position.coords.latitude,
                            longitude:position.coords.longitude,
                        }
                    })
                // setLocation({
                //     lat: position.coords.latitude,
                //     lon: position.coords.longitude
                // });
                },
                (err) => {
                    console.log(err.message);
                }
            );
            } 
            else {
                console.log("Geolocation is not supported by this browser.");
        }
    }
    const callBook = async() =>{
        const temp = await bookings(book);
        setRes(temp)
    }
    useEffect(()=>{
        findGeo()
        getConfirmation()
    },[])

    const getConfirmation = () =>{
        if(window.confirm("confirm to book service ")){
            callBook()
        }
        else{
            nav("/services")
        }
    }
    
    return(
        <>
            
            <div className="alert alert-success">
                {
                    (typeof(res)==="object")?
                    <>
                        <Card className="m-5 rounded-3 shadow text-light" style={{background: 'linear-gradient(to right, var(--bs-green), var(--bs-blue))'}}>
                            <Card.Title><span className="display-6 bi bi-lightning"></span></Card.Title>
                            <Card.Body>
                                <Card.Title><h1>Booking Confirmed</h1></Card.Title>
                                <Card.Title><h1>{res.service}</h1></Card.Title>
                            </Card.Body>
                            <Card.Body>
                                <p className="float-start display-6">{res.fullName}</p>
                                <button className="btn btn-outline-light float-end">{res.mobile}</button>
                            </Card.Body>
                        </Card>
                    </>
                    :
                    <h3>{res}</h3>
                }
            </div>
        </>
    )
}