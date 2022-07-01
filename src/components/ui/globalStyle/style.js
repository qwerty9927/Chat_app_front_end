import { alpha, styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'

const HoverIconButton = styled(IconButton)(({ theme }) => {
  return {
    "&:hover, &.Mui-focusVisible": { 
      backgroundColor: alpha(theme.palette.grey[50], 0.1)
    }
  }
})

const HoverButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover, &.Mui-focusVisible": { 
    backgroundColor: alpha(theme.palette.grey[50], 0.1)
  }
}))

export { HoverIconButton, HoverButton }