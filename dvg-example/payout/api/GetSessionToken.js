const axios = require('axios')
import * as Config from '../config'

const getSessionToken = async (username) => {
  return axios({
    method: 'POST',
    url: Config.AUTH_URL,
    params: {
      create: "true",
      username: username
    },
    auth: Config.NAKAMA_AUTH,
    data: {
      id: "uniqueidentifier"
    }
  })
    .then(function (response) {
      return response.data.token
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return null
    })
}

export default getSessionToken
