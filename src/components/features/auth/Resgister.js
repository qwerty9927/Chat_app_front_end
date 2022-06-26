import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectState, resgister } from './authSlice'
import style from './css/auth.module.scss'

export default function Resgister(){
  const navigate = useNavigate()
  const user = useSelector(selectState)
  const dispatch = useDispatch()
  const [formValues, setFormValues] = useState({})
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    if(user.isSuccess){
      alert("Resgister success")
      navigate("/")
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({...formValues, [name]: value })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const error = {}
    if(!formValues.username){
      error.username = "Username is required"
      setFormErrors(error)
      return false
    }
    if(!formValues.password){
      error.password = "Password is required"
      setFormErrors(error)
      return false
    } else if(formValues.password.length < 8){
      error.password = "Password must more than 8"
      setFormErrors(error)
      return false
    }
    if(!formValues.repass){
      error.repass = "Re-pass is required"
      setFormErrors(error)
      return false
    } else if(formValues.repass !== formValues.password){
      error.repass = "Re-pass doesn't match with password"
      setFormErrors(error)
      return false
    }
    if(!formValues.name){
      error.name = "Name is required"
      setFormErrors(error)
      return false
    }
    setFormErrors(error)
    dispatch(resgister(formValues))
  }

  return (
    <form onSubmit={(e) => {handleSubmit(e)}}>
      <div className={style.auth}>
        <label htmlFor=""><h1>Resgister</h1></label>
        <p>{user.isError ? "Account existed" : null}</p>
        <div className={clsx(style.item_input)}>
          <div>
            <div>
              <i className="fas fa-user"></i>
            </div>
            <input name="username" type="text" placeholder="Username" onChange={(e) => {handleChange(e)}} />
          </div>
          <p>{formErrors.username}</p>
        </div>
        <div className={clsx(style.item_input)}>
          <div>
            <div>
              <i className="fas fa-lock"></i>
            </div>
            <input name="password" type="text" placeholder="Password" onChange={(e) => {handleChange(e)}} />
          </div>
          <p>{formErrors.password}</p>
        </div>
        <div className={clsx(style.item_input)}>
          <div>
            <div>
              <i className="fas fa-lock"></i>
            </div>
            <input name="repass" type="text" placeholder="Re-Password" onChange={(e) => {handleChange(e)}} />
          </div>
          <p>{formErrors.repass}</p>
        </div>
        <div className={clsx(style.item_input)}>
          <div>
            <div>
              <i className="fas fa-signature"></i>
            </div>
            <input name="name" type="text" placeholder="Name of Account" onChange={(e) => {handleChange(e)}} />
          </div>
          <p>{formErrors.name}</p>
        </div>
        <div className={style.button}>
          <button type="submit">
            {user.isFetching ? <div></div> : null}
            Sign up
          </button>
        </div>
        <div>
          <span>Is a member</span>
          <Link to="/">Sign in now</Link>
        </div>
      </div>
    </form>
  )
}
