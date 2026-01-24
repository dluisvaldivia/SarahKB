import React, { useState } from 'react';
import { LuSend } from "react-icons/lu";


export default function Contact() {
    const [inputName, setInputName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputMessage, setInputMessage] = useState('')
    const [formStatus, setFormStatus] = useState('')

    const validateForm = (event) => {
        event.preventDefault(); // Prevent form submission

        if (!inputName.trim()) {
            setFormStatus("Please enter your name.");
            return false;
        }

        if (!inputEmail.trim()) {
            setFormStatus("Please enter your email.");
            return false;
        }

        if (!inputMessage.trim()) {
            setFormStatus("Please enter a message.");
            return false;
        }

        setFormStatus(""); // Clear any previous error messages
        return true; // Form is valid
    };

    const handleSubmit = (event) => {
        if (validateForm(event)) {
            // Proceed with form submission
            event.target.submit();
        }
    };

    return (
        <div className="container contacts-container mb-5 pb-5 mt-4">
            <div className="row my-3 d-flex justify-content-center">
                <div className="col-11 col-md-6">

                    {/* Display alert message if formStatus is not empty */}
                    {formStatus && (
                        <div className="alert alert-danger text-center" role="alert">
                            {formStatus}
                        </div>
                    )}

                    <form name="contactForm" action="https://formsubmit.co/23000dbf4f026d79ed1bba2722c601aa" method="POST" onSubmit={handleSubmit}>

                        <h1 className='text-center'>Let's chat</h1>

                        <div className="form-group mb-3 mt-3">
                            <label name="contactName" htmlFor="contact.name" className="form-label">What's your name?</label>
                            <input type="text" className="form-control" name="name" id="contact.name" value={inputName} onChange={(e) => setInputName(e.target.value)} />
                        </div>

                        <div className="form-group mb-3">
                            <label name="contactEmail" htmlFor="contact.email" className="form-label">What's your email?</label>
                            <input type="email" className="form-control" name="email" id="contact.email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label name="contactMessage" htmlFor="contact.message">What do you want to talk about?</label>
                            <textarea name="message" type="text" className="form-control" id="contact.message" rows="5" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}></textarea>
                            <input type="hidden" name="_url" value="https://thatsveryadhd.com"/>
                        </div>

                        <div className="form-group d-flex justify-content-center">
                            <button type="submit" className="btn-secondary mt-3">send <LuSend />

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )


}