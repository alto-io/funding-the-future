const axios = require('axios')
import * as Config from '../config'

const getLeaderboard = async (id, token) => {
  return axios({
    method: 'GET',
    url: Config.LEADERBOARD_URL + id,
    params: {
      limit: 10
    },
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(function (response) {
      return response.data.records
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
      return null
    })
}

export default getLeaderboard
