import axios from "axios";
export default {
  create: (authToken, userData) => {
    axios.post("/api/chat/", userData, {
      headers: { Authorization: `Bearer${authToken}` },
    });
  },
  findChatInstance: authToken => {
    axios.get("/api/chat/", {
      headers: { Authorization: `Bearer${authToken}` },
    });
  },
  addComment: (authToken, userData) => {
    axios.put("/api/chat/comment", userData, {
      headers: { Authorization: `Bearer${authToken}` },
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
