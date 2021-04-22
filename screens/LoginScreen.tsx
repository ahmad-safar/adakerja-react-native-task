import {
  AuthRequest,
  AuthRequestPromptOptions,
  AuthSessionResult,
} from 'expo-auth-session'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

type Props = {
  loading: boolean
  request: AuthRequest | null
  setLoading: (loading: boolean) => void
  promptAsync: (
    options?: AuthRequestPromptOptions | undefined
  ) => Promise<AuthSessionResult>
}

export default function Login({
  loading,
  setLoading,
  request,
  promptAsync,
}: Props) {
  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title={!loading ? 'Login with Github' : 'Logging in...'}
        onPress={() => {
          promptAsync()
          setLoading(true)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
