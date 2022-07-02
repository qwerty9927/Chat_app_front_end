import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { menuMessage, menuAdd, menuRequest, menuSetting } from '../../../config/instance'
import { clearDom, selectStateMenu } from '../../features/menu/menuSlice'
import BaseMenu from './BaseMenu'
import MenuMessage, { titleMessage, CountMessage } from './MenuMessage'
import MenuAdd, { titleAdd, CountAdd } from './MenuAdd'
import MenuRequest, { titleRequest, CountRequest } from './MenuRequest'
import { Menu } from '@mui/material'

function ShowMenu({ responsive }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const state = useSelector(selectStateMenu)
  const dispatch = useDispatch()
  let Component
  let title
  let count
  const open = Boolean(state.dom);
  const handleClose = () => {
    dispatch(clearDom())
  };

  switch (state.type) {
    case menuMessage:
      title = titleMessage()
      count = CountMessage()
      Component = MenuMessage
      break
    case menuAdd:
      title = titleAdd()
      count = CountAdd()
      Component = MenuAdd
      break
    case menuRequest:
      title = titleRequest()
      count = CountRequest()
      Component = MenuRequest
      break
  }
  if (responsive) {
    const positionOfArrow = {
      top: Math.ceil(window.innerHeight/12) + state.indexForMenuResponsive * 42,
      left: -5,
    }
    return (
      <Menu
        anchorEl={state.dom}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 10px rgba(0,0,0,0.5))',
            ml: 1.5,
            backgroundColor: 'transparent',
            '& > ul': {
              transform: 'translateY(-2%)',
              p: 0
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: positionOfArrow.top,
              left: positionOfArrow.left,
              width: 10,
              height: 10,
              bgcolor: '#181a1e',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <BaseMenu type={<Component />} title={title} count={count} />
      </Menu>
    )
  }
  return (
    <BaseMenu type={<Component />} title={title} count={count} />
  )
}

export default ShowMenu