import http from "./http-common"

const sendmail = (email, text) => {
  return http.post( "/sendmail", {
    email,
    text,
  })
    .then((response) => {
      return response.data;
    });
};

export default {sendmail};



