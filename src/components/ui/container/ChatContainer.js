import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import moment from "moment-timezone";
import io from "socket.io-client";

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import MicIcon from '@mui/icons-material/Mic';
import LinkIcon from '@mui/icons-material/Link';
import SendIcon from '@mui/icons-material/Send';
import { alpha } from '@mui/material'

import BlockMessage from './BlockMessage'
import { HoverIconButton, HoverButton } from '../globalStyle/style'
import { selectState } from "../../features/auth/authSlice"
import { selectStateContainer } from "../../features/container/containerSlice"
import axiosToken from "../../../api/axiosToken"
const socket = io.connect("http://localhost:5000")

function ChatContainer() {
  const state = useSelector(selectState)
  const containerState = useSelector(selectStateContainer)
  const infoItem = containerState.items.itemChat
  const [message, setMessage] = useState("")
  const [textMessage, setTextMessage] = useState([])
  const [loadMore, setLoadMore] = useState(true)
  const [ loading, setLoading ] = useState(true)
  const [ scrollDown, setScrollDown ] = useState(true)
  const basicConfig = { idRoom: infoItem.idRoom }
  const basicMail = {
    messageInfo: {
      idAuthor: state.currentUser.Username,
      Message: null,
      Image: null,
      Time: null
    },
    idRoom: infoItem.idRoom
  }
  const quantityGetDefault = 10
  const pageDefault = 0

  useEffect(() => {
    if(scrollDown){
      scrollToBottom()
    }
  }, [textMessage])

  useEffect(() => {
    async function fetchApi() {
      const result = await getData(pageDefault, quantityGetDefault)
      if(result.length < 10){
        setLoading(false)
      }
      setTextMessage(result.messageOfQuery.reverse())
    }
    fetchApi()
  }, [])

  useEffect(() => {
    socket.emit("entryRoom", basicConfig)
  }, [])

  useEffect(() => {
    socket.on("receiveMessage", (res) => {
      console.log(res)
      setTextMessage(preState => [...preState, res])
    })
    console.log("render")
  }, [socket])

  useEffect(() => {
    const boxMessage = document.querySelector(".boxMessage")
    let page = 0
    let scrollHeight = {
      lastHeight: 0,
      newHeight: 0
    }
    const handleScroll = async (e) => {
      const el = e.target
      if (el.scrollTop === 0) {
        scrollHeight.newHeight = el.scrollHeight
        console.log(scrollHeight)
        setScrollDown(false)
        const result = await getData(++page, quantityGetDefault)
        if (!result.messageOfQuery.length) {
          setLoadMore(false)
          setLoading(false)
        } else {
          el.scrollTop = scrollHeight.newHeight - scrollHeight.lastHeight
          scrollHeight.lastHeight = scrollHeight.newHeight
          setTextMessage(preState => [...result.messageOfQuery.reverse(), ...preState])
        }
      }
    }
    if (loadMore) {
      boxMessage.addEventListener('scroll', handleScroll)
      return () => {
        boxMessage.removeEventListener('scroll', handleScroll)
      }
    }
  }, [loadMore])

  function scrollToBottom() {
    const boxMessage = document.querySelector(".boxMessage")
    boxMessage.scrollTop = boxMessage.scrollHeight
    console.log(boxMessage.scrollTop)
  }

  function handleChange(e) {
    setMessage(e.target.value)
  }

  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      handleSendData()
    }
  }

  function handleClick(e) {
    handleSendData()
  }

  function handleSendData() {
    const time = moment().format('YYYY-MM-DD HH:mm:ss')
    setMessage("")
    setScrollDown(true)
    setTextMessage(preState => [...preState, { ...basicMail.messageInfo, Message: message, Time: time }])
    socket.emit("sendMessage", {
      ...basicMail, 
      messageInfo: { 
        ...basicMail.messageInfo, 
        Message: message, 
        Time: time
      } 
    })
  }

  async function getData(page, quantity) {
    return (await axiosToken.get(`chat/message?room=${infoItem.idRoom}&page=${page}&quantity=${quantity}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    })).data
  }

  return (
    <Box
      sx={{
        bgcolor: '#131317',
        height: '100vh',
        '& hr': {
          borderColor: alpha('#fff', 0.1)
        },
      }}
    >
      <Box
        sx={{
          height: '8%',
          display: 'flex',
          justifyContent: "space-between",
          alignItems: "center",
          p: 2
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
          <Avatar>{infoItem.NameFriend.split('')[0]}</Avatar>
          <Typography>
            {infoItem.NameFriend}
          </Typography>
        </Box>
      </Box>
      <Divider variant="middle" />

      <Box
        className="boxMessage"
        sx={{
          color: '#fff',
          pl: 2,
          pr: 2,
          position: 'relative',
          overflow: 'auto',
          height: '82%',
          '& > .MuiBox-root': {
            mt: 2,
            mb: 3
          },
          direction: 'ttb',
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
            borderRadius: 5
          }
        }}
      >
        {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress size={30} value={20} /></Box> : null}
        <BlockMessage data={textMessage} nameFriend={infoItem.NameFriend} nameRoot={state.currentUser.Name} idRootUser={state.currentUser.Username} />
      </Box>

      <Box
        sx={{
          height: '10%',
          ml: 2,
          mr: 2,
          pt: 1,
          pb: 1
        }}
      >
        <Box
          sx={{
            borderRadius: 4,
            bgcolor: '#212228',
            display: 'flex',
            alignItems: 'center',
            p: 1,
            pl: 2,
            pr: 1
          }}
        >
          <Avatar sx={{ height: 26, width: 26 }}>T</Avatar>
          <TextField
            variant='standard'
            fullWidth
            placeholder='Message'
            size='small'
            sx={{ ml: 1 }}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            value={message}
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
            <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 1, mr: 1 }} />
            <HoverIconButton color='primary' onClick={handleClick}>
              <SendIcon />
            </HoverIconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatContainer
