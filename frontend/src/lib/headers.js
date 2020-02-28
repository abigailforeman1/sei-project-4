import Cookies from 'js-cookie' 
const csrftoken = Cookies.get('csrftoken')
import Auth from './auth'

export const headers = {
  common: {
    'X-CSRF-TOKEN': csrftoken
  },
  headers: {
    Authorization: `Bearer ${Auth.getToken()}`
  }
}