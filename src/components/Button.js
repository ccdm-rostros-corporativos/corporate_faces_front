import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        mode != 'filter' && styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        mode === 'menu' && { backgroundColor: theme.colors.gray },
        mode === 'text' && { backgroundColor: theme.colors.gray, color: theme.colors.secondary },
        mode === 'search' && { backgroundColor: theme.colors.secondary },
        mode === 'filter' && { backgroundColor: theme.colors.secondary, width: '100%', marginVertical: 1 },
        style,
      ]}
      labelStyle={[
        mode != 'filter' ? { fontWeight: 'bold', fontSize: 15, lineHeight: 26 } : styles.text
      ]}
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
    color: theme.colors.secondary
  },
})
