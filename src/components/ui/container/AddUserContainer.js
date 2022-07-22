import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import clsx from 'clsx'

//My import
import axiosToken from '../../../api/axiosToken'
import { selectState } from "../../features/auth/authSlice"
import { selectItemUser, selectStateContainer } from '../../features/container/containerSlice'
import style from './css/container.module.scss'
import ListItem from '../utils/ListItem'

function AddUserContainer({className}) {
  const state = useSelector(selectState)
  const containerState = useSelector(selectStateContainer)
  const infoItem = containerState.items.itemUser
  const dispatch = useDispatch()

  console.log(infoItem)
  async function handleSentRequest() {
    try {
      await axiosToken.post('user/addRequest', {
        friend: { Username: infoItem.Username },
        mySelf: state.currentUser
      }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      })
      dispatch(selectItemUser({ ...infoItem, submitted: true }))
    } catch (e) {
      alert("Sent failed Add")
    }
  }
  return (
    <div className={clsx(className, style.addUserContainer)}>
      <ListItem 
        avatar={infoItem.Name.split('')[0]}
        name={infoItem.Name}
      ></ListItem>
      <div className={style.buttonGroup}>
        {infoItem.submitted || infoItem.idUserLog ?
          (<button className={style.btnWaitAccept}>
            <i className="fa-solid fa-hourglass-start"></i>
            Wait Accept
          </button>)
          :
          (<button className={style.btnAdd} onClick={handleSentRequest}>
            <i className="fa-solid fa-user-plus"></i>
            Add friend
          </button>)
        }
      </div>
    </div>
  )
}

export default AddUserContainer
