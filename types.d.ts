type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Commits: { repo: string } | undefined;
};

type CommitsScreenRouteProps = RouteProp<RootStackParamList, 'Commits'>

type CommitsScreenProps = {
  route: CommitsScreenRouteProps
  navigation: any
}

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

type Commit = {
  author: {
    name: string
    date: string
  }
  message: string
}

type CommitResponse = {
  node_id: string
  commit: Commit
  author?: {
    login: string
    avatar_url: string
  }
}
