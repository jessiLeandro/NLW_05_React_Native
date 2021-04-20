import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'
import colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  }
})

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity {...rest} style={styles.button} activeOpacity={0.8}>
      <Text>{'>'}</Text>
    </TouchableOpacity>
  )
}
