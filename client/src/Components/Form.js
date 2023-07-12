import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const Form = () => {

    const initialState=()=>{
        return{
            name:"",
            email:"",
            phone:"",
            gender:"",
            message:""
        }
    }

    const [values,setValues] = useState(initialState())

    const handleSave = () => {
        console.log("Name:", values.name)
        console.log("Email:", values.email)
        console.log("Phone:", values.phone)
        console.log("Gender:", values.gender)
        console.log("Message:", values.message)
    }

    const handleClose = () => {
        setValues(initialState())
    }
    return (
        <div className="container">
            <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
            >
                Add
            </button>

            <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Details Form
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <Col>
                                    <Row>
                                        <label>Name</label>
                                        <input type="text" placeholder="Enter Name" value={values.name} onChange={(e) => setValues({...values, name:e.target.value})} />
                                    </Row>
                                    <Row>
                                        <label>Email</label>
                                        <input type="email" placeholder="Enter Email" value={values.email} onChange={(e) => setValues({...values,email:e.target.value})} />
                                    </Row>
                                    <Row>
                                        <label>Phone Number</label>
                                        <input type="text" placeholder="Enter Phone" value={values.phone} onChange={(e) => setValues({...values,phone:e.target.value})} />
                                    </Row>

                                    <label className="pr-3 pt-3">Gender</label>

                                    <div className="pr-3 pb-3">
                                        <span className="pr-1">Male</span>
                                        <input type="radio" name="gender" checked={values.gender === "male"} value="male" onChange={(e)=>setValues({...values,gender:e.target.value})}/>

                                        <span className="pr-1 pl-3">Female</span>
                                        <input
                                            className="pr-3"
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={values.gender === "female"}
                                            onChange={(e)=>setValues({...values,gender:e.target.value})}
                                        />
                                    </div>

                                    <Row>
                                        <label>Message</label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            placeholder="Enter message"
                                            cols="30"
                                            rows="2"
                                            value={values.message}
                                            onChange={(e)=>setValues({...values,message:e.target.value})}
                                        ></textarea>
                                    </Row>
                                </Col>
                            </form>
                        </div>
                        <div className="modal-footer m-auto">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-success" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
