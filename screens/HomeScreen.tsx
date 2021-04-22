import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Button, Text, View } from 'react-native'

type Props = {
  setUser: (user: User | null) => void
  setAccessToken: (accessToken: string) => void
}
export default function HomeScreen({ setUser, setAccessToken }: Props) {
  const navigation = useNavigation()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            setUser(null)
            setAccessToken('')
          }}
          title="Logout"
        />
      ),
    })
  }, [navigation])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  )
}
