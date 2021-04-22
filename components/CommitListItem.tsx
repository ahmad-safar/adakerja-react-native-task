import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type Props = {
  data: CommitResponse
}

export default function CommitListItem({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message} numberOfLines={1}>
        {data.commit.message}
      </Text>
      <View style={styles.container2}>
        <Image
          style={{ width: 30, height: 30, borderRadius: 10, marginRight: 5 }}
          source={
            data.author
              ? {
                  uri: data.author.avatar_url,
                }
              : require('../assets/anonim.png')
          }
        />
        <View>
          <Text>
            {data.commit.author.name}{' '}
            {data.author ? '(' + data.author.login + ')' : ''}{' '}
          </Text>
          <Text style={styles.commitedDate}>
            Commited on {data.commit.author.date.substring(0, 10)}{' '}
            {data.commit.author.date.substring(11, 19)}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  container2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  message: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  commitedDate: {
    color: '#586069',
  },
})
