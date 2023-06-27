import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        mode === 'menu' && { backgroundColor: theme.colors.gray },
        mode === 'text' && { backgroundColor: theme.colors.gray, textColor:theme.colors.secondary },
        mode === 'search' && { backgroundColor: theme.colors.gray },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 15,
    paddingVertical: 2,
    // marginTop: 25,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})
