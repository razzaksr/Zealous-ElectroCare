import { Card, Carousel, Container } from "react-bootstrap"

export const Home = () =>{
    return(
        <>
            <div className="row justify-content-center">
                <Carousel>
                    <Carousel.Item>
                        <img className="w-100" style={{height:'82vh'}} src="https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="img" />
                        <Carousel.Caption>
                            <h3>Professional Electricians at Your Doorstep</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="w-100" style={{height:'82vh'}} src="https://images.pexels.com/photos/2898199/pexels-photo-2898199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img" />
                        <Carousel.Caption>
                            <h3>Book qualified electricians instantly for all your electrical needs. Fast, reliable service at your fingertips.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="w-100" style={{height:'82vh'}} src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img" />
                        <Carousel.Caption className="row justify-content-around">
                            <button className="col-3 btn btn-primary rounded-5">Book Now</button>
                            <button className="col-3 btn btn-primary rounded-5">Emergency Service</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div> 
            <Container>
                <div className="m-5">
                    <h1 className="text-center mb-4">Why Choose Zealous Electrocare?</h1>
                    <div className="row justify-content-evenly">
                        <Card className="mb-2 mb-lg-0 col-12 col-md-6 col-lg-3 me-1 rounded-3 shadow">
                            <Card.Title><span className="display-6 bi bi-check2-circle text-primary"></span></Card.Title>
                            <Card.Body>
                                <Card.Title>Licensed Professionals</Card.Title>
                                <Card.Text>
                                    Our network consists of certified electricians with years of experience in residential and commercial services.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-2 mb-lg-0 col-12 col-md-6 col-lg-3 me-1 rounded-3 shadow">
                            <Card.Title><span className="display-6 bi bi-clock text-success"></span></Card.Title>
                            <Card.Body>
                                <Card.Title>Quick Response</Card.Title>
                                <Card.Text>
                                    Get help within minutes of booking. Our electricians arrive promptly to address your electrical needs.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-2 mb-lg-0 col-12 col-md-6 col-lg-3 me-1 rounded-3 shadow">
                            <Card.Title><span className="display-6 bi bi-lightning-charge text-primary"></span></Card.Title>
                            <Card.Body>
                                <Card.Title>Transparent Pricing</Card.Title>
                                <Card.Text>
                                    Know what you'll pay before booking. No hidden fees or surprises - just honest, upfront pricing.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="m-5">
                    <h1 className="text-center mb-4">Our Services</h1>
                    <h5 className="mb-4 text-center">From simple repairs to complex installations, our electricians have the expertise to handle all your electrical needs.</h5>
                    <div className="row justify-content-evenly">
                        <Card className="mb-2 mb-lg-0 col-12 col-md-6 col-lg-3 me-1 rounded-3 shadow text-light" style={{background: 'linear-gradient(to right, var(--bs-green), var(--bs-blue))'}}>
                            <Card.Title><span className="display-6 bi bi-lightning"></span></Card.Title>
                            <Card.Body>
                                <Card.Title>Electrical Repairs</Card.Title>
                                <Card.Text>
                                    Fix issues with wiring, outlets, circuit breakers, and other electrical components.
                                </Card.Text>
                            </Card.Body>
                            <Card.Body className="row justify-content-between">
                                <p className="col">₹500 - ₹2000</p>
                                <p className="col">30-120 min</p>
                            </Card.Body>
                        </Card>
                        <Card className="mb-2 mb-lg-0 col-12 col-md-6 col-lg-3 me-1 rounded-3 shadow text-light" style={{background: 'linear-gradient(to right, var(--bs-green), var(--bs-blue))'}}>
                            <Card.Title><span className="display-6 bi bi-lightning"></span></Card.Title>
                            <Card.Body>
                                <Card.Title>Lighting Installation</Card.Title>
                                <Card.Text>
                                    Install new light fixtures, ceiling fans, recessed lighting, and more.
                                </Card.Text>
                            </Card.Body>
                            <Card.Body className="row justify-content-between">
                                <p className="col">₹700 - ₹3000</p>
                                <p className="col">60-180 min</p>
                            </Card.Body>
                        </Card>
                        <Card className="mb-2 mb-lg-0 col-12 col-md-6 col-lg-3 me-1 rounded-3 shadow text-light" style={{background: 'linear-gradient(to right, var(--bs-green), var(--bs-blue))'}}>
                            <Card.Title><span className="display-6 bi bi-lightning"></span></Card.Title>
                            <Card.Body>
                                <Card.Title>Home Rewiring</Card.Title>
                                <Card.Text>
                                    Get help within minutes of booking. Our electricians arrive promptly to address your electrical needs.
                                </Card.Text>
                            </Card.Body>
                            <Card.Body className="row justify-content-between">
                                <p className="col">₹500 - ₹2000</p>
                                <p className="col">30-120 min</p>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="text-center"><a href={`/services`} className="btn btn-primary m-5">View All Services</a></div>
                </div>
                <div className="m-5">
                    <h1 className="text-center mb-4">How It Works</h1>
                    <div className="row justify-content-around">
                        <div className="col-12 col-md-3">
                            <div className="alert alert-primary rounded-5 text-center">
                                <h3>1</h3>
                            </div>
                            <h3 className="text-center">Select Service</h3>
                            <p className="text-center">Choose the electrical service you need from our comprehensive list.</p>
                        </div>
                        <div className="col-12 col-md-1">
                            <h1 className="display-6 text-success text-success text-lg-start text-center"><span className="bi bi-chevron-double-right"></span></h1>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="alert alert-primary rounded-5 text-center">
                                <h3>2</h3>
                            </div>
                            <h3 className="text-center">Book Electrician</h3>
                            <p className="text-center">Schedule an appointment or request immediate assistance.</p>
                        </div>
                        <div className="col-12 col-md-1">
                            <h1 className="display-6 text-success text-lg-start text-center"><span className="bi bi-chevron-double-right"></span></h1>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="alert alert-primary rounded-5 text-center">
                                <h3>3</h3>
                            </div>
                            <h3 className="text-center">Problem Solved</h3>
                            <p className="text-center">Our professional electrician arrives and fixes your electrical issues.</p>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="text-light w-100" style={{background: 'linear-gradient(to right, var(--bs-green), var(--bs-blue))'}}>
                <div className="m-5 p-5">
                    <h1 className="text-center mb-4">Ready to Book an Electrician?</h1>
                    <h3 className="text-center mb-4">Get professional electrical services at your doorstep with just a few taps.</h3>
                    <div className="text-center">
                        <a href="/" className="btn btn-outline-light">Book Now</a>
                    </div>
                </div>
            </div>
        </>
    )
}