import axios from "axios";
export default {
  addComment: (authToken, userData) => {
    axios.post("/api/ffa/", userData, {
      headers: { Authorization: authToken },
    });
  },
  getComments: authToken => {
    axios.get("/api/ffa/", {
      headers: { Authorization: authToken },
    });
  },
};
