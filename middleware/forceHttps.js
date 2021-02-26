const forceHttpsIfProd = async (req, res, next) => {
  if (
    req.headers.host.includes('localhost') ||
    req.headers.host.includes('staging')
  ) {
    console.log('middleware ran');
    return next();
    // (!!) set env variables instead here
  } else {
    if (!req.secure) {
      console.log('inside if ran');
      res.redirect('https://' + req.headers.host + req.url);
      return next();
    } else if (!req.headers.host.includes('www.')) {
      res.redirect('https://www.' + req.headers.host + req.url);
      return next();
    }
    next();
  }
};

module.exports = { forceHttpsIfProd };
