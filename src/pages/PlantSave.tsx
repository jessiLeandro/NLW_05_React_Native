import React, { useState } from 'react'

import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView
} from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { SvgFromUri } from 'react-native-svg'
import { useRoute } from '@react-navigation/core'
import DataTimerPicker, { Event } from '@react-native-community/datetimepicker'

import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { isBefore } from 'date-fns/esm'
import { format } from 'date-fns'
import { PlantProps, savePlant } from '../libs/storage'
import { useNavigation } from '@react-navigation/native'

interface Params {
  plant: PlantProps
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shape
  },
  plantName: {
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 15,
    fontSize: 24
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    marginTop: 10,
    fontSize: 17
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.heading,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel: {
    alignItems: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.heading
  }
})

export function PlantSave() {
  const route = useRoute()
  const navigation = useNavigation()
  const [selectDateTime, setSelectDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

  const { plant } = route.params as Params

  function handleChangeTime(event: Event, dataTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker((oldState) => !oldState)
    }

    if (dataTime && isBefore(dataTime, new Date())) {
      setSelectDateTime(new Date())
      return Alert.alert('Escolha uma hora no futuro!')
    }

    if (dataTime) setSelectDateTime(dataTime)
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker((oldState) => !oldState)
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectDateTime
      })

      navigation.navigate('Confirmation', {
        title: 'Tudo certo!',
        subtitle:
          'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado',
        nextScreen: 'MyPlants'
      })
    } catch {
      Alert.alert('Não foi possível salvar!')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} width={150} height={150} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser alertado
        </Text>

        {showDatePicker && (
          <DataTimerPicker
            value={selectDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity
            onPress={handleOpenDateTimePickerForAndroid}
            style={styles.dateTimePickerButton}>
            <Text style={styles.dateTimePickerText}>
              Mudar {format(selectDateTime, 'HH: mm')}
            </Text>
          </TouchableOpacity>
        )}

        <Button title="Cadastrar planta" onPress={handleSave} />
      </View>
    </View>
  )
}
