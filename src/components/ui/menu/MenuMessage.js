import { Fragment, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

// My import
import style from './css/menu.module.scss'
import ListItem from '../utils/ListItem'
import Button from '../utils/Button'
import axiosToken from '../../../api/axiosToken'
import { selectState } from '../../features/auth/authSlice'
import { selectChatRoom} from '../../features/container/containerSlice'
import { selectStateMenu } from '../../features/menu/menuSlice'
import clsx from 'clsx'
import Skeleton from '../utils/Skeleton'

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
  const stateMenu = useSelector(selectStateMenu)
  const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = useState()
  const [listFriend, setListFriend] = useState([])
  const [valueOfInput, setValueOfInput] = useState()
  const [quantityOfMessage, setQuantityOfMessage] = useState(0)
  const [featureBase, setFeatureBase] = useState(initStateFeatureBase)
  const [featureSearch, setFeatureSearch] = useState(initStateFeatureSearch)
  const [loading, setLoading] = useState(false)
  // console.log(listFriend)
  // console.log("Base", featureBase)
  // console.log("Search", featureSearch)

  //call api cho lần đầu
  useEffect(() => {
    async function fetchApi() {
      const result = await getData(pageDefault, quantityGetDefault)
      const quantity = await getQuantityData()
      if(quantity >= 10){
        setLoading(true)
      }
      setQuantityOfMessage(quantity)
      setListFriend(result.friendOfQuery)
    }
    fetchApi()
  }, [])

  //Sử lý scroll cho kết quả tìm kiếm
  useEffect(() => {
    let page = 0
    const list = document.querySelector(".list")
    const handleScroll = async (e) => {
      const el = e.target
      if (Math.ceil(el.scrollTop + el.clientHeight) === el.scrollHeight) {
        const result = await getDataSearch(++page, quantityGetDefault)
        console.log("search")
        if (!result.friendOfQuery.length) {
          setFeatureSearch(preState => ({ ...preState, loadMore: false }))
          setLoading(false)
        } else {
          setListFriend(preState => [...preState, ...result.friendOfQuery])
        }
      }
    }
    if (featureSearch.status && featureSearch.loadMore) {
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
      if (Math.ceil(el.scrollTop + el.clientHeight) === el.scrollHeight - 1) {
        const result = await getData(++page, quantityGetDefault)
        console.log("friend")
        if (!result.friendOfQuery.length) {
          setFeatureBase(preState => ({ ...preState, loadMore: false }))
          setLoading(false)
        } else {
          setListFriend(preState => [...preState, ...result.friendOfQuery])
        }
      }
    }
    if (featureBase.status && featureBase.loadMore) {
      list.addEventListener('scroll', handleScroll)
      return () => {
        list.removeEventListener('scroll', handleScroll)
      }
    }
  }, [featureBase])

  //
  // useEffect(() => {
  //   if (quantityOfMessage > quantityGetDefault) {
  //     setLoading(true)
  //   }
  // }, [quantityOfMessage])

  //reload
  useEffect(() => {
    setSelectedIndex(-1)
  }, [stateMenu.choiceItem])

  const handleClick = (index, info) => {
    if(index !== selectedIndex){
      dispatch(selectChatRoom(info))
      setSelectedIndex(index)
    }
  }

  async function handleChange(e) {
    if (e.target.value === "") {
      const result = await getData(pageDefault, quantityGetDefault)
      const quantity = await getQuantityData()
      setFeatureSearch(initStateFeatureSearch)
      setFeatureBase(initStateFeatureBase)
      setQuantityOfMessage(quantity)
      setListFriend(result.friendOfQuery)
    }
    setValueOfInput(e.target.value)
  }

  async function handleSearch() {
    const result = await getDataSearch(pageDefault, quantityGetDefault)
    const quantity = await getQuantityDataSearch()
    setFeatureSearch(preState => ({ ...preState, status: true }))
    setFeatureBase(preState => ({ ...preState, status: false }))
    setQuantityOfMessage(quantity)
    setListFriend(result.friendOfQuery)
  }

  async function getData(page, quantity) {
    return (await axiosToken.get(
      `user/listFriend?page=${page}&quantity=${quantity}`
      , {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  async function getDataSearch(page, quantity) {
    return (await axiosToken.get(
      `search/friend?searchValue=${valueOfInput}&page=${page}&quantity=${quantity}`
      , {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  async function getQuantityData() {
    return (await axiosToken.get(
      `user/quantityListFriend`
      , {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`
        }
      })).data
  }

  async function getQuantityDataSearch() {
    return (await axiosToken.get(
      `search/quantityFriendFound?searchValue=${valueOfInput}`
      , {
        headers: {
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
        <div className={style.title}>{`Message (${quantityOfMessage})`}</div>
        <div className={style.search}>
          <input type="text" placeholder='Search' onChange={handleChange} />
          <Button onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </div>
      </div>
      <div className={clsx(style.list, "list")}>
        {listFriend.map((item, index) => {
          return (
            <Fragment key={index}>
              <ListItem
                selected={selectedIndex === index}
                onClick={() => { handleClick(index, item) }}
                avatar={item.NameFriend.split("")[0]}
                name={item.NameFriend}
                hover
                primary={
                  <span>6:22</span>
                }
                message={"Message"}
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
  )
}

export default MenuMessage
