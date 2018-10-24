import React, { Component } from "react"

import Page from "../Page"
import styles from "./index.css"
import './alert.global.css';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      alert: {
        show: false,
        type: '',
        text: ''
      }
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, event) {
    this.setState({[key]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // check that all fields have values
    if (this.state.name == '' || this.state.email == '' || this.state.message == '') {
      this.setState({ alert: { show: true, type: 'danger', text: 'Please fill out all fields.'} })
      return;
    }

    this.setState({
      alert: { show: true, type: 'info', text: 'Sending...'},
      submitted: true}, this.submitForm(this.state.name, this.state.email, this.state.message))
  }

  submitForm(name, email, message){
    var destinationEmail = "ccgcsurrey@gmail.com";
    var form = document.createElement('form');
    form.setAttribute("action", "https://formspree.io/" + destinationEmail)
    form.setAttribute("method", "POST")

    // Subject for your email
    var field = document.createElement("input");
    field.setAttribute("type", "hidden");
    field.setAttribute("name", "_subject");
    field.setAttribute("value", "Contact form submitted");
    form.appendChild(field);

    // Contact email address        
    field = document.createElement("input");
    field.setAttribute("type", "hidden");
    field.setAttribute("name", "email");
    field.setAttribute("value", email);
    form.appendChild(field);

    // Your user's name
    field = document.createElement("input");              
    field.setAttribute("type", "hidden");
    field.setAttribute("name", "name");
    field.setAttribute("value", name);
    form.appendChild(field);

    // The text message
    field = document.createElement("input");              
    field.setAttribute("type", "hidden");
    field.setAttribute("name", "message");
    field.setAttribute("value", message);
    form.appendChild(field);

    document.body.appendChild(form);    
    form.submit();
  }

  sendFormData(json) {

    // Send the form data.
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://formspree.io/alankim08@gmail.com', true);
    xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.setRequestHeader('Content-Type', 'application/json');

    xmlhttp.send(json);

    var _this = this;
    xmlhttp.onreadystatechange = function() {
      // <4 =  waiting on response from server
      if (xmlhttp.readyState < 4)
        _this.setState({ alert: { show: true, type: 'info', text: 'Loading...'} })
      // 4 = Response from server has been completely loaded.
      else if (xmlhttp.readyState === 4) {
        // 200 - 299 = successful
        if ( xmlhttp.status === 200 && xmlhttp.status < 300 ) {
          _this.setState({ alert: { show: true, type: 'success', text: 'Your message has been sent!'},
                            name: '', email: '', message: '' });
        }
        else {
          _this.setState({ alert: { show: true, type: 'danger', text: 'Sorry, there has been an error. Please send your message to ccgcsurrey@gmail.com'} });
        }
      }
    };
  }

  render() {
    const location = '素里中国福音教会';
    const address = '16870 80 AVE. Surrey, BC V4N 5A1';
    const mapIframe = `<iframe
                width="100%"
                height="300"
                frameborder="0" style="border:0"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDzq49VRIOq9h7ykw2GiwJrXW-zdKGQHVM
                  &q=` + encodeURIComponent(location +', '+ address) + `" allowfullscreen>
              </iframe>`;
    return (
      <div>
        <Page
          { ...this.props }
        >
          <div className={ styles.mapContainer } dangerouslySetInnerHTML={{
            __html: mapIframe
          }} />
          <form
            className={ styles.contactForm }
            onSubmit={this.handleSubmit}
            method="POST">

            { this.state.alert.show &&
              <div className={ styles.alert  + ' alert-' + this.state.alert.type }>
                { this.state.alert.text }
              </div>
            }

            <div className={ styles.formGroup }>
              <label>Name:</label>
              <input type="text" value={this.state.name} name="name" placeholder="Your name" onChange={this.handleChange.bind(this, 'name')} required />
            </div>
            <div className={ styles.formGroup }>
              <label>Email:</label>
              <input type="email" value={this.state.email} name="email" placeholder="Your email" onChange={this.handleChange.bind(this, 'email')} required />
            </div>
            <div className={ styles.formGroup }>
              <label>Message:</label>
              <textarea value={this.state.message} name="message" placeholder="Your message" onChange={this.handleChange.bind(this, 'message')} required  />
            </div>
            <input type="submit" value="Send" />
          </form>

        </Page>
      </div>
    );
  }
}

export default Contact
