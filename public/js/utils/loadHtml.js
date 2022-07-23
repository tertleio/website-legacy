async function loadHtml(htmlRelativeUrl, baseUrl) {
  const htmlUrl = new URL(htmlRelativeUrl, baseUrl).href;
  const res = await fetch(htmlUrl);

  return res.text();
}

export default loadHtml;
