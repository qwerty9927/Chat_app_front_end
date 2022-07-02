import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'
import Hidden from '@mui/material/Hidden'
import Divider from '@mui/material/Divider'
import { alpha } from '@mui/material/styles'
import axiosToken from '../../api/axiosToken'
import SideBar from '../ui/SideBar'
import BaseMenu from '../ui/menu/BaseMenu'
import ChatContainer from '../ui/ChatContainer'
import ShowMenu from '../ui/menu/ShowMenu'

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
      <Grid container columns={{ xs: 4, sm: 8, md: 12}}>
        <Grid item xs={0.5} sm={0.5} md={0.5}>
          <SideBar />
        </Grid>
        <Hidden smDown>
          <Grid item xs sm={2} md={3}>
            <ShowMenu />
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Divider orientation="vertical" flexItem 
            sx={{
              '&':{
                borderColor: alpha('#000', 0.8)
              }
            }}
          />
          <ShowMenu responsive />
        </Hidden>
        <Grid item xs sm={5.5} md>
          <ChatContainer />
        </Grid>
      </Grid>
    </Box>
    
  )
}
export default LayoutApp