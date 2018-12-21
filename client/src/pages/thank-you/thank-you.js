import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./thank-you.css";
import Cookies from 'universal-cookie';


class ThankYou extends Component {
    // Setting our component's initial state
    constructor(props) {
        super(props)
        this.state = {
        firstName: "",
        lastName: "",
        emailAddress:"",
        phoneNumber:"",
        guestCount:""
    };
}

    // When the component mounts, load all books and save them to this.state.books
    componentDidMount() {
        this.getCookie();
    }



    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    getCookie() {
        const cookies = new Cookies();
        // if (!cookies.get("demo-requested")){
        //     this.props.history.push("/landing-page");
        // } else{
        console.log(cookies.get("demo-requested"));
        var userData = cookies.get("demo-requested");
        this.setState({firstName:userData.firstName});
        this.setState({lastName: userData.lastName});
        this.setState({emailAddress: userData.emailAddress});
        this.setState({phoneNumber: userData.phoneNumber});
        this.setState({guestCount: userData.guestCount});
        // }
        
    }




    render() {
        return (
            <Container fluid>

                <Row>
                    <Col size="md-12">
                        <div className="thankYouText">
                        <h1 id="thankYouHeader"> Thank you {this.state.firstName}!</h1>
                        <p> A procore event planner will contact you shortly at {this.state.emailAddress} to confirm your RSVP </p>
                        <p> In the meantime, here are some resources to learn more about the event topics </p>
                        </div>

                    </Col>

                </Row>

                <div className="cards">
                <Row>
                    <Col size="md-4">
                        <div className="card">
                            <div className="card-image">
                                <div className="color-overlay"></div>
                                <img className="screenshot" src={require('../../images/card1.jpg')}
                                    alt="Card 1" />
                            </div>
                            <div className="card-text">
                            <div className="eyeBrow">VIDEO</div>
                            <h1>Procore Video Tour</h1>
                            <p>Dive in and see all of our products, explore different processes within the Procore app, and discover how our Customer Success Team works.</p>
                            <br></br>
                                <a target="_blank" href="http://procore.com/tour" rel="noopener noreferrer" className="CTAbutton"> WATCH NOW </a>         
                            </div>                  
                        
                        </div>
                    </Col>                    
                    <Col size="md-4">
                        <div className="card">
                            <div className="card-image">
                                <div className="color-overlay"></div>
                                <img className="screenshot" src={require('../../images/card2.jpg')}
                                    alt="Card 2" />
                            </div>
                            <div className="card-text">
                                <div className="eyeBrow">EBOOK</div>
                                <h1>Construction Software Buyer's Guide</h1>
                                <p>A step-by-step guide to building your software-buying team, assessing your needs as a company, and determining what you want in a solution.</p>
                                <br></br>
                                <a href="https://procore.com/downloads/ebooks/Construction_Software_Buyers_Guide.pdf" target="_blank" rel="noopener noreferrer" className="CTAbutton" download="Construction_Software_Buyers_Guide.pdf"> DOWNLOAD </a>
                               
                            </div>

                        </div>               
                    </Col>
                    <Col size="md-4">
                        <div className="card">
                            <div className="card-image">
                                <div className="color-overlay"></div>
                                <img className="screenshot" src={require('../../images/card3.jpg')}
                                    alt="Card 3" />
                            </div>
                            <div className="card-text">
                                <div className="eyeBrow">EBOOK</div>
                                <h1>Procore Customer Survey: Return on Investment</h1>
                                <p>We surveyed 967 of our clients ranging from small ot medium to enterprise companies, to find out how their projects are running since they started using Procore.</p>
                                <br></br>
                                <a href="https://procore.com/downloads/ebooks/Emerging_ROI_Overview_2018.pdf" target="_blank" rel="noopener noreferrer" className="CTAbutton" download="Emerging_ROI_Overview_2018.pdf"> READ THE REPORT </a>
                            </div>

                        </div>                    
                    </Col>
                </Row>
                </div>


            </Container>
        );
    }
}

export default ThankYou;
