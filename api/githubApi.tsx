async function get(token: string, url: string) {
  const prefixUrl = 'https://api.github.com'
  return await fetch(prefixUrl + url, {
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'token ' + token,
    }),
  })
}

export default { get }
