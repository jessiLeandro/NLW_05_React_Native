import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { EnvironmentButton } from '../components/EnvironmentButton'

import { Header } from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import api from '../services/api'
import { Load } from '../components/Load'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.background
  },

  wrapper: {
    paddingHorizontal: 30
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },

  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },

  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },

  contentContainerStyle: {}
})

interface EnvironmentProps {
  key: string
  title: string
}

interface PlantProps {
  id: string
  name: string
  about: string
  water_tips: string
  photo: string
  environments: [string]
  frequency: {
    times: number
    repeat_every: string
  }
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
  const [plats, setPlats] = useState<PlantProps[]>([])
  const [filteredPlats, setFilteredPlats] = useState<PlantProps[]>([])
  const [environmentSelected, setEnvironmentSelected] = useState('all')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get(
        'plants_environments',
        // 'plants_environments?_sort=title&_order=asc',
        {
          params: {
            _sort: 'title',
            _order: 'asc'
          }
        }
      )
      setEnvironments([{ key: 'all', title: 'Todos' }, ...data])
    }

    fetchEnvironment()
  }, [])

  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get('plants', {
        params: {
          _sort: 'name',
          _order: 'asc',
          _page: page,
          _limit: 8
        }
      })

      if (!data) return setLoading(true)

      if (page > 1) {
        setPlats((oldValue) => [...oldValue, ...data])
        setFilteredPlats((oldValue) => [...oldValue, ...data])
      } else {
        setPlats(data)
        setFilteredPlats(data)
      }

      setLoading(false)
      setLoadingMore(false)
    }

    fetchPlants()
  }, [page])

  function handleFatchMore(distance: number) {
    if (distance < 1) return

    setLoadingMore(true)
    setPage((oldValue) => oldValue + 1)
  }

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment)

    if (environment === 'all') return setFilteredPlats(plats)

    const filtered = plats.filter((plant) =>
      plant.environments.includes(environment)
    )

    setFilteredPlats(filtered)
  }

  if (loading) return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>Você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={environments}
          contentContainerStyle={styles.environmentList}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={environmentSelected === item.key}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlats}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFatchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : null
          }
        />
      </View>
    </View>
  )
}
