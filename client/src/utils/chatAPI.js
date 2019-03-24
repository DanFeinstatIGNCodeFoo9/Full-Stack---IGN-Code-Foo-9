import axios from "axios";
export default {
  create: (authToken, userData) => {
    axios.post("/api/chat/", userData, {
      headers: { Authorization: authToken },
    });
  },
  findChatInstance: authToken => {
    axios.get("/api/chat/", {
      headers: { Authorization: authToken },
    });
  },
  addComment: (authToken, userData) => {
    axios.put("/api/chat/comment", userData, {
      headers: { Authorization: authToken },
    });
  },
};

// signUp: userData => {
//     return axios.post(`/api/user/register`, userData);
//   },

// var headers = {
//     'Content-Type': 'application/json',
//     'Authorization': 'JWT fefege...'
// }
// axios.post(Helper.getUserAPI(), data, {headers: headers})
