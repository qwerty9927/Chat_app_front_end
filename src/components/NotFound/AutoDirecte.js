import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
function AutoDirecte(){
  const navigate = useNavigate()
  console.log("abcd")
  useEffect(() => {
    navigate('/')

  })
}

export default AutoDirecte