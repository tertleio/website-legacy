function simFetch(vals) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        code: 200,
        status: 'success',
        msg: 'Some message response',
        payload: { vals },
      });
    }, 100);
  });
}
