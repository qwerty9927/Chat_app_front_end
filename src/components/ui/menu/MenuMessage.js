import { Fragment, useState } from 'react'
import Typography from '@mui/material/Typography'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import { HoverButton } from '../globalStyle/style'
import Divider from '@mui/material/Divider'
import { alpha } from '@mui/material'

function titleMessage() {
  return "Messages"
}

function CountMessage() {
  return 21
}

function MenuMessage() {
  const [selectedIndex, setSelectedIndex] = useState()
  const handleClick = (value) => {
    setSelectedIndex(value)
  }
  //call api
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
        return (
          <Fragment key={index}>
            <HoverButton
              key={index}
              selected={selectedIndex === value}
              onClick={() => { handleClick(value) }}
              sx={{ borderRadius: 2 }}
            >
              <ListItemAvatar>
                <Avatar>T</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Name"
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ opacity: 0.2 }}
                  >
                    Message
                  </Typography>
                }
              >
              </ListItemText>
              <Typography variant='body2' sx={{ color: '#fff', opacity: 0.3 }}>
                6:22
              </Typography>
            </HoverButton>
            <Divider variant="middle" component="li" sx={{
              borderColor: alpha('#fff', 0.1)
            }} />
          </Fragment>
        )
      })}
    </>
  )
}

export { titleMessage, CountMessage }
export default MenuMessage