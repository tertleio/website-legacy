function parseFileAndExt(path) {
  const splitPath = path.split('/');
  const fileExt = splitPath[splitPath.length - 1];
  const splitFile = fileExt.split('[');
  const filename = splitFile[0];
  const ext = splitFile[1].split('.')[1];

  return { filename, ext };
}

export default parseFileAndExt;
