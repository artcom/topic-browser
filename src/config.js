import axios from "axios"

export async function loadConfig() {
  const configFromEnv = {
    wsBrokerUri: process.env.WS_BROKER_URI,
    httpBrokerUri: process.env.HTTP_BROKER_URI,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  }

  const configFromJson = await loadConfigFromJson("config.json")

  return { ...configFromEnv, ...configFromJson }
}

async function loadConfigFromJson(path) {
  try {
    const response = await axios.get(path)
    return response.data
  } catch (error) {
    return {}
  }
}
