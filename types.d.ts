type TokenResponse = {
  access_token: string
  scope: string
  state: string
}

type User = {
  name: string
  bio: string
  email: string
  avatar_url: string
  repos_url: string
}
