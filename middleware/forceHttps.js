const forceHttpsIfProd = async (req, res, next) => {
  console.log('this ran');
  if (!req.headers.host.includes('staging') && !req.secure) {
    console.log('inside if ran');
    // return res.redirect('http://' + req.headers.host + '/hello');
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
};

module.exports = { forceHttpsIfProd };
