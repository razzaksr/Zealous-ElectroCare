import { useEffect, useState } from "react"
import { closeBooking, fetchOneService, getBookingById, getInvocieByBookingId, rateTechnician, viewBookings } from "../Call"
import { Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import jsPDF from "jspdf"
import logo from '../electrocare.png'
import StarRating from "../Components/StarRating"
import payment from '../payment.png'

export const ViewBookings = () =>{
    const [bookings,setBookings] = useState([])
    const [rating,setRating] = useState(0.0)
    const [bill,setBill] = useState(0)
    const nav = useNavigate()
    const callBill = async(which) =>{
        var temp = await fetchOneService(which)
        temp = temp.price + temp.price*0.180
        setBill(temp)
    }
    const handleRate = (rating) => {
        // console.log("Rated:", rating);
        setRating(rating)
    };
    const fetch = async() =>{
        const temp = await viewBookings("rasheedha")
        setBookings(temp)
    }
    useEffect(()=>{
        fetch()
    },[])
    const callClose = async(each) =>{
        // console.log(rating)
        each.status = "DONE"
        const temp = await closeBooking(each)
        if(typeof(temp)=="object"){
            if(typeof(await rateTechnician(each.technician, rating))=="object"){
                alert("Rating done")
                nav("/bookings")
            }
        }
        else
            alert("Not closed")
    }
    const getInvoice = async(each) =>{
        const temp1 = await getInvocieByBookingId(each.bookingId)
        const temp2 = await getBookingById(each.bookingId)

        const doc = new jsPDF({compress:true});
        // Add Logo
        const imgWidth = 30;
        const imgHeight = 15;
        doc.addImage(logo, "PNG", 10, 10, imgWidth, imgHeight);

        // Title
        doc.setFontSize(16);
        doc.text("INVOICE", 105, 30, null, null, "center");

        // Booking Info
        doc.setFontSize(12);
        let y = 40;

        doc.text("Booking Details:", 10, y);
        y += 8;
        doc.text(`Booking ID: ${temp1.bookingId}`, 10, y);
        doc.text(`Status: ${temp2.status}`, 110, y);
        y += 8;
        doc.text(`Booked By: ${temp2.bookedBy}`, 10, y);
        doc.text(`Technician: ${temp2.technician}`, 110, y);
        y += 8;
        doc.text(`Scheduled Date: ${new Date(temp2.scheduledDateTime).toLocaleString()}`, 10, y);
        doc.text(`Service ID: ${temp2.service}`, 110, y);

        // Invoice Info
        y += 15;
        doc.setFontSize(12);
        doc.text("Invoice Details:", 10, y);
        y += 8;
        doc.text(`Invoice ID: ${temp1.invoiceId}`, 10, y);
        doc.text(`Invoice Date: ${new Date(temp1.invoiceDate).toLocaleString()}`, 110, y);
        y += 8;
        doc.text(`Invoice Amount: ₹${temp1.invoiceAmount}`, 10, y);
        doc.text(`Booking Reference: ${temp1.bookingId}`, 110, y);

        // Footer
        y += 20;
        doc.setFontSize(10);
        doc.text("Thank you for choosing our service!", 105, y, null, null, "center");

        // Save
        doc.save("invoice.pdf");

    }
    return(
        <>
            <Container>
                <div className="alert alert-primary">
                    <h1 className="text-center">View your bookings</h1>
                </div>
                <div className="row justify-content-center">
                    {bookings.map((val)=>(
                        <Card className="m-5 rounded-3 shadow text-light" style={{background: 'linear-gradient(to right, var(--bs-green), var(--bs-blue))'}}>
                            <Card.Title><span className="display-6 bi bi-lightning"></span></Card.Title>
                            <Card.Body>
                                <Card.Title><h1>Booking's {val.bookingId}</h1></Card.Title>
                                <Card.Title><h1>{val.service}</h1></Card.Title>
                            </Card.Body>
                            <Card.Body>
                                <p className="float-start display-6">{val.technician}</p>
                                <button className="btn btn-outline-light float-end">{val.status}</button>
                                {
                                    (val.status!="DONE")?
                                    <>
                                        <div className="row justify-content-center align-items-center">
                                            <div className="mb-5 col-4">
                                                <h2>Rate Your Technician</h2>
                                                <StarRating onRate={handleRate} />
                                            </div>
                                            <div onMouseEnter={()=>{
                                                callBill(val.service)
                                            }} className="col-5">
                                                <h1>Pay Your bill</h1>
                                                <h1 className="text-center">{bill}</h1>
                                                <img style={{width:'200px'}} alt="payment" src={payment} className="d-block" />
                                            </div>
                                        </div>
                                        <button onClick={()=>{
                                            callClose(val)
                                        }} className="btn btn-outline-light float-end">Close</button>
                                    </>
                                    :
                                    <>
                                        <button onClick={()=>{
                                            getInvoice(val)
                                        }} className="btn btn-outline-light float-end">Donwload Invoice</button>
                                    </>
                                }
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    )
}