import {  Fragment ,useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import clsx from 'clsx'

// My import
import style from './css/menu.module.scss'
import ListItem from '../utils/ListItem'
import Button from '../utils/Button'
import Skeleton from '../utils/Skeleton'
import axiosToken from '../../../api/axiosToken'
import { selectState } from '../../features/auth/authSlice'
import { selectItemUser, selectStateContainer } from '../../features/container/containerSlice'

function MenuAdd({ className }){
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
        <div className={style.title}>{`Users (${quantityOfItem})`}</div>
        <div className={style.search}>
          <input type="text" placeholder='Search' onChange={handleChange} />
          <Button onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </div>
      </div>
      <div className={clsx(style.list, "list")}>
          {listUser.map((item, index) => {
            return (
              <Fragment key={index}>
                <ListItem 
                  selected={selectedIndex === index}
                  onClick={() => { handleClick(index, item) }}
                  avatar={item.Name.split("")[0]}
                  name={item.Name} 
                  hover
                  primary={
                    item.idUserLog || item.submitted 
                    ?
                      <span className={style.chip}>Wait Accept</span>
                    :
                      <Button onClick={() => {handleSentRequest(item.Username)}}>
                        <i className="fa-solid fa-user-plus"></i>
                      </Button>
                  }
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
export default MenuAdd