import {
  AuthRequest,
  AuthRequestPromptOptions,
  AuthSessionResult,
} from 'expo-auth-session'
import React from 'react'
import { Button, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '../components/Loading'

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
  if (loading) return <Loading />

  return (
    <SafeAreaView style={styles.container}>
      <Button
        disabled={!request}
        title="Login with Github"
        onPress={() => {
          promptAsync()
          setLoading(true)
        }}
      />
    </SafeAreaView>
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
