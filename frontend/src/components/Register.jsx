// http://104.211.219.98/train/register

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
  const [credentials, setCredentials] = useState({ ownerName: "",companyName:"",rollNo:"", ownerEmail: "", accessCode: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    const host="http://104.211.219.98";
    e.preventDefault();
    const { ownerName, companyName,rollNo,ownerEmail, accessCode } = credentials;
    const response = await fetch(`${host}/train/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ownerName,companyName, rollNo,ownerEmail, accessCode })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Acount Created Successfully", 'success');
    } else {
      props.showAlert("Invalid Details", 'danger');
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Login-Img"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h1>Register</h1>
              <form onSubmit={handleSubmit}>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4 my-2">
                  <label className="form-label" htmlFor="companyName">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="form-control form-control-lg"
                    onChange={onChange}
                  />
                </div>
                <div className="form-outline mb-4 my-2">
                  <label className="form-label" htmlFor="name">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-lg"
                    onChange={onChange}
                  />
                </div>

                <div className="form-outline mb-4 my-2">
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email nor password with anyone else.
                  </div>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-md btn-block my-2"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register