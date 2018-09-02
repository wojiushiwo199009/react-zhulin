import * as actionType from '../constants/ActionTypes'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Config} from '../../config'

export const increment = (count) => ({type: actionType.INCREMENT, count: count})
export const decrement = (count) => ({type: actionType.DECREMENT, count: count})

export const loginLoading = (loading) => ({
  type: actionType.USER_LOGIN_LOADING,
  loginLoading: loading
})

export const loginSuccess = (data) => ({
  type: actionType.USER_LOGIN_SUCCESS,
  data: data
})
export const setUserExtInfo = (userExtInfo) => ({
  type: actionType.SET_USER_EXT_INFO,
  userExtInfo: userExtInfo
})
export const getName = (userName) => ({
  type: actionType.GET_NAME,
  userName: userName
})
export const logOut = (userName) => {
  return (dispatch) => {
    Cookies.remove('phoneNumber')
  }
}

export const login = () => {
  return (dispatch) => {
    // 假接口，看看就行
    // dispatch(loginLoading(true));
    return axios(Config['LOGIN_USER_INFO']).then((response) => {
      let userData = response['data']
      if (userData) {
        let roleCosdes = Config['USER_ROOT_ROLE']
        let roles = userData['roles'] || null
        let b = false
        if (roles) {
          for (let i = 0; i < roles.length; i++) {
            if (roleCosdes.indexOf(roles[i]['roleCode']) !== -1) {
              b = true
            }
          }
        }
        dispatch(loginSuccess({
          isLogin: true,
          loginUserInfo: userData,
          loginUserId: userData['loginId'] || null,
          loginUserName: userData['userName'] || null,
          userRole: userData['roles'] || null,
          isRootRole: b
        }))
        axios.get(Config['LOGIN_USER_EXT_INFO']).then((response) => {
          dispatch(setUserExtInfo(response['data']))
          dispatch(loginLoading(false))
        })
      }
    }).catch((e) => {
      dispatch(loginLoading(false))
    })
  }
}
