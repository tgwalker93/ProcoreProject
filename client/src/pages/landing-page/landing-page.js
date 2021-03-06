import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Cookies from 'universal-cookie';
import "./landing-page.css";
class LandingPage extends Component {
    constructor(props){
    super(props)
    this.state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        guestCount: "",
        formErrors: {firstName: "", lastName: "", emailAddress:"", phoneNumber:"", guestCount:""},
        firstNameValid: false,
        lastNameValid: false,
        emailAddressValid: false,
        phoneNumberValid: false,
        guestCountValid: false

    };
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    } 

    validateFields() {
        let fieldValidationErrors = this.state.formErrors;
        let emailAddressValid = this.state.emailAddressValid;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let phoneNumberValid = this.state.phoneNumberValid;
        let guestCountValid = this.state.guestCountValid;

        //Validating email using Regex
        let matchArray = this.state.emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(matchArray !== null) {
            emailAddressValid = true;
        }
        fieldValidationErrors.emailAddress = emailAddressValid ? "" : "Please provide a valid email";

        //Validating First Name by checking if there is anything there.
        firstNameValid = this.state.firstName.length >0;
        fieldValidationErrors.firstName = firstNameValid ? "": "Please provide your first name";

        //Validating Last Name by checking if there is anything there.
        lastNameValid = this.state.lastName.length > 0;
        fieldValidationErrors.lastName = lastNameValid ? "":"Please provide your last name";

        //Validating phone number by checking if there are 16 digits. (counting the special characters besides the digits.)
        phoneNumberValid = this.state.phoneNumber.length===16;
        fieldValidationErrors.phoneNumber = phoneNumberValid ? "":"Please provide a phone number";

        //Validate guest count by checking if user made a selection.
        guestCountValid = true;
        if(this.state.guestCount === "" || this.state.guestCount==="Select"){
            guestCountValid = false;
        }
        fieldValidationErrors.guestCount = guestCountValid ? "": "Please provide guest count";

        this.setState({
            formErrors: fieldValidationErrors,
            emailAddressValid: emailAddressValid,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            phoneNumberValid: phoneNumberValid,
            guestCountValid: guestCountValid
        }, () => {
            this.setCookieAndChangePage();
        });    
    }

    //Here we check if the field has an error. If it does, it will add the "has-error" class to the field.
    //"has-error" is a default bootstrap class that will nicely color the outline of the field red to indicate an error for the user. 
    errorClass(error) {
        return (error.length === 0 ? "" : "has-error");
    }

    //This is used onBlur in order to trim the values. 
    formatInput = (event) => {
        const attribute = event.target.getAttribute('name')
        this.setState({ [attribute]: event.target.value.trim() })
    }

    formatPhone(obj) {
        if(obj == null){
            return;
        }
        var numbers = obj.state.phoneNumber.replace(/\D/g, "").substring(0,10),
            char = { 0: "(", 3: ") ", 6: " - " };
        obj.state.phoneNumber = "";
        for (var i = 0; i < numbers.length; i++) { 
            obj.state.phoneNumber += (char[i] || "") + numbers[i];    
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();    
        this.validateFields();
    };

    setCookieAndChangePage() {

        //This function will be called once all fields are validated. If any are not valid, the binary "valid" variable will be false.
        if (this.state.firstNameValid && this.state.lastNameValid && this.state.emailAddressValid && this.state.phoneNumberValid && this.state.guestCountValid) {

            const cookies = new Cookies();

            var userObj = {
                "firstName": this.state.firstName.charAt(0).toUpperCase() + this.state.firstName.slice(1),
                "lastName": this.state.lastName.charAt(0).toUpperCase() + this.state.lastName.slice(1),
                "emailAddress": this.state.emailAddress,
                "phoneNumber": this.state.phoneNumber,
                "guestCount": this.state.guestCount
            }

            cookies.set("demo-requested", userObj, { path: "/" });
            this.props.history.push("/thank-you");
        }
    }

    render() {
        return (
            <Container id="container" fluid="true">

                <Row id="mainRow">
                    <Col id="textCol" size="sm-6">
                        <img alt="logo" src={require("../../images/logo.jpg")} id="procoreLogo"></img>
                        <h1 id="textColHeader"> <strong>Pssst… can you keep a secret? </strong></h1>
                        <div id="textColP">
                            <br />
                        <p> Something unexpected is in the works between Assemble and Procore and we have a feeling it is about to make you insanely happy. </p>
                         <br />
                        <p> <strong> Join us at an exclusive dinner to get the scoop before anyone else… </strong></p>
                        <br />                       
                        <p> Here are the details:</p>
                        <p>What: Complimentary dinner and drinks with an announcement by Procore and Assemble</p>
                        <p>Venue: Guard and Grace</p>
                        <p>Address: Guard and Grace, 1801 California St, Denver, CO 80202</p>
                        <p id="lastP">Date: Monday, August 21 st Time: 6: 30 PM </p>
                        </div>
                    </Col>
                    <hr id="hline"></hr>
                    <Col id="formCol" size="sm-6">
                        <h1 id="formHeader">RSVP Here</h1>
                        <form>
                        <p>First Name</p>
                        <Input onBlur={this.formatInput.bind(this)} isvalid={this.state.firstNameValid.toString()} fielderror={this.state.formErrors.firstName} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.firstName)}`} value={this.state.firstName} id="firstName" onChange={this.handleChange.bind(this)} name="firstName"></Input>


                        <p>Last Name</p>
                        <Input onBlur={this.formatInput.bind(this)} isvalid={this.state.lastNameValid.toString()} fielderror={this.state.formErrors.lastName} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.lastName)}`} value={this.state.lastName} id="lastName" onChange={this.handleChange.bind(this)} name="lastName"></Input>

                        <p>Email Address</p>
                        <Input onBlur={this.formatInput.bind(this)}isvalid={this.state.emailAddressValid.toString()} fielderror={this.state.formErrors.emailAddress} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.emailAddress)}`} value={this.state.emailAddress} id="emailAddress" onChange={this.handleChange.bind(this)} name="emailAddress"></Input>


                        <p>Phone Number</p>
                        <Input onBlur={this.formatPhone(this)} isvalid={this.state.phoneNumberValid.toString()} fielderror={this.state.formErrors.phoneNumber} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.phoneNumber)}`} value={this.state.phoneNumber} id="phoneNumber" onChange={this.handleChange.bind(this)} name="phoneNumber"></Input>
                       
                        <p>Besides yourself, how many guests will be attending?</p>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.guestCount)}`}>
                        <select className="form-control" value={this.state.guestCount} id="guestCount" onChange={this.handleChange.bind(this)}>
                            <option value={null}>Select</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5+">5+</option>
                        </select>
                        {this.state.guestCountValid ? "" : <span className="help-block">{this.state.formErrors.guestCount}</span>}
                        </div>                  
                        <FormBtn onClick={this.handleFormSubmit.bind(this)}> RSVP </FormBtn>
                        </form>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default LandingPage;
