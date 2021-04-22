import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { Button, Image, SafeAreaView, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

type Props = {
  setUser: (user: User | null) => void
}

export default function HomeScreen({ setUser }: Props) {
  const navigation = useNavigation()
  const [text, setText] = useState('facebook/react-native')

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            setUser(null)
          }}
          title="Logout"
        />
      ),
    })
  }, [navigation])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Image
        style={{ margin: 20, height: 150, width: 150 }}
        source={{
          uri:
            'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        }}
      />
      <View style={{ padding: 15, flexDirection: 'row' }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            width: 200,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 5,
          }}
          placeholder="Find a repository..."
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Button
          title="Submit"
          onPress={async () => {
            navigation.navigate('Commits', { repo: text })
          }}
        />
      </View>
    </SafeAreaView>
  )
}
