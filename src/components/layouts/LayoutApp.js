import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Hidden from '@mui/material/Hidden'
import Divider from '@mui/material/Divider'
import { alpha } from '@mui/material/styles'
import SideBar from '../ui/SideBar'
import ChatContainer from '../ui/ChatContainer'
import ShowMenu from '../ui/menu/ShowMenu'

function LayoutApp() {
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