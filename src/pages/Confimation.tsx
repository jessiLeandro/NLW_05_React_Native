import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'

import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
  title: string
  subtitle: string
  buttonTitle: string
  nextScreen: string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 30
  },

  footer: {
    width: '100%',
    paddingHorizontal: 75,
    marginTop: 20
  },

  emoji: {
    fontSize: 78
  },

  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading
  },

  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  }
})

export function Confirmation() {
  const route = useRoute()

  const { title, subtitle, buttonTitle, nextScreen } = route.params as Params

  const navigation = useNavigation()

  function handleMoveOn() {
    navigation.navigate(nextScreen)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  )
}
