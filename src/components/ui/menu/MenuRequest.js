import {  Fragment ,useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import clsx from 'clsx'

// My import
import style from './css/menu.module.scss'
import Button from '../utils/Button'
import ListItem from '../utils/ListItem'
import Skeleton from '../utils/Skeleton'
import axiosToken from '../../../api/axiosToken'
import { selectState } from '../../features/auth/authSlice'
import { clearAllItems, selectItemRequest, selectStateContainer } from '../../features/container/containerSlice'


function MenuRequest({ className }) {
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
  const containerState = useSelector(selectStateContainer)
  const infoItem = containerState.items.itemRequest
  const [selectedIndex, setSelectedIndex] = useState()
  const [ listRequest, setListRequest ] = useState([])
  const [ valueOfInput, setValueOfInput ] = useState()
  const [ quantityOfRequest, setQuantityOfRequest ] = useState(0)
  const [ featureBase, setFeatureBase ] = useState(initStateFeatureBase)
  const [ featureSearch, setFeatureSearch ] = useState(initStateFeatureSearch)
  const [ loading, setLoading ] = useState(false)
  // console.log(listRequest)
  // console.log("Base", featureBase)
  // console.log("Search", featureSearch)
  
  //call api
  useEffect(() => {
    async function fetchApi(){
      const result = await getData(pageDefault, quantityGetDefault)
      const quantity = await getQuantityData()
      setQuantityOfRequest(quantity)
      setListRequest(result.requestOfQuery)
    }
    fetchApi()
  },[])

  useEffect(() => {
    let page = 0
    const list = document.querySelector(".list")
    const handleScroll = async (e) => {
      const el = e.target
      if(Math.ceil(el.scrollTop + el.clientHeight) === el.scrollHeight){
        const result = await getDataSearch(++page, quantityGetDefault)
        console.log("search")
        if(!result.requestOfQuery.length){
          setLoading(false)
          setFeatureSearch(preState => ({...preState, loadMore: false}))
        } else {
          setListRequest(preState => [...preState, ...result.requestOfQuery])
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

  useEffect(() => {
    let page = 0
    const list = document.querySelector(".list")
    const handleScroll = async (e) => {
      const el = e.target;
      if(Math.ceil(el.scrollTop + el.clientHeight) === el.scrollHeight - 1) {
        const result = await getData(++page, quantityGetDefault)
        if(!result.requestOfQuery.length){
          setLoading(false)
          setFeatureBase(preState => ({...preState, loadMore: false}))
        } else {
          setListRequest(preState => [...preState, ...result.requestOfQuery])
        }
        console.log("friend")
      } 
    }
    if(featureBase.status && featureBase.loadMore){
      list.addEventListener('scroll', handleScroll)
      return () => {
        list.removeEventListener('scroll', handleScroll)
      }
    }
  }, [featureBase])

  useEffect(() => {
    if(quantityOfRequest > quantityGetDefault){
      setLoading(true)
    }
  }, [quantityOfRequest])

  useEffect(() => {
    if(infoItem){
      let newList = listRequest.map(item => {
        console.log(item, infoItem)
        if(item.idUser === infoItem.idUser && infoItem.submitted){
          dispatch(clearAllItems())
        } else {
          return item
        }
      })
      if(newList[0] === undefined){
        newList = []
      }
      setListRequest(newList)
    }
  }, [infoItem])

  const handleClick = (index, info) => {
    console.log(info)
    dispatch(selectItemRequest(info))
    setSelectedIndex(index)
  }

  async function handleChange(e) {
    if(e.target.value === ""){
      const result = await getData(pageDefault, quantityGetDefault)
      const quantity = await getQuantityData()
      setFeatureSearch(initStateFeatureSearch)
      setFeatureBase(initStateFeatureBase)
      setQuantityOfRequest(quantity)
      setListRequest(result.requestOfQuery)
    }
    setValueOfInput(e.target.value)
  }

  async function handleSearch(){
    const result = await getDataSearch(pageDefault, quantityGetDefault)
    const quantity = await getQuantityDataSearch()
    setFeatureSearch(preState => ({...preState, status: true}))
    setFeatureBase(preState => ({...preState, status: false}))
    setQuantityOfRequest(quantity)
    setListRequest(result.requestOfQuery)
  }

  async function getData(page, quantity){
    return (await axiosToken.get(
      `user/listRequest?page=${page}&quantity=${quantity}`
      ,{
        headers:{
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  async function getDataSearch(page, quantity){
    return (await axiosToken.get(
      `search/request?searchValue=${valueOfInput}&page=${page}&quantity=${quantity}`
      ,{
        headers:{
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  async function getQuantityData(){
    return (await axiosToken.get(
      `user/quantityListRequest`
      ,{
        headers:{
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  async function getQuantityDataSearch(){
    return (await axiosToken.get(
      `search/quantityRequestFound?searchValue=${valueOfInput}`
      ,{
        headers:{
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  return (
    <div className={clsx(className, style.menu)}>
      <div className={style.header}>
        <ListItem 
          avatar={state.currentUser.Name.split("")[0]}
          name={state.currentUser.Name} 
          primary={
            <Button>
              <i className="fa-solid fa-ellipsis"></i>
            </Button>
          }
          message={"Message"}
        >
        </ListItem>
        <div className={style.title}>{`Request (${quantityOfRequest})`}</div>
        <div className={style.search}>
          <input type="text" placeholder='Search' onChange={handleChange} />
          <Button onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </div>
      </div>
      <div className={clsx(style.list, "list")}>
          {listRequest.map((item, index) => {
            return (
              <Fragment key={index}>
                <ListItem 
                  selected={selectedIndex === index}
                  onClick={() => { handleClick(index, item) }}
                  avatar={item.NameUserReq.split("")[0]}
                  name={item.NameUserReq} 
                >
                </ListItem>
                <div className={style.hr}></div>
              </Fragment>
            )
          })}
          {loading ? (
            <ListItem 
              avatar={<Skeleton type="avatar" />}
              name={<Skeleton />} 
              message={<Skeleton />}
            >
            </ListItem>
          ) : null}
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
    //   <div>
    //     <div>
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
    //               {`Message (${quantityOfRequest})`}
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
    //     <div style={{marginTop: 16}}>
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
    //         {listRequest.map((item, index) => {
    //           return (
    //             <Fragment key={index}>
    //               <HoverButton
    //                 selected={selectedIndex === index}
    //                 onClick={() => { handleClick(index, item) }}
    //                 sx={{ borderRadius: 2 }}
    //               >
    //                 <ListItemAvatar>
    //                   <Avatar>{item.NameUserReq.split('')[0]}</Avatar>
    //                 </ListItemAvatar>
    //                 <ListItemText>
    //                   {item.NameUserReq}
    //                 </ListItemText>
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
    //             </ListItemText>
    //           </ListItem>
    //         ) : null}
    //       </List>
    //     </div>
    //   </div>
    // </Box>
  )
}

export default MenuRequest
