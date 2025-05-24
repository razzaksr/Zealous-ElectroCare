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
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
// import MarkerClusterGroup from "react-leaflet-markercluster"

export const NewBooking = () =>{
    const {service} = useParams()
    const nav = useNavigate()
    const [res,setRes] = useState()
    const popupRef = useRef();
    const mapRef = useRef();
    const [electricians,setElectricians] = useState([])
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
    const callTechs = async() => {
        const temp = await findNearElectricians(book.latitude,book.longitude)
        setElectricians(temp)
    }
    useEffect(()=>{
        findGeo()
        callTechs()
        // getConfirmation()
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
    // const optimizedMarkers = useMemo(() => (
    //     <MarkerClusterGroup>
    //         {electricians.map((provider) => (
    //             <Marker position={[provider.latitude, provider.longitude]}>
    //                 <Popup>
    //                     <strong>{provider.username}</strong><br />
    //                     Status: <b>{provider.status || "Available"}</b>
    //                 </Popup>
    //             </Marker>
    //         ))}
    //     </MarkerClusterGroup>
    // ), [electricians]);
    return(
        <>
            <div className="alert alert-success row justify-content-center">
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
                    <>
                        <h3>{res}</h3>
                        <button onClick={getConfirmation} className="btn btn-primary">Confirm</button>
                        <div className="col">
                            <div id="map" style={{ width: "100%", height: "500px" }}></div>
                            <div ref={popupRef} className="popup"></div>
                            {/* <MapContainer center={[book.latitude, book.longitude]} zoom={12}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[book.latitude, book.longitude]}>
                                    <Popup>Your Location</Popup>
                                </Marker>
                                {optimizedMarkers}
                            </MapContainer> */}
                            {/* <img className="w-100 d-block h-100" src="https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="img" /> */}
                        </div>
                    </>
                }
            </div>
        </>
    )
}