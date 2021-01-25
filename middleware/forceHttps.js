const forceHttpsIfProd = async (req, res, next) => {
  if (!req.headers.host.includes('staging') && !res.secure) {
    console.log(req.secure);
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
};

module.exports = { forceHttpsIfProd };
