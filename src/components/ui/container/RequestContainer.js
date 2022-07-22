import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import clsx from "clsx"

//My import
import axiosToken from '../../../api/axiosToken'
import style from './css/container.module.scss'
import ListItem from "../utils/ListItem"
import {selectState} from '../../features/auth/authSlice'
import { clearAllItems, selectItemRequest, selectStateContainer } from "../../features/container/containerSlice"


function RequestContainer({className}) {
  const state = useSelector(selectState)
  const containerState = useSelector(selectStateContainer)
  const infoItem = containerState.items.itemRequest
  const dispatch = useDispatch()
  console.log(infoItem)

  async function handleSendRefuse(){
    try{
      await axiosToken.delete(`user/refuseRequest?idRefuse=${infoItem.idUser}`
      ,{
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        } 
      })
      dispatch(selectItemRequest({...infoItem, submitted: true}))
      alert("Refused invitation")
    }catch(e){
      alert("Sent failed")
    }
  }

  async function handleSendAccept(){
    const friend = {
      Username: infoItem.idUser,
      Name: infoItem.NameUserReq,
      Image: infoItem.Image
    }
    try{
      await axiosToken.post(`user/addFriend`
      ,{
        friend,
        mySelf: state.currentUser
      },{
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        } 
      })
      dispatch(selectItemRequest({...infoItem, submitted: true}))
      alert("Accepted invitation")
    }catch(e){
      alert("Sent failed")
    }
  }

  return (
    <div className={clsx(className, style.requestContainer)}>
      <ListItem 
        avatar={infoItem.NameUserReq.split('')[0]}
        name={infoItem.NameUserReq}
      ></ListItem>
      <div className={style.buttonGroupRequest}>
        <button className={style.btnAccept} onClick={handleSendAccept}>
          Accept
        </button>
        <button className={style.btnRefuse} onClick={handleSendRefuse}>
          Refuse
        </button>
      </div>
    </div>
  )
}

export default RequestContainer
