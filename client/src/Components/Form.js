import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./Form.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createOperation,
  updateOperation,
  getOperationById,
  deleteOperation,
} from "../functions/functions";
import axios from "axios";

const Form = () => {
  const initialState = () => {
    return {
      name: "",
      email: "",
      phone: "",
      gender: "",
      message: "",
    };
  };
  const [editRecordId, setEditRecordId] = useState(null);
  const [values, setValues] = useState(initialState());

  const handleSave = async () => {
    try {
      if (!editRecordId) {
        await createOperation({
          Name: values.name,
          Email: values.email,
          Phone: values.phone,
          Gender: values.gender,
          Message: values.message,
        });

        console.log("Data saved successfully!");
        console.log("Name:", values.name);
        console.log("Email:", values.email);
        console.log("Phone:", values.phone);
        console.log("Gender:", values.gender);
        console.log("Message:", values.message);
        toast.success("Detail Successfully created");
        setValues(initialState());
        fetchData();
      } else {
        await handleUpdate(editRecordId, values);
        console.log("Data updated successfully!");
      }
    } catch (error) {
      console.error("Error while saving data:", error.message);
      toast.error("Failed to save detail");
    }
  };

  const handleUpdate = async (id, values) => {
    try {
      await updateOperation(id, {
        Name: values.name,
        Email: values.email,
        Phone: values.phone,
        Gender: values.gender,
        Message: values.message,
      });
      console.log("Data updated successfully!");
      toast.success("Detail Successfully updated");
      fetchData();
      setValues(initialState());
    } catch (error) {
      console.error("Error while updating data:", error.message);
      toast.error("Failed to update detail");
    }
  };

  const handleDelete = async (_id) => {
    try {
      await deleteOperation(_id);
      fetchData();
      toast.error("Detail successfully deleted");
    } catch (error) {
      console.error("Failed to delete", error.message);
      toast.error("Failed to delete detail");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/excel", {
        method: "POST",
      });

      const blob = await response.blob();

      const downloadLink = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadLink;
      a.download = "data.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(downloadLink);
      toast.success("Excel successfully exported ");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to export excel");
    }
  };

  const handleTog_edit = async (_id) => {
    console.log(_id);
    try {
      const response = await getOperationById(_id);
      console.log("get", response.data.service);
      const data = response.data.service;
      setValues({
        ...values,
        name: data.Name,
        email: data.Email,
        phone: data.Phone,
        gender: data.Gender,
        message: data.Message,
      });

      setEditRecordId(_id); // Set the editRecordId state to the _id
    } catch (error) {
      console.error("Failed to get", error.message);
    }
  };

  const handleClose = () => {
    setValues(initialState());
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/list", {
        skip: 0,
        per_page: 10,
        sorton: "createdAt",
        sortdir: "desc",
        match: "",
      });

      const fetchedData = response.data[0]?.data || [];
      setData(fetchedData);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
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
                    <input
                      type="text"
                      placeholder="Enter Name"
                      value={values.name}
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                    />
                  </Row>
                  <Row className="mt-3">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      value={values.email}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                    />
                  </Row>
                  <Row className="mt-3">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter Phone"
                      value={values.phone}
                      onChange={(e) =>
                        setValues({ ...values, phone: e.target.value })
                      }
                    />
                  </Row>

                  <label className="pr-3 pt-3">Gender</label>

                  <div className="pr-3 pb-3">
                    <span className="pr-1">Male</span>
                    <input
                      type="radio"
                      name="gender"
                      checked={values.gender === "male"}
                      value="male"
                      onChange={(e) =>
                        setValues({ ...values, gender: e.target.value })
                      }
                    />

                    <span className="pr-1 pl-3">Female</span>
                    <input
                      className="pr-3"
                      type="radio"
                      name="gender"
                      value="female"
                      checked={values.gender === "female"}
                      onChange={(e) =>
                        setValues({ ...values, gender: e.target.value })
                      }
                    />
                  </div>

                  <Row className="mt-3">
                    <label>Message</label>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Enter message"
                      cols="30"
                      rows="2"
                      value={values.message}
                      onChange={(e) =>
                        setValues({ ...values, message: e.target.value })
                      }
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
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-success"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          className="btn btn-secondary mt-3 mb-3"
          onClick={handleDownload}
        >
          Export Excel
        </button>
        <h2>Details List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Message</th>
              <th>Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.Gender}</td>
                <td>{item.Message}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary mr-1"
                    // style={{width:"50px" , height:"35px"}}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => handleTog_edit(item._id)}
                  >
                    Edit
                  </button>

                  <button
                    style={{ height: "35px" }}
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;
