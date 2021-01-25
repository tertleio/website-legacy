const forceHttpsIfProd = async (req, res, next) => {
  console.log('force ran');
  if (!res.secure) {
    res.redirect('https://' + req.headers.host + req.url);
    next();
    return;
  }
  next();
};

module.exports = { forceHttpsIfProd };
