import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import CommitListItem from './CommitListItem'

type Props = {
  commits: CommitResponse[]
}

export default function CommitList({ commits }: Props) {
  const renderItem: ListRenderItem<CommitResponse> = (info) => (
    <CommitListItem data={info.item}></CommitListItem>
  )

  return (
    <FlatList
      style={{ marginTop: 5 }}
      data={commits}
      renderItem={renderItem}
      keyExtractor={(commit) => commit.node_id}
    />
  )
}
