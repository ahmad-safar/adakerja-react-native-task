import { RouteProp, useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import {
  Button,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  Text,
} from 'react-native'
import githubApi from '../api/githubApi'
import CommitListItem from '../components/CommitListItem'
import Loading from '../components/Loading'

type CommitsScreenRouteProps = RouteProp<RootStackParamList, 'Commits'>

type Props = {
  route: CommitsScreenRouteProps
  setUser: (user: User | null) => void
}

export default function CommitsScreen({ route, setUser }: Props) {
  const { repo } = route.params!
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [reachLastPage, setReachLastPage] = useState(false)
  const [page, setPage] = useState(1)
  const [resMessage, setResMessage] = useState('')
  const [commits, setCommits] = useState<
    CommitResponse[] | { message: string }
  >([])
  const renderItem: ListRenderItem<CommitResponse> = (info) => (
    <CommitListItem data={info.item}></CommitListItem>
  )

  async function getCommits() {
    if (reachLastPage) return

    const getRepo = await githubApi.get(
      `/repos/${repo}/commits?page=${page}&per_page=20`
    )
    const res: CommitResponse[] | { message: string } = await getRepo.json()

    if (getRepo.ok) {
      setCommits([
        ...(commits as CommitResponse[]),
        ...(res as CommitResponse[]),
      ])
      setPage(page + 1)

      if ((res as CommitResponse[]).length == 0) {
        setReachLastPage(true)
      }
    } else if ((res as { message: string }).message == 'Not Found') {
      setResMessage('Repository Not Found')
    } else {
      setResMessage('Something went wrong')
    }
    setLoading(false)
  }

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

  React.useEffect(() => {
    async function fetching() {
      await getCommits()
    }
    fetching()
  }, [])

  if (loading) {
    return <Loading />
  }
  if (resMessage != '') {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text>{resMessage}</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <FlatList
        style={{ paddingTop: 5 }}
        data={commits as CommitResponse[]}
        renderItem={renderItem}
        keyExtractor={(commit) => commit.node_id}
        onEndReached={getCommits}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
      />
    </SafeAreaView>
  )
}
