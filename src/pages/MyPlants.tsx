import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Header } from '../components/Header'
import colors from '../styles/colors'
import waterdrop from '../assets/waterdrop.png'
import { FlatList } from 'react-native-gesture-handler'
import { loadPlant, PlantProps } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import fonts from '../styles/fonts'
import { PlantCardSecundary } from '../components/PlantCardSecundary'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },

  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  spotlightImage: {
    width: 60,
    height: 60
  },

  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20
    // textAlign: 'justify'
  },

  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginVertical: 20
  }
})

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWaterd, setNextWaterd] = useState<string>()

  useEffect(() => {
    async function loadStorage() {
      const plantsStored = await loadPlant()

      const nextTime = formatDistance(
        new Date(plantsStored[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      )

      setNextWaterd(
        `Não esqueça de regar a ${plantsStored[0].name} às ${nextTime} horas`
      )
      setMyPlants(plantsStored)
      setLoading(false)
    }

    loadStorage()
  }, [])

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <PlantCardSecundary data={item} />}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  )
}
