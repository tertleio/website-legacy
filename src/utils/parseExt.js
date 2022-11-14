function parseExt(path) {
  const split = path.split('.');
  const ext = split[split.length - 1];
  return ext;
}

module.exports = parseExt;
