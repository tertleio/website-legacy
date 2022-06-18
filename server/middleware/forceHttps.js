const forceHttpsIfProd = async (req, res, next) => {
  if (
    req.headers.host.includes('localhost') ||
    req.headers.host.includes('staging')
  ) {
    return next();
    // (!!) set env variables instead here
  }
  if (!req.secure) {
    res.redirect('https://' + req.headers.host + req.url);
    return next();
  }
  next();
};

module.exports = { forceHttpsIfProd };
