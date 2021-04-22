import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  copntent: {
    flex: 1,
    width: '100%'
  },

  emoji: {
    fontSize: 44
  },

  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },

  headder: {
    alignItems: 'center'
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20
  }
})

export function UserIdentification() {
  const navigation = useNavigation()
  const [isFocused, setIsFocused] = useState(false)
  const [name, setName] = useState<string>()

  function handleSubmit() {
    navigation.navigate('Confirmation')
  }

  function handleInputBlur() {
    setIsFocused(false)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setName(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.copntent}>
            <View style={styles.form}>
              <View style={styles.headder}>
                <Text style={styles.emoji}>😁</Text>

                <Text style={styles.title}>Como podemos{'\n'}chamar você</Text>
              </View>

              <TextInput
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
                style={[
                  styles.input,
                  (isFocused || !!name) && { borderColor: colors.green }
                ]}
                placeholder="Digite um nome"
              />

              <View style={styles.footer}>
                <Button onPress={handleSubmit} title="Confirmar" />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
