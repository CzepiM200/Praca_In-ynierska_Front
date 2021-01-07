import axios from "axios"

const baseURL = `https://localhost:44374/api/`


// =========
// User
// =========

const baseUserURL = baseURL + `users/`
const baseUserRegisterURL = baseUserURL + `register`
const baseUserLoginURL = baseUserURL + `authenticate`

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

// =========
// Trainings
// =========

const baseTrainingsURL = baseURL + `activities/`

export const trainingsRequest = async (userData, quantity, callBackFunction) => {
  const config = {
    method: 'get',
    url: `${baseTrainingsURL}${quantity.page}/${quantity.number}`,
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

// =========
// Regions
// =========

const baseSpotURL = baseURL + `regions/`

const baseRegionsURL = baseSpotURL + `regions/`

export const regionsRequest = async (userData, quantity, callBackFunction) => {
  const config = {
    method: 'get',
    url: `${baseRegionsURL}${quantity.page}/${quantity.number}`,
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