import React, {
  useState
} from 'react';
import axios from 'axios';
import {
  ToastContainer,
  toast
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '../layouts/Layout.js';
import { isAuth } from './helpers.js';
import { Redirect } from 'react-router';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Register'
  });

  // Destructure from values state
  const { name, email, password, buttonText } = values;

  // Handle value changes with state changes and events
  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  }

  // Handle form submit change events and send through API
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Registering'});

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/Register`,
      data: {name, email, password}
    }).then(response => {
      console.log('Registration success', response);
      setValues({...values, name: '', email: '', password: '', buttonText: 'Register'});
      toast.success(response.data.message);
    }).catch(error => {
      console.error('Registration Error', error.response.data);
      setValues({...values, buttonText: 'Register'});
      toast.error(error.response.data.error);
    });
  }

  const registerForm = () => (
    <form>
      <div className="form-group mb-1">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} value={name} type="text" className="form-control" placeholder="Please enter your full name." />
      </div>
      <div className="form-group mb-1">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} value={email} type="text" className="form-control" placeholder="Please enter your valid email." />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <div className="input-group mb-3">
          <input onChange={handleChange('password')} value={password} type="text" className="form-control" placeholder="Please use a password 6 to 16 characters long." aria-label="Password" />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">View Password</button>
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-primary" onClick={(event) => handleSubmit(event)}>{buttonText}</button>
      </div>
    </form>
  )

  return(
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="p-5 text-center">Register</h1>
        {registerForm()}
      </div>
    </Layout>
  )
}

export default Register;