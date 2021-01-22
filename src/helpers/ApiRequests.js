import axios from "axios"

const baseApiURL = `https://localhost:44374/api/`
const baseURL = `https://localhost:44374/`

// =========
// User - email
// =========

const baseUserURL = baseURL + `users/`
const baseUserRegisterURL = baseUserURL + `register`
const baseUserLoginURL = baseUserURL + `authenticate`

export const registerRequest = async (newUserData, callBackFunction) => {
  
  console.log(baseUserRegisterURL);
  console.log(newUserData);
  console.log(JSON.stringify(newUserData));

  const config = {
    method: 'post',
    url: `https://localhost:44374/users/register`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(newUserData)
  };  
  
  axios(config)
    .then(resp => {
      callBackFunction.success(resp)
    })
    .catch(error => {
      callBackFunction.error(error)
    });
}
  
export const loginRequest = async (loginData, callBackFunctions) => {
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
      callBackFunctions.success(response)
    })
    .catch(function (error) {
      callBackFunctions.error(error)
    });
}

// =========
// User - google
// =========

const baseUserGoogleLoginURL = baseUserURL + `authenticate/google`

export const googleLoginRequest = async (authorizeData, callBackFunction) => {
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
const editTrainingsURL = baseTrainingsURL + `edit`
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

export const editTrainingRequest = async (userData, trainingData, callBackFunction) => {
  const config = {
    method: 'put',
    url: editTrainingsURL,
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
const baseRoutesURL = baseSpotURL + `routes/`
const baseAllSimpleItemsURL = baseSpotURL + `all/`
const addRegionURL = baseSpotURL + `regions/add`
const addPlaceURL = baseSpotURL + `places/add`
const addRouteURL = baseSpotURL + `routes/add`
const editRegionURL = baseSpotURL + `regions/edit`
const editPlaceURL = baseSpotURL + `places/edit`
const editRouteURL = baseSpotURL + `routes/edit`
const deleteRegionURL = baseSpotURL + `regions/remove`
const deletePlaceURL = baseSpotURL + `places/remove`
const deleteRouteURL = baseSpotURL + `routes/remove`
const getRegionDetailsByIdURL = baseSpotURL + `regions/details`
const getPlaceDetailsByIdURL = baseSpotURL + `places/details`
const getRouteDetailsByIdURL = baseSpotURL + `routes/details`


// Get list of regions with places belong to it
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

// Get routes belong to particular place 
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

// Get list of regions, places and routes
export const allSimpleItemsRequest = async (userData, callBackFunction) => {
  const config = {
    method: 'get',
    url: baseAllSimpleItemsURL,
    headers: { 
      'Authorization': `Bearer ${userData.token}`
    }
  };

  axios(config)
  .then(function (response) {
    if(response.data === "")
      callBackFunction({regions: [], places: [], routes: []});
    else
      callBackFunction(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

// Add new region
export const addRegionRequest = async (userData, region, callBackFunctions) => {
  const config = {
    method: 'post',
    url: addRegionURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data: JSON.stringify(region)
  };

  axios(config)
  .then(function (response) {
    //console.log(response);
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    //console.log(error);
    callBackFunctions.error(error)
  });
}

// Add new place
export const addPlaceRequest = async (userData, place, callBackFunctions) => {
  const config = {
    method: 'post',
    url: addPlaceURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data: JSON.stringify(place)
  };
  console.log(place);
  axios(config)
  .then(function (response) {
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    callBackFunctions.error(error)
  });
}

// Add new route
export const addRouteRequest = async (userData, route, callBackFunctions) => {
  const config = {
    method: 'post',
    url: addRouteURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data: JSON.stringify(route)
  };
  console.log(route);
  axios(config)
  .then(function (response) {
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    callBackFunctions.error(error)
  });
}

// Delete region
export const deleteRegionRequest = async (userData, regionId, callBackFunctions) => {
  const config = {
    method: 'delete',
    url: deleteRegionURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data: JSON.stringify(regionId)
  };

  axios(config)
  .then(function (response) {
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    callBackFunctions.error(error)
  });
}

// Delete place
export const deletePlaceRequest = async (userData, placeId, callBackFunctions) => {
  const config = {
    method: 'delete',
    url: deletePlaceURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data: JSON.stringify(placeId)
  };

  axios(config)
  .then(function (response) {
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    callBackFunctions.error(error)
  });
}

// Delete route
export const deleteRouteRequest = async (userData, routeId, callBackFunctions) => {
  const config = {
    method: 'delete',
    url: deleteRouteURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data: JSON.stringify(routeId)
  };

  axios(config)
  .then(function (response) {
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    callBackFunctions.error(error)
  });
}

// Get place details
export const getPlaceDetailsById = async (userData, placeId, callBackFunctions) => {
  const config = {
    method: 'get',
    url: `${getPlaceDetailsByIdURL}/${placeId}`,
    headers: { 
      'Authorization': `Bearer ${userData.token}`
    }
  };

  axios(config)
  .then(function (response) {
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    callBackFunctions.error(error)
  });
}

// Get route details
export const getRouteDetailsById = async (userData, routeId, callBackFunctions) => {
  const config = {
    method: 'get',
    url: `${getRouteDetailsByIdURL}/${routeId}`,
    headers: { 
      'Authorization': `Bearer ${userData.token}`
    }
  };

  axios(config)
  .then(function (response) {
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    callBackFunctions.error(error)
  });
}

// Edit region
export const editRegionRequest = async (userData, region, callBackFunctions) => {
  const config = {
    method: 'put',
    url: editRegionURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data: JSON.stringify(region)
  };

  axios(config)
  .then(function (response) {
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    callBackFunctions.error(error)
  });
}

// Edit place
export const editPlaceRequest = async (userData, place, callBackFunctions) => {
  const config = {
    method: 'put',
    url: editPlaceURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data: JSON.stringify(place)
  };
  console.log(place);
  axios(config)
  .then(function (response) {
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    callBackFunctions.error(error)
  });
}

// Edit route
export const editRouteRequest = async (userData, route, callBackFunctions) => {
  const config = {
    method: 'put',
    url: editRouteURL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    },
    data: JSON.stringify(route)
  };
  console.log(route);
  axios(config)
  .then(function (response) {
    callBackFunctions.succes(response)
  })
  .catch(function (error) {
    callBackFunctions.error(error)
  });
}