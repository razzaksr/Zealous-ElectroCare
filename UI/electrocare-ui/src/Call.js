import axios from "axios"

const backend = "http://localhost:8081/api"

export const fetchOneService = async(id) => {
    const data = await axios.get(`${backend}/services/${id}`)
    return data.data
}

export const fetchServices = async() =>{
    const data = await axios.get(`${backend}/services/`)
    return data.data
}

export const bookings = async(object) => {
    console.log("new booking called")
    const data = await axios.post(`${backend}/bookings/conform`,object)
    return data.data
}

export const viewBookings = async(user) => {
    const data = await axios.get(`${backend}/bookings/by/${user}`)
    return data.data
}

export const closeBooking = async(book) =>{
    const data = await axios.put(`${backend}/bookings/update`,book)
    return data.data
}

export const getInvocieByBookingId = async(booking) =>{
    const data = await axios.get(`${backend}/invoices/${booking}`)
    return data.data
}

export const getBookingById = async(id) =>{
    const data = await axios.get(`${backend}/bookings/${id}`)
    return data.data
}

export const rateTechnician = async(tech,rate) =>{
    const data = await axios.put(`${backend}/technicians/rate/${tech}/${rate}`)
    return data.data
}