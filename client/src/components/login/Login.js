import React, { useState } from "react";
import { TextField, Button } from '@material-ui/core'
import './Login-styles.scss'
import axiosWithAuth from '../../auth/axiosWithAuth'
import { useHistory } from 'react-router-dom'


const INITIAL_VALUES = {
  username: 'Lambda School',
  password: 'i<3Lambd4'
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory()

  const [formValues, setFormValues] = useState(INITIAL_VALUES)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    console.log(formValues)
  }

  const login = async (e) => {
    e.preventDefault()
    try {
      let res = await axiosWithAuth().post('/api/login', formValues)
      let token = res.data.payload
      localStorage.setItem('token', token)
      history.push('/bubbles')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={login}>
      <div className='text-field-container' onChange={handleChange}>
        <TextField value={formValues.username} type='text' label='username' name='username'></TextField>
        <TextField value={formValues.password} type='password' label='password' name='password'></TextField>
        <Button type='submit' color='secondary' variant='contained'>Login</Button>
      </div>
    </form>
  );
};

export default Login;
