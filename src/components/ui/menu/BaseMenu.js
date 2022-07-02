import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import { HoverIconButton } from '../globalStyle/style'
import List from '@mui/material/List'
import { alpha } from '@mui/material'

function BaseMenu({ type, title, count }) {
  
  return (
    <Box 
      open={true}
      sx={{
        bgcolor: '#181a1e',
        color: '#fff',
        pl: 1,
        height: '100vh',
        '& .MuiSvgIcon-root': {
          color: '#fff',
          opacity: 0.3
        }
      }}
    >
      <Grid container direction='column' sx={{ height: 'inherit' }}>
        <Grid item xs={3}>
          <Box>
            <ListItem
              secondaryAction={
                <HoverIconButton>
                  <MoreHorizIcon />
                </HoverIconButton>
              }>
              <ListItemAvatar>
                <Avatar>T</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Name"
                secondary={
                  <Typography
                    component="span"
                    variant="body3"
                    sx={{ opacity: 0.2 }}
                  >
                    Infomation
                  </Typography>
                }
              >
              </ListItemText>
            </ListItem>
          </Box>
          <Box>
            <ListItem 
              // secondaryAction={
              //   <HoverIconButton>
              //     <BorderColorIcon />
              //   </HoverIconButton>
              // }
            >
              <ListItemText>
                <Typography component='span' variant="body1" sx={{fontWeight: 'bold'}} >
                  {`${title} (${count})`}
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <TextField 
                fullWidth 
                placeholder='Search'
                size='small'
                sx={{
                  backgroundColor: '#121216',
                }} 
              />
              <HoverIconButton>
                <SearchIcon />
              </HoverIconButton>
            </ListItem>
          </Box>
        </Grid>
        <Grid item xs>
          <List
          sx={{
            position: 'relative',
            overflow: 'auto',
            maxHeight: 550,
            p: 0,
            pr: 1,
            '& .MuiListItemButton-root.Mui-selected': {
              backgroundColor: alpha('#fff', 0.3)
            },
            '&::-webkit-scrollbar': {
              width: '0.5em'
            },
            '&::-webkit-scrollbar-track': {
              // boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              // webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#282a39',
              // outline: '1px solid slategrey',
              borderRadius: 5
            }
          }}>
            {type}
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BaseMenu