import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  DiscoveryDocument,
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
} from 'expo-auth-session'
import { StatusBar } from 'expo-status-bar'
import * as WebBrowser from 'expo-web-browser'
import React, { useState } from 'react'
import githubApi from './api/githubApi'
import { CommitsScreen, HomeScreen, LoginScreen } from './screens'
import { notifyMessage } from './utils'

WebBrowser.maybeCompleteAuthSession()

const Stack = createStackNavigator()

// TODO: this should use Environment Variables
// For test purposes only:
const config = {
  clientId: '43697642f0687bc9b744',
  clientSecret: 'bb2cc8b3b8ec952f4fc1574f9de1ba2e21d7c0ec',
  scopes: [],
  redirectUri: makeRedirectUri({ path: 'redirect', preferLocalhost: true }),
}

// Endpoint
const discovery: DiscoveryDocument = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/' + config.clientId,
}

export default function App() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>()
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: config.clientId,
      scopes: config.scopes,
      redirectUri: config.redirectUri,
    },
    discovery
  )

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      async function fetchUser() {
        // TODO: this should be performed in a server and not here in the application.
        // For test purposes only:
        const tokenRes = await exchangeCodeAsync(
          {
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            code,
            redirectUri: config.redirectUri,
          },
          discovery
        )

        const data = await githubApi.getWithAuth(tokenRes.accessToken, '/user')
        const userData: User = await data.json()

        setUser(userData)
        setLoading(false)
      }
      fetchUser()
    } else if (response?.type === 'error') {
      notifyMessage('Something went wrong')
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [response])

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                loading={loading}
                setLoading={setLoading}
                promptAsync={promptAsync}
                request={request}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen
              name="Commits"
              options={({ route }: CommitsScreenRouteProps) => ({
                title: route.params?.repo,
              })}
            >
              {(props: CommitsScreenProps) => (
                <CommitsScreen {...props} setUser={setUser} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
