import axios from "axios";
export default {
  create: (authToken, userData) => {
    return axios.post("/api/chat/", userData, {
      headers: { "x-access-token": authToken },
    });
  },
  findChatInstance: authToken => {
    return axios.get("/api/chat/", {
      headers: { "x-access-token": authToken },
    });
  },
  addComment: (authToken, userData) => {
    return axios.put("/api/chat/comment", userData, {
      headers: { "x-access-token": authToken },
    });
  },
};
