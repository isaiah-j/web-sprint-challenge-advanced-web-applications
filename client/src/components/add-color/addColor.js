import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import axiosWithAuth from '../../auth/axiosWithAuth'

const AddColor = () => {
    const [formValues, setFormValues] = useState({
        color: '',
        code: ''
    })
    const history = useHistory()

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        console.log(formValues)
    }

    const postColor = (e) => {
        e.preventDefault()
        axiosWithAuth().post('/api/colors', formValues).then(res => history.push('/bubbles')).catch(err => console.log(err))
    }

    return (
        <form onSubmit={postColor}>
            <div className='text-field-container' >
                <TextField onChange={handleChange} value={formValues.color} type='text' label='color' name='color'></TextField>
                <TextField onChange={handleChange} value={formValues.code} type='password' label='code' name='code'></TextField>
                <Button type='submit' color='secondary' variant='contained'>add color</Button>
            </div>
        </form>
    )
}

export default AddColor