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
      if(quantity >= 10){
        setLoading(true)
      }
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
    if(index !== selectedIndex){
      dispatch(selectItemRequest(info))
      setSelectedIndex(index)
    }
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
                  hover
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
            >
            </ListItem>
          ) : null}
      </div>
    </div>
  )
}

export default MenuRequest
