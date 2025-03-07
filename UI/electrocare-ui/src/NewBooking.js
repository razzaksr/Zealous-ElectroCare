import axios from "axios"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const NewBooking=()=>{

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false); // Controls visibility
    const [correctFormat,setCorrectFormat]=useState("")

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowPicker(false); // Close picker after selection
        setCorrectFormat(new Date(selectedDate.getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 19).replace("T", "T"))
        //console.log(correctFormat)
    };

    const getISTFormattedDate = () => {
        //console.log(correctFormat)
        return new Date(selectedDate.getTime() + 5.5 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 19)
          .replace("T", "T"); // Ensure correct T separator
    };

    const[services,setServices]=useState([])
    const[selectedService,setSelectedService]=useState(0)

    useEffect(()=>{
        loadServices()
        getLocation()
    },[])

    const [location, setLocation] = useState(null);

    const getLocation = async() =>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async(position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
      
                // Send to backend
                await axios.post(`http://localhost:8081/users/update-location`, {
                  "username": "razzaksr", // Replace with actual user ID
                  "latitude":latitude,
                  "longitude":longitude,
                });
              },
              (error) => console.error("Error getting location:", error)
            );
          } else {
            console.error("Geolocation not supported");
          }
    }

    const loadServices = async()=>{
        const temp = await axios.get(`http://localhost:8081/service/`)
        setServices(temp.data)
    }

    const book=async()=>{
        const res = await axios.post(`http://localhost:8081/booking/confirm/razzaksr/${correctFormat}/${selectedService}`)
        console.log(res.data)
    }

    return(
        <>
            {
                services.map((v)=>(
                    <div style={{backgroundColor:'black',color:'white'}}>
                        <p onClick={()=>{
                            setShowPicker(true)
                            setSelectedService(v.serviceId)
                        }}>{v.serviceId}</p>
                        <p>{v.serviceName}</p>
                        <p>{v.price}</p>
                    </div>
                ))
            }
            <div align="center">
                {showPicker&&(<>
                    <h3>Select Date & Time</h3>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                    />
                    </>
                )}
                <p>Selected IST Time: {getISTFormattedDate()}</p>
            </div>
            <button onClick={async()=>await book()}>Book Now!</button>
        </>
    )
}