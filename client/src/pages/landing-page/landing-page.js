import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./landing-page.css";
class LandingPage extends Component {
    // Setting our component's initial state
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


    // Handles updating component state when the user types into the input field
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }   


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailAddressValid = this.state.emailAddressValid;
        let passwordValid = this.state.passwordValid;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let phoneNumberValid = this.state.phoneNumberValid;
        let guestCountValid = this.state.guestCountValid;

        switch (fieldName) {
            case "emailAddress":
                emailAddressValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.emailAddress = emailAddressValid ? "" : "Please provide a valid email";
                break;
            case "firstName":
                firstNameValid = value.length >0;
                fieldValidationErrors.firstName = firstNameValid ? "": "Please provide your first name";
                break;
            case "lastName":
                lastNameValid = value.length > 0;
                fieldValidationErrors.lastName = lastNameValid ? "":"Please provide your last name";
                break;
            case "phoneNumber":
                phoneNumberValid = value.length===16;
                fieldValidationErrors.phoneNumber = phoneNumberValid ? "":"Please provide a phone number";
                break;
            case "guestCount":
                guestCountValid = true;
                if(value === "" || value==="Select"){
                    guestCountValid = false;
                }
                fieldValidationErrors.guestCount = guestCountValid ? "": "Please provide guest count";
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailAddressValid: emailAddressValid,
            passwordValid: passwordValid,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            phoneNumberValid: phoneNumberValid,
            guestCountValid: guestCountValid
        }, this.validateForm);

       
    }


    errorClass(error) {
        return (error.length === 0 ? "" : "has-error");
    }
    trimField(fieldName, obj) {
        switch (fieldName) {
            case "firstName":
                obj.state.firstName = obj.state.firstName.trim();
                break;
            case "lastName":
                obj.state.lastName = obj.state.lastName.trim(); 
                break;
            case "emailAddress":
                obj.state.emailAddress = obj.state.emailAddress.trim();       
                break;
            default:
                break;
        }      
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
        this.validateField("firstName", this.state.firstName);
        this.validateField("lastName", this.state.lastName);
        this.validateField("emailAddress", this.state.emailAddress);
        this.validateField("phoneNumber", this.state.phoneNumber);
        this.validateField("guestCount", this.state.guestCount);


        if(this.state.firstName && this.state.lastName && this.state.emailAddress && this.state.phoneNumber && this.state.guestCount){
            
        const cookies = new Cookies();

        var userObj = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "emailAddress": this.state.emailAddress,
            "phoneNumber": this.state.phoneNumber,
            "guestCount": this.state.guestCount
        }

        cookies.set("demo-requested", userObj, { path: "/thank-you" });
        this.props.history.push("/thank-you");

    } 
    };

    render() {
        return (
            <Container fluid>

                <Row id="mainRow">
                    <Col size="md-6">
                        <img alt="Styleguide" src="https://prcmkt.com/styleguide/images/procore_logo_fc_k.jpg"></img>
                        <h1> Pssst… can you keep a secret ? </h1>
                        <p> Something unexpected is in the works between Assemble and Procore and we have a feeling it is about to make you insanely happy. </p>
                        <p> <strong> Join us at an exclusive dinner to get the scoop before anyone else… </strong></p>
                        <p> Here are the details:</p>
                        <p>What: Complimentary dinner and drinks with an announcement by Procore and Assemble</p>
                        <p>Venue: Guard and Grace Address: Guard and Grace, 1801 California St, Denver, CO 80202</p>
                        <p>Date: Monday, August 21 st Time: 6: 30 PM </p>
                    </Col>
                    <Col size="md-6">
                        <h1>RSVP Here</h1>
                        <form>
                        <p>First Name</p>
                        <Input onBlur={this.trimField("firstName", this)} isvalid={this.state.firstNameValid.toString()} fielderror={this.state.formErrors.firstName} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.firstName)}`} value={this.state.firstName} id="firstName" onChange={this.handleChange.bind(this)} name="firstName"></Input>


                        <p>Last Name</p>
                        <Input onBlur={this.trimField("firstName", this)} isvalid={this.state.lastNameValid.toString()} fielderror={this.state.formErrors.lastName} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.lastName)}`} value={this.state.lastName} id="lastName" onChange={this.handleChange.bind(this)} name="lastName"></Input>

                        <p>Email Address</p>
                        <Input onBlur={this.trimField("firstName", this)}isvalid={this.state.emailAddressValid.toString()} fielderror={this.state.formErrors.emailAddress} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.emailAddress)}`} value={this.state.emailAddress} id="emailAddress" onChange={this.handleChange.bind(this)} name="emailAddress"></Input>


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


                        
                        <FormBtn onClick={this.handleFormSubmit}> RSVP </FormBtn>
                        </form>
                    </Col>

                </Row>




            </Container>
        );
    }
}

export default LandingPage;
