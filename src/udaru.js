import Axios from "axios";
import auth from "./auth";

const axios = Axios.create({
  baseURL: "http://localhost:8080"
});

axios.interceptors.request.use(config => {
  if (!config.headers.authorization) {
    config.headers = { authorization: auth.getUserId() };
  }
  return config;
});

export default {
  async checkUserForLogin(userId) {
    const { data } = await axios.get(
      `/authorization/users/${encodeURIComponent(userId)}`,
      { headers: { authorization: userId } }
    );

    return data;
  }
};
