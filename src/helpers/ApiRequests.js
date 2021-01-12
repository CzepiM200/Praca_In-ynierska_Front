import axios from "axios"

const baseApiURL = `https://localhost:44374/api/`
const baseURL = `https://localhost:44374/`

// =========
// User - email
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
      url: baseUserLoginURL,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(loginData)
    };
    
    axios(config)
    .then(function (response) {
      callBackFunction(response.data);
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

// =========
// User - google
// =========

const baseUserGoogleLoginURL = baseUserURL + `authenticate/google`

export const googleLoginRequest = async (authorizeData, callBackFunction) => {
  console.log(authorizeData);
  const config = {
    method: 'post',
    url: baseUserGoogleLoginURL,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(authorizeData)
  };
  
  axios(config)
  .then(function (response) {
    callBackFunction(response.data);
    return true;
  })
  .catch(function (error) {
    return false;
  });
}

// =========
// Trainings
// =========


const baseTrainingsURL = baseApiURL + `activities/`

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
    callBackFunction(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

// =========
// Regions
// =========

const baseSpotURL = baseApiURL + `regions/`

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
    callBackFunction(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  
}