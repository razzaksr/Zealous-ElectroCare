import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { bookings, findNearElectricians } from "../Call"
import { Card } from "react-bootstrap"
import TileLayer from "ol/layer/Tile"
import { OSM } from "ol/source"
import { Feature, Map, Overlay, View } from "ol"
import { Point } from "ol/geom"
import Style from "ol/style/Style"
import Icon from "ol/style/Icon"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"

export const NewBooking = () =>{
    const {service} = useParams()
    const nav = useNavigate()
    const [res,setRes] = useState()
    const popupRef = useRef();
    const mapRef = useRef();
    const [electricians,setElectricians] = useState([])
    const [book,setBook] = useState({
        "bookingBy":localStorage.getItem("username"),
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
    const callTechs = async() => {
        try{
            const temp = await findNearElectricians(book.latitude,book.longitude)
            setElectricians(temp)
        }
        catch(err){
            nav("/error/401")
        }
    }
    useEffect(()=>{
        findGeo()
        callTechs()
    },[])
    useEffect(() => {
        if (book.latitude && !mapRef.current) {
        const map = new Map({
            target: "map",
            layers: [new TileLayer({ source: new OSM() })],
            view: new View({ center: [book.longitude, book.latitude], zoom: 12, projection: "EPSG:4326" }),
        });
        mapRef.current = map;

        const createMarker = (lon, lat, icon) => {
            const marker = new Feature(new Point([lon, lat]));
            marker.setStyle(new Style({ image: new Icon({ src: icon, scale: 0.1 }) }));
            return marker;
        };

        const userMarker = createMarker(book.longitude, book.latitude, "https://cdn-icons-png.flaticon.com/512/64/64054.png");
        map.addLayer(new VectorLayer({ source: new VectorSource({ features: [userMarker] }) }));

        const providerMarkers = electricians.map(p => {
            const feature = createMarker(p.longitude, p.latitude, "https://cdn-icons-png.flaticon.com/512/847/847969.png");
            feature.set("providerDetails", p);
            return feature;
        });

        map.addLayer(new VectorLayer({ source: new VectorSource({ features: providerMarkers }) }));
        
        const popup = new Overlay({ element: popupRef.current, positioning: "bottom-center", stopEvent: false });
        map.addOverlay(popup);

        map.on("singleclick", event => {
            const feature = map.forEachFeatureAtPixel(event.pixel, f => f);
            if (feature?.get("providerDetails")) {
            const { username, avgRating } = feature.get("providerDetails");
            popupRef.current.innerHTML = `<strong>${username}</strong><br>Rating: ${avgRating}`;
            popup.setPosition(event.coordinate);
            }
        });
        }
    }, [book]);

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
            <div className="alert alert-success row justify-content-center">
                {
                    (typeof(res)==="object")?
                    <>
                        <Card className="col-md-7 col-12 m-5 rounded-3 shadow text-light" style={{background: 'linear-gradient(to right, var(--bs-green), var(--bs-blue))'}}>
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
                    <>
                        <h3>{res}</h3>
                        <button onClick={getConfirmation} className="btn btn-primary">Confirm</button>
                        <div className="col-12">
                            <div id="map" style={{ width: "100%", height: "500px" }}></div>
                            <div ref={popupRef} className="popup"></div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}