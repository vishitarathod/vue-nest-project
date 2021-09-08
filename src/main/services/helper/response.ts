class ResponseCode {
  //response 400
  res400 = (res, e, message) => {
    console.log(e);
    const json = JSON.stringify({
      message: message,
      error: e.details[0].message,
      status: 400,
    });
    // return e.details[0].message;
    return res.end(json);
  };
}

export default new ResponseCode();
