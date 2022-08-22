import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import moment from "moment-timezone";
import io from "socket.io-client";
import clsx from "clsx";

import Button from "../utils/Button";

//My import
import style from './css/container.module.scss'
import ListItem from "../utils/ListItem";
import Circle from "../utils/Circle";
import BlockMessage from './BlockMessage'
import { selectState } from "../../features/auth/authSlice"
import { selectStateContainer } from "../../features/container/containerSlice"
import axiosToken from "../../../api/axiosToken"
const socket = io.connect("http://localhost:5000")

function ChatContainer({className}) {
  const state = useSelector(selectState)
  const containerState = useSelector(selectStateContainer)
  const infoItem = containerState.items.itemChat
  const [message, setMessage] = useState("")
  const [textMessage, setTextMessage] = useState([])
  const [loadMore, setLoadMore] = useState(true)
  const [ loading, setLoading ] = useState(false)
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

  // console.log(loading)

  useEffect(() => {
    async function fetchApi() {
      const result = await getData(pageDefault, quantityGetDefault)
      if(result.messageOfQuery.length >= quantityGetDefault){
        setLoading(true)
      }
      setTextMessage(result.messageOfQuery)
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
    // console.log("render")
  }, [socket])

  useEffect(() => {
    const boxMessage = document.querySelector(".boxMessage")
    let page = 0
    const handleScroll = async (e) => {
      const el = e.target
      // console.log(el.scrollTop - el.clientHeight, el.scrollHeight)
      // console.log(Math.ceil(el.scrollTop - el.clientHeight) === 1 - el.scrollHeight)
      if (Math.ceil(el.scrollTop - el.clientHeight) === 1 - el.scrollHeight) {
        const result = await getData(++page, quantityGetDefault)
        if (!result.messageOfQuery.length) {
          setLoadMore(false)
          setLoading(false)
        } else {
          setTextMessage(preState => [ ...preState, ...result.messageOfQuery])
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
    boxMessage.scrollTop = 0
  }

  function handleChange(e) {
    setMessage(e.target.value)
  }

  function handleKeyUp(e) {
    if (e.keyCode === 13 && !/^\s+|^$/.test(message)) {
      handleSendData()
    }
  }

  function handleClick(e) {
    if (!/^\s+|^$/.test(message)){
      handleSendData()
    }
  }

  function handleSendData() {
    const time = moment().format('YYYY-MM-DD HH:mm:ss')
    setMessage("")
    scrollToBottom()
    setTextMessage(preState => [{ ...basicMail.messageInfo, Message: message, Time: time }, ...preState])
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
    <div className={clsx(className, style.messageContainer)}>
      <div className={style.header}>
        <ListItem
          avatar={infoItem.NameFriend.split('')[0]}
          name={infoItem.NameFriend}
        >
        </ListItem>
        <div className={style.hr}></div>
      </div>
      <div className={clsx(style.content, "boxMessage")}>
        <BlockMessage data={textMessage} nameFriend={infoItem.NameFriend} nameRoot={state.currentUser.Name} idRootUser={state.currentUser.Username} />
        {
          loading ? <div className={style.topBlock}><div className={style.circleProcess}></div></div> : null
        }
      </div>
      <div className={style.footer}>
        <div className={style.inputMessage}>
          <Circle>{state.currentUser.Name.split('')[0]}</Circle>
          <input 
            type="text" 
            placeholder="Message..." 
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            value={message} 
          />
          <div className={style.tool}>
            <Button>
              <i className="fa-solid fa-microphone" style={{color: '#f44336'}}></i>
            </Button>
            <Button>
              <i className="fa-solid fa-paperclip" style={{color: '#757ce8'}}></i>
            </Button>
            <div className={style.divide}></div>
            <Button onClick={handleClick}>
              <i className="fa-solid fa-paper-plane" style={{color: '#3f50b5'}}></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
