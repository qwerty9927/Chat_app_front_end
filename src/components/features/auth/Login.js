import clsx from 'clsx'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import * as request from '../../../api/axiosAuth'
import { login, selectState, increment } from "./authSlice"
import style from './css/auth.module.scss'

export default function Login() {
  const user = useSelector(selectState)
  const dispatch = useDispatch()
  console.log(user)
  const [formValues, setFormValues] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formValues.username)
    if(!formValues.username){
      setFormErrors({username: "Username is required"})
      return false
    }
    if(!formValues.password){
      setFormErrors({password: "Password is required"})
      return false
    }
    setFormErrors({})
    dispatch(login(formValues))
  }

  return (
    <form onSubmit={handleSubmit}>      
      <div className={style.auth}>
        <label htmlFor=""><h1>Login</h1></label>
        <div className={clsx(style.item_input)}>
          <div>
            <div>
              <i className="fas fa-user"></i>
            </div>
            <input name="username" type="text" placeholder="Username" onChange={handleChange} />
          </div>
          <p>{formErrors.username}</p>
        </div>
        <div className={clsx(style.item_input)}>
          <div>
            <div>
              <i className="fas fa-lock"></i>
            </div>
            <input name="password" type="text" placeholder="Password" onChange={handleChange} />
          </div>
          <p>{formErrors.password}</p>
        </div>
        <div className={style.button}>
          <button type="submit">
            {user.isFetching ? (<div></div>) : null}
            Sign in
          </button>
        </div>
        <div>
          <span>Not a member</span>
          <Link to="/resgister">Sign up now</Link>
        </div>
      </div>
    </form>
  )
}
