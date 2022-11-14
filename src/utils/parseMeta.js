const parseMeta = (file, tokens = ['---', '---']) => {
  function toJson(data) {
    const tmpObj = {},
      lines = data.trim().split('\n');

    lines.forEach(function (line, i) {
      const arr = line.trim().split(':');
      tmpObj[arr.shift()] = arr.join(':').trim();
    });

    return tmpObj;
  }

  function getHeader(data) {
    const strReg = '^' + tokens[0] + '([\\s|\\S]*?)' + tokens[1],
      reg = new RegExp(strReg),
      newFile = reg.exec(data);

    return newFile ? newFile[1] : new Error('!parse header');
  }

  function getContent(data) {
    const strReg = '^ *?\\' + tokens[0] + '[^]*?' + tokens[1] + '*',
      reg = new RegExp(strReg),
      content = data.replace(reg, '');

    return content;
  }

  const header = getHeader(file);
  const content = getContent(file);
  return { meta: toJson(header), content: content };
};

module.exports = parseMeta;
