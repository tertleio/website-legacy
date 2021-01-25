const forceHttpsIfProd = async (req, res, next) => {
  console.log('this ran');
  if (!req.headers.host.includes('staging') && !req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
};

module.exports = { forceHttpsIfProd };
