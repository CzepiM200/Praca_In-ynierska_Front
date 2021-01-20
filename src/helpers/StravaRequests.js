const config = {
  //"access_token"  : "Your apps access token (Required for Quickstart)",
  "client_id"     : "56751",
  "client_secret" : "6940bfbe9404b4e88ebea86eb2bff5f78005c3d1",
  "redirect_uri"  : "http://localhost:3000/strava/auth",
};

strava.config(config)

export const getAthleteRequest = () => {
  const payload = await strava.athlete.get({})
  console.log(payload)
}