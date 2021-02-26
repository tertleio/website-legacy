const forceHttpsIfProd = async (req, res, next) => {
  if (
    req.headers.host.includes('localhost') ||
    req.headers.host.includes('staging')
  )
    return next();
  // (!!) set env variables instead here
  else {
    if (!req.secure) {
      console.log('inside if ran');
      return res.redirect('https://' + req.headers.host + req.url);
    } else {
      return next();
    }
  }
};

module.exports = { forceHttpsIfProd };
