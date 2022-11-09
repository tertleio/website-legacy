function getPagename() {
  const hasTrailingSlash = window.location.pathname.endsWith('/');
  const pathsArr = window.location.pathname.split('/');
  const pagename = pathsArr[pathsArr.length - (hasTrailingSlash ? 2 : 1)];

  return pagename ? pagename : 'home';
}

export default getPagename;
