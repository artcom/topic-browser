import axios from "axios"

export async function loadConfig() {
  const configFromEnv = {
    wsBrokerUri: process.env.WS_BROKER_URI ? process.env.WS_BROKER_URI : undefined,
    httpBrokerUri: process.env.HTTP_BROKER_URI ? process.env.HTTP_BROKER_URI : undefined,
    username: process.env.USERNAME ? process.env.USERNAME : undefined,
    password: process.env.PASSWORD ? process.env.PASSWORD : undefined
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
