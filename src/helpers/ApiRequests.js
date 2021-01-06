import axios from "axios"

const baseURL = `https://localhost:44374/api/`

const baseUserURL = baseURL + `users/`
const baseUserRegisterURL = baseUserURL + `register`
const baseUserLoginURL = baseUserURL + `authenticate`

const baseTrainingsURL = baseURL + `activities/`

export const registerRequest = async (callBackFunction, newUserData) => {
    axios.post(baseUserRegisterURL, newUserData)
    .then(resp => {
        console.log(resp.data);
    })
    .catch(error => {
        console.log(error);
    });
}
  
export const loginRequest = async (loginData, callBackFunction) => {
    const config = {
      method: 'post',
      url: 'https://localhost:44374/users/authenticate',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(loginData)
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
      callBackFunction(response.data);
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

export const trainingsRequest = async (userData, quantity, callBackFunction) => {
  var config = {
    method: 'get',
    url: `https://localhost:44374/api/activities/${quantity.page}/${quantity.number}`,
    headers: { 
      'Authorization': `Bearer ${userData.token}`
    }
  };

  axios(config)
  .then(function (response) {
    console.log(response.data);
    callBackFunction(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  
}