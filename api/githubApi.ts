const prefixUrl = 'https://api.github.com'

async function get(url: string) {
  return await fetch(prefixUrl + url)
}

async function getWithAuth(token: string, url: string) {
  return await fetch(prefixUrl + url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'token ' + token,
    },
  })
}

export default { get, getWithAuth }
