import {  Fragment ,useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectState } from '../../features/auth/authSlice'
import Typography from '@mui/material/Typography'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { alpha } from '@mui/material'
import { HoverButton, HoverIconButton } from '../globalStyle/style'
import axiosToken from '../../../api/axiosToken'

function MenuMessage() {
  const quantityGetDefault = 10
  const pageDefault = 0
  const initStateFeatureBase = {
    status: true,
    loadMore: true
  }
  const initStateFeatureSearch = {
    status: false,
    loadMore: true
  }
  const state = useSelector(selectState)
  const [selectedIndex, setSelectedIndex] = useState()
  const [ listFriend, setListFriend ] = useState([])
  const [ valueOfInput, setValueOfInput ] = useState()
  const [ quantityOfMessage, setQuantityOfMessage ] = useState()
  const [ featureBase, setFeatureBase ] = useState(initStateFeatureBase)
  const [ featureSearch, setFeatureSearch ] = useState(initStateFeatureSearch)
  const list = useRef()
  console.log(listFriend)
  console.log("Base", featureBase)
  console.log("Search", featureSearch)
  
  //call api
  useEffect(() => {
    async function fetchApi(){
      const result = await getData(pageDefault, quantityGetDefault)
      const quantity = (await axiosToken.get(`user/quantityListFriend?username=${state.currentUser.username}`)).data
      console.log(quantity)
      setQuantityOfMessage(quantity)
      setListFriend(result.friendOfQuery)
    }
    fetchApi()
  },[])

  useEffect(() => {
    let page = 0
    const handleScroll = async (e) => {
      const el = e.target
      if(Math.ceil(el.scrollTop + el.clientHeight) === el.scrollHeight){
        const result = await getDataSearch(++page, quantityGetDefault)
        console.log("search")
        if(!result.friendOfQuery.length){
          setFeatureSearch(preState => ({...preState, loadMore: false}))
        }
        setListFriend(preState => [...preState, ...result.friendOfQuery])
      }
    }
    if(featureSearch.status && featureSearch.loadMore){
      list.current.addEventListener('scroll', handleScroll)
    }
    return () => {
      list.current.removeEventListener('scroll', handleScroll)
    }
  }, [featureSearch])

  useEffect(() => {
    let page = 0
    const handleScroll = async (e) => {
      const el = e.target;
      if(Math.ceil(el.scrollTop + el.clientHeight) === el.scrollHeight - 1) {
        const result = await getData(++page, quantityGetDefault)
        if(!result.friendOfQuery.length){
          setFeatureBase(preState => ({...preState, loadMore: false}))
        }
        console.log("friend")
        setListFriend(preState => [...preState, ...result.friendOfQuery])
      }
    }
    if(featureBase.status && featureBase.loadMore){
      list.current.addEventListener('scroll', handleScroll)
    }
    return () => {
      list.current.removeEventListener('scroll', handleScroll)
    }
  }, [featureBase])

  const handleClick = (value) => {
    setSelectedIndex(value)
  }

  async function handleChange(e) {
    if(e.target.value === ""){
      const result = await getData(pageDefault, quantityGetDefault)
      setFeatureSearch(initStateFeatureSearch)
      setFeatureBase(initStateFeatureBase)
      setQuantityOfMessage(result.count)
      setListFriend(result.friendOfQuery)
    }
    setValueOfInput(e.target.value)
  }

  async function handleSearch(){
    const result = await getDataSearch(pageDefault, quantityGetDefault)
    const quantity = (await axiosToken.get(`search/quantityFriendFound?username=${state.currentUser.username}&searchValue=${valueOfInput}`)).data
    setFeatureSearch(preState => ({...preState, status: true}))
    setFeatureBase(preState => ({...preState, status: false}))
    setQuantityOfMessage(quantity)
    setListFriend(result.friendOfQuery)
  }

  async function getData(page, quantity){
    return (await axiosToken.get(`user/listFriend?username=${state.currentUser.username}&page=${page}&quantity=${quantity}`)).data
  }

  async function getDataSearch(page, quantity){
    return (await axiosToken.get(`search/friend?idCurrentUser=${state.currentUser.username}&searchValue=${valueOfInput}&page=${page}&quantity=${quantity}`)).data
  }

  return (
    <Box 
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
      <div>
        <div>
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
            >
              <ListItemText>
                <Typography component='span' variant="body1" sx={{fontWeight: 'bold'}} >
                  {`Message (${quantityOfMessage})`}
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
                onChange={
                  handleChange
                }
              />
              <HoverIconButton onClick={
                handleSearch
              }>
                <SearchIcon />
              </HoverIconButton>
            </ListItem>
          </Box>
        </div>
        <div style={{marginTop: 16}}>
          <List
          ref={list}
          sx={{
            position: 'relative',
            overflow: 'auto',
            height: 550, 
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
            {[...listFriend].map((item, index) => {
              return (
                <Fragment key={index}>
                  <HoverButton
                    selected={selectedIndex === index}
                    onClick={() => { handleClick(index) }}
                    sx={{ borderRadius: 2 }}
                  >
                    <ListItemAvatar>
                      <Avatar>T</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary= {`${item.NameFriend}`}
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
                  <Divider variant="middle" sx={{
                    borderColor: alpha('#fff', 0.1)
                  }} />
                </Fragment>
              )
            })}
          </List>
        </div>
      </div>
    </Box>
  )
}

export default MenuMessage
