import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import ListItemText from '@mui/material/ListItemText'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import { HoverIconButton, HoverButton } from './globalStyle/style'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import MicIcon from '@mui/icons-material/Mic';
import LinkIcon from '@mui/icons-material/Link';
import SendIcon from '@mui/icons-material/Send';
import { alpha } from '@mui/material'

function ChatContainer(){
  return (
    <Box sx={{
      bgcolor: '#131317',
      height: '100vh',
      '& hr': {
        borderColor: alpha('#fff', 0.1)
      },
      // '& .MuiSvgIcon-root': {
      //   color: '#fff',
      //   opacity: 0.3
      // }
    }}>
      <Grid container direction='column' sx={{height: 'inherit'}}>
        <Grid item xs={1}>
          <Box 
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: "space-between",
              alignItems: "center",
              pl: 2,
              pr: 2
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: "center",
                color: '#fff',
                '& .MuiTypography-root': {
                  ml: 2
                }
              }}
            >
              <Avatar>AV</Avatar>
              <Typography>
                Advenger
              </Typography>
              <Typography sx={{opacity: 0.4}}>
                5
              </Typography>
            </Box>
            <Box>
              <AvatarGroup 
                max={4}
                sx={{
                  '& .MuiAvatar-root': {
                    height: 24, width: 24
                  }
                }}
              >
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
              </AvatarGroup>
            </Box>
          </Box>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs>
          <Box sx={{
            color: '#fff',
            pl: 2,
            pr: 2,
            position: 'relative',
            overflow: 'auto',
            height: 630,
            '& > .MuiBox-root': {
              mt: 2,
              mb: 3
            },
            '& .MuiListItemButton-root.Mui-selected': {
              backgroundColor: alpha('#fff', 0.3)
            },
            '&::-webkit-scrollbar': {
              width: '0.5em'
            },
            '&::-webkit-scrollbar-track': {
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#282a39',
              // outline: '1px solid slategrey',
              borderRadius: 5
            }
          }}>
            {[1,2,3,4,5,6,7,5,9].map((value, index) => {
              if(value === 5){
                return (
                  <Box key={index} sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}>
                    <Box sx={{mr: 1}}>
                      <Typography 
                        align='right'
                        sx={{
                          fontWeight: 'bold'
                        }}
                      >
                        <Typography 
                          component="span" 
                          variant="caption" 
                          sx={{
                            opacity: 0.5, 
                            mr: 1
                          }}
                        >
                          12:10
                        </Typography>
                        You
                      </Typography>
                      <Box 
                        sx={{ 
                          bgcolor: '#2295ff',
                          p: 1,
                          pl: 2,
                          pr: 2,
                          borderRadius: 4,
                          borderTopRightRadius: 0
                        }}
                      >
                        <Typography variant="body2">
                          Hello everyone
                        </Typography>
                      </Box>
                    </Box>
                    <Avatar>T</Avatar>
                  </Box>
                )
              } else {
                return (
                  <Box key={index} sx={{
                    display: 'flex',
                  }}>
                    <Avatar>O</Avatar>
                    <Box sx={{ml: 1}}>
                      <Typography 
                        align='left' 
                        sx={{
                          fontWeight: 'bold'
                        }}
                      >
                      Order 
                        <Typography 
                          component="span" 
                          variant="caption" 
                          sx={{
                            opacity: 0.5, 
                            ml: 1
                          }}
                        >
                          12:10
                        </Typography>
                      </Typography>
                      <Box 
                        sx={{ 
                          bgcolor: '#292b33',
                          p: 1,
                          pl: 2,
                          pr: 2,
                          borderRadius: 4,
                          borderTopLeftRadius: 0
                        }}
                      >
                        <Typography variant="body2">
                          Hello You
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )
              }
            })}
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box sx={{
            height: '100%',
            ml: 2,
            mr: 2,
          }}>
            <Box sx={{
              borderRadius: 4,
              bgcolor: '#212228',
              display: 'flex',
              alignItems: 'center',
              p: 1,
              pl: 2,
              pr: 1
            }}>
              <Avatar sx={{height: 26, width: 26}}>T</Avatar>
              <TextField 
                variant='standard'
                fullWidth 
                placeholder='Message'
                size='small'
                sx={{ml: 1}}
              ></TextField>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
                <HoverIconButton color='success'>
                  <MicIcon />
                </HoverIconButton>
                <HoverIconButton color='info'>
                  <LinkIcon />
                </HoverIconButton>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ml: 1, mr: 1}}/>
                <HoverIconButton color='primary'>
                  <SendIcon />
                </HoverIconButton>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ChatContainer