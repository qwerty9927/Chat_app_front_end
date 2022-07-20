import {  Fragment ,useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

// My import
import style from './css/menu.module.scss'
import axiosToken from '../../../api/axiosToken'
import { selectState } from '../../features/auth/authSlice'
import { selectChatRoom, selectStateContainer } from '../../features/container/containerSlice'
import clsx from 'clsx'

function MenuMessage({ className }) {
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
  const dispatch = useDispatch()
  const [ selectedIndex, setSelectedIndex ] = useState()
  const [ listFriend, setListFriend ] = useState([])
  const [ valueOfInput, setValueOfInput ] = useState()
  const [ quantityOfMessage, setQuantityOfMessage ] = useState(0)
  const [ featureBase, setFeatureBase ] = useState(initStateFeatureBase)
  const [ featureSearch, setFeatureSearch ] = useState(initStateFeatureSearch)
  const [ loading, setLoading ] = useState(false)
  // console.log(listFriend)
  // console.log("Base", featureBase)
  // console.log("Search", featureSearch)
  
  //call api cho lần đầu
  useEffect(() => {
    async function fetchApi(){
      const result = await getData(pageDefault, quantityGetDefault)
      const quantity = await getQuantityData()
      setQuantityOfMessage(quantity)
      setListFriend(result.friendOfQuery)
    }
    fetchApi()
  },[])

  //Sử lý scroll cho kết quả tìm kiếm
  useEffect(() => {
    let page = 0
    const list = document.querySelector(".list")
    const handleScroll = async (e) => {
      const el = e.target
      if(Math.ceil(el.scrollTop + el.clientHeight) === el.scrollHeight){
        const result = await getDataSearch(++page, quantityGetDefault)
        console.log("search")
        if(!result.friendOfQuery.length){
          setFeatureSearch(preState => ({...preState, loadMore: false}))
          setLoading(false)
        } else {
          setListFriend(preState => [...preState, ...result.friendOfQuery])
        }
      }
    }
    if(featureSearch.status && featureSearch.loadMore){
      list.addEventListener('scroll', handleScroll)
      return () => {
        list.removeEventListener('scroll', handleScroll)
      }
    }
  }, [featureSearch])

  //Sử lý scroll
  useEffect(() => {
    let page = 0
    console.log(`.${style.list}`)
    const list = document.querySelector(`.list`)
    console.log(list)
    const handleScroll = async (e) => {
      const el = e.target;
      if(Math.ceil(el.scrollTop + el.clientHeight) === el.scrollHeight - 1) {
        const result = await getData(++page, quantityGetDefault)
        console.log("friend")
        if(!result.friendOfQuery.length){
          setFeatureBase(preState => ({...preState, loadMore: false}))
          setLoading(false)
        }else {
          setListFriend(preState => [...preState, ...result.friendOfQuery])
        }
      } 
    }
    if(featureBase.status && featureBase.loadMore){
      list.addEventListener('scroll', handleScroll)
      return () => {
        list.removeEventListener('scroll', handleScroll)
      }
    }
  }, [featureBase])

  //
  useEffect(() => {
    if(quantityOfMessage > quantityGetDefault){
      setLoading(true)
    }
  }, [quantityOfMessage])


  const handleClick = (index, info) => {
    dispatch(selectChatRoom(info))
    setSelectedIndex(index)
  }

  async function handleChange(e) {
    if(e.target.value === ""){
      const result = await getData(pageDefault, quantityGetDefault)
      const quantity = await getQuantityData()
      setFeatureSearch(initStateFeatureSearch)
      setFeatureBase(initStateFeatureBase)
      setQuantityOfMessage(quantity)
      setListFriend(result.friendOfQuery)
    }
    setValueOfInput(e.target.value)
  }

  async function handleSearch(){
    const result = await getDataSearch(pageDefault, quantityGetDefault)
    const quantity = await getQuantityDataSearch()
    setFeatureSearch(preState => ({...preState, status: true}))
    setFeatureBase(preState => ({...preState, status: false}))
    setQuantityOfMessage(quantity)
    setListFriend(result.friendOfQuery)
  }

  async function getData(page, quantity){
    return (await axiosToken.get(
      `user/listFriend?page=${page}&quantity=${quantity}`
      ,{
        headers:{
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  async function getDataSearch(page, quantity){
    return (await axiosToken.get(
      `search/friend?searchValue=${valueOfInput}&page=${page}&quantity=${quantity}`
      ,{
        headers:{
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  async function getQuantityData(){
    return (await axiosToken.get(
      `user/quantityListFriend`
      ,{
        headers:{
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  async function getQuantityDataSearch(){
    return (await axiosToken.get(
      `search/quantityFriendFound?searchValue=${valueOfInput}`
      ,{
        headers:{
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  return (
    <div className={clsx(className, style.menu)}>
      <div className={style.header}>

      </div>
      <div className={clsx(style.list, "list")}>

      </div>
    </div>
    // <Box 
    //   sx={{
    //     bgcolor: '#181a1e',
    //     color: '#fff',
    //     pl: 1,
    //     height: '100vh',
    //     '& .MuiSvgIcon-root': {
    //       color: '#fff',
    //       opacity: 0.3
    //     }
    //   }}
    // >
    //     <div style={{height: '25%'}}>
    //       <Box>
    //         <ListItem
    //           secondaryAction={
    //             <HoverIconButton>
    //               <MoreHorizIcon />
    //             </HoverIconButton>
    //           }>
    //           <ListItemAvatar>
    //             <Avatar>{state.currentUser.Name.split('')[0]}</Avatar>
    //           </ListItemAvatar>
    //           <ListItemText
    //             primary={state.currentUser.Name}
    //             secondary={
    //               <Typography
    //                 component="span"
    //                 variant="body3"
    //                 sx={{ opacity: 0.2 }}
    //               >
    //                 Infomation
    //               </Typography>
    //             }
    //           >
    //           </ListItemText>
    //         </ListItem>
    //       </Box>
    //       <Box>
    //         <ListItem 
    //         >
    //           <ListItemText>
    //             <Typography component='span' variant="body1" sx={{fontWeight: 'bold'}} >
    //               {`Message (${quantityOfMessage})`}
    //             </Typography>
    //           </ListItemText>
    //         </ListItem>
    //         <ListItem>
    //           <TextField 
    //             fullWidth 
    //             placeholder='Search'
    //             size='small'
    //             sx={{
    //               backgroundColor: '#121216',
    //               '& input': {
    //                 color: '#fff'
    //               }
    //             }} 
    //             onChange={
    //               handleChange
    //             }
    //           />
    //           <HoverIconButton onClick={
    //             handleSearch
    //           }>
    //             <SearchIcon />
    //           </HoverIconButton>
    //         </ListItem>
    //       </Box>
    //     </div>
    //     <div style={{marginTop: 16, height: '75%'}}>
    //       <List
    //       className='list'
    //       sx={{
    //         position: 'relative',
    //         overflow: 'auto',
    //         height: 550, 
    //         p: 0,
    //         pr: 1,
    //         '& .MuiListItemButton-root.Mui-selected': {
    //           backgroundColor: alpha('#fff', 0.3)
    //         },
    //         '&::-webkit-scrollbar': {
    //           width: '0.5em'
    //         },
    //         '&::-webkit-scrollbar-track': {
    //         },
    //         '&::-webkit-scrollbar-thumb': {
    //           backgroundColor: '#282a39',
    //           borderRadius: 5
    //         }
    //       }}>
    //         {listFriend.map((item, index) => {
    //           return (
    //             <Fragment key={index}>
    //               <HoverButton
    //                 selected={selectedIndex === index}
    //                 onClick={() => { handleClick(index, item) }}
    //                 sx={{ borderRadius: 2 }}
    //               >
    //                 <ListItemAvatar>
    //                   <Avatar>{item.NameFriend.split('')[0]}</Avatar>
    //                 </ListItemAvatar>
    //                 <ListItemText
    //                   primary= {`${item.NameFriend}`}
    //                   secondary={
    //                     <Typography
    //                       component="span"
    //                       variant="body2"
    //                       sx={{ opacity: 0.2 }}
    //                     >
    //                       Message
    //                     </Typography>
    //                   }
    //                 >
    //                 </ListItemText>
    //                 <Typography variant='body2' sx={{ color: '#fff', opacity: 0.3 }}>
    //                   6:22
    //                 </Typography>
    //               </HoverButton>
    //               <Divider variant="middle" sx={{
    //                 borderColor: alpha('#fff', 0.1)
    //               }} />
    //             </Fragment>
    //           )
    //         })}
    //         {loading ? (
    //           <ListItem
    //             sx={{
    //               '& .MuiSkeleton-root': {
    //                 bgcolor: "grey.800"
    //               }
    //             }}>
    //             <ListItemAvatar>
    //               <Skeleton variant="circular" width={40} height={40} />
    //             </ListItemAvatar>
    //             <ListItemText>
    //               <Skeleton variant="text" />
    //               <Skeleton variant="text" />
    //             </ListItemText>
    //           </ListItem>
    //         ) : null}
    //       </List>
    //     </div>
    // </Box>
  )
}

export default MenuMessage
