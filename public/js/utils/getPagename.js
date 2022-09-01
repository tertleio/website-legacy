function getPagename() {
  const pathname = window.location.pathname.split('/');
  const filename = pathname[pathname.length - 1];
  const [pagename] = filename.split('.', [1]); // TODO: remove when ext is removed

  return pagename;
}

export default getPagename;
