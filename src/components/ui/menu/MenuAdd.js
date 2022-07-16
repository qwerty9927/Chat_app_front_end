import {  Fragment ,useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import Typography from '@mui/material/Typography'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { alpha, Button, Chip } from '@mui/material'
// My import
import { HoverButton, HoverIconButton } from '../globalStyle/style'
import axiosToken from '../../../api/axiosToken'
import { selectState } from '../../features/auth/authSlice'
import { selectItemUser, selectStateContainer } from '../../features/container/containerSlice'

function MenuAdd(){
  const quantityGetDefault = 10
  const pageDefault = 0
  const initStateFeatureSearch = {
    loadMore: true
  }
  const state = useSelector(selectState)
  const containerState = useSelector(selectStateContainer)
  const infoItem = containerState.items.itemUser
  const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = useState()
  const [ listUser, setListUser ] = useState([])
  const [ valueOfInput, setValueOfInput ] = useState()
  const [ quantityOfItem, setQuantityOfItem ] = useState(0)
  const [ featureSearch, setFeatureSearch ] = useState(initStateFeatureSearch)
  const [ loading, setLoading ] = useState(false)
  // console.log(listUser)
  // console.log("Search", featureSearch)
  
  console.log(containerState)


  //call api
  useEffect(() => {
    let page = 0
    const list = document.querySelector(".list")
    const handleScroll = async (e) => {
      const el = e.target
      if(Math.ceil(el.scrollTop + el.clientHeight) === el.scrollHeight){
        const result = await getDataSearch(++page, quantityGetDefault)
        console.log("search")
        if(!result.userOfQuery.length){
          setLoading(false)
          setFeatureSearch(preState => ({...preState, loadMore: false}))
        } else {
          setListUser(preState => [...preState, ...result.userOfQuery])
        }
      }
    }
    if(featureSearch.loadMore){
      list.addEventListener('scroll', handleScroll)
      return () => {
        list.removeEventListener('scroll', handleScroll)
      }
    }
  }, [featureSearch])

  useEffect(() => {
    if(quantityOfItem > quantityGetDefault){
      setLoading(true)
    }
  }, [quantityOfItem])

  useEffect(() => {
    if(infoItem){
      const newList = listUser.map(item => {
        if(item.Username === infoItem.Username){
          item = infoItem
        }
        return item
      })
      setListUser(newList)
    }
  }, [infoItem])

  const handleClick = (index, info) => {
    if(index !== selectedIndex){
      dispatch(selectItemUser(info))
      setSelectedIndex(index)
    }
  }

  async function handleChange(e) {
    if(e.target.value === ""){
      setListUser([])
    }
    setValueOfInput(e.target.value)
  }

  async function handleSearch(){
    const result = await getDataSearch(pageDefault, quantityGetDefault)
    const quantity = await getQuantityDataSearch()
    setQuantityOfItem(quantity)
    setListUser(result.userOfQuery)
  }

  async function handleSentRequest(idFriend){
    try{
      await axiosToken.post('user/addRequest', {
        friend: {Username: idFriend},
        mySelf: state.currentUser
      },{
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      })
      const newList = listUser.map(item => {
        if(item.Username === idFriend){
          item = {...item, submitted: true}
          dispatch(selectItemUser(item))
        }
        return item
      })
      setListUser(newList)
    } catch(e){
      console.log(e)
      alert("Sent failed")
    }
  }

  async function getDataSearch(page, quantity){
    return (await axiosToken.get(
      `search/addUser?searchValue=${valueOfInput}&page=${page}&quantity=${quantity}`
      ,{
        headers:{
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  async function getQuantityDataSearch(){
    return (await axiosToken.get(
      `search/quantityNewUserFound?searchValue=${valueOfInput}`
      ,{
        headers:{
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
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
                <Avatar>{state.currentUser.Name.split('')[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={state.currentUser.Name}
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
                  {`Users (${quantityOfItem})`}
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
                  '& input': {
                    color: '#fff'
                  }
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
          className="list"
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
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#282a39',
              borderRadius: 5
            }
          }}>
            {listUser.map((item, index) => {
              return (
                <Fragment key={index}>
                <ListItem 
                  disablePadding
                  secondaryAction={
                    item.idUserLog || item.submitted ?
                      <Chip label="Wait Accept" sx={{
                          color: '#fff',
                          opacity: 0.8
                      }}/>
                      :
                      <HoverIconButton onClick={() => {handleSentRequest(item.Username)}}><PersonAddIcon /></HoverIconButton>
                  }>
                  <HoverButton
                    selected={selectedIndex === index}
                    onClick={() => { handleClick(index, item) }}
                    sx={{ borderRadius: 2 }}
                  >
                    <ListItemAvatar>
                      <Avatar>{item.Name.split('')[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                      {item.Name}
                    </ListItemText>
                  </HoverButton>
                </ListItem>
                <Divider variant="middle" sx={{
                  borderColor: alpha('#fff', 0.1)
                }} />
                </Fragment>
              )
            })}
            {loading ? (
              <ListItem
                sx={{
                  '& .MuiSkeleton-root': {
                    bgcolor: "grey.800"
                  }
                }}>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText>
                  <Skeleton variant="text" />
                </ListItemText>
              </ListItem>
            ) : null}
          </List>
        </div>
      </div>
    </Box>
  )
}
export default MenuAdd