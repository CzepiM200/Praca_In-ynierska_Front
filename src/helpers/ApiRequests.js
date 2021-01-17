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
const addTrainingsURL = baseTrainingsURL + `add`
const deleteTrainingsURL = baseTrainingsURL + `remove`

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

export const addTrainingRequest = async (userData, trainingData, callBackFunction) => {
  const config = {
    method: 'post',
    url: addTrainingsURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data : JSON.stringify(trainingData)
  };

  axios(config)
  .then(function (response) {
    callBackFunction(false);
  })
  .catch(function (error) {
    callBackFunction(true);
  });
}

export const deleteTrainingRequest = async (userData, trainingId, callBackFunction) => {
  const config = {
    method: 'delete',
    url: deleteTrainingsURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data : JSON.stringify(trainingId)
  };

  axios(config)
  .then(function (response) {
    callBackFunction(true);
  })
  .catch(function (error) {
    callBackFunction(false);
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
    if(response.data === "")
      callBackFunction([]);
    else
      callBackFunction(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

const baseRoutesURL = baseSpotURL + `routes/`
export const routesByPlaceRequest = async (userData, placeId, callBackFunction) => {
  const config = {
    method: 'get',
    url: `${baseRoutesURL}${placeId}`,
    headers: { 
      'Authorization': `Bearer ${userData.token}`
    }
  };

  axios(config)
  .then(function (response) {
    if(response.data === "")
      callBackFunction([]);
    else
      callBackFunction(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}