const forceHttpsIfProd = async (req, res, next) => {
  if (!req.secure) {
    console.log('inside if ran');
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
};

module.exports = { forceHttpsIfProd };
