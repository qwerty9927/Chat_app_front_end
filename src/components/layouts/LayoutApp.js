import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import axiosToken from '../../api/axiosToken'
function LayoutApp() {
  useEffect(() => {
    const fetchApi = async () => {
      const result = await axiosToken.get('user/getAll',{
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })
      console.log(result)
    }
    fetchApi()
  })
  return (
    <>
      <h1>hello</h1>
      <Outlet />
    </>
  )
}
export default LayoutApp