import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import axiosToken from '../../api/axiosToken'
import SideBar from '../ui/sideBar'
import Menu from '../ui/menu'
import ChatContainer from '../ui/chatContainer'

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
    // fetchApi()
  })
  return (
    <Box sx={{
      'input': {
        color: '#fff'
      }
    }}>
      <Grid container>
        <Grid item xs={0.5}>
          <SideBar />
        </Grid>
        <Grid item xs={3}>
          <Menu />
        </Grid>
        <Grid item xs>
          <ChatContainer />
        </Grid>
      </Grid>
    </Box>
    
  )
}
export default LayoutApp