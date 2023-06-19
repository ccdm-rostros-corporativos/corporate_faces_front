import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

export default function LoginScreen({ navigation }) {

	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })

	const onLoginPressed = () => {
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)
		if (emailError || passwordError) {
		setEmail({ ...email, error: emailError })
		setPassword({ ...password, error: passwordError })
		return
		}
		navigation.reset({
		index: 0,
		routes: [{ name: 'BottomTab' }],
		})
	}

	return (
		<Background>
			<Logo />
			<Header>Rostros Corporativos</Header>
			<TextInput
				label="Email"
				returnKeyType="next"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: '' })}
				error={!!email.error}
				errorText={email.error}
				autoCapitalize="none"
				autoCompleteType="email"
				textContentType="emailAddress"
				keyboardType="email-address"
			/>
			<TextInput
				label="Password"
				returnKeyType="done"
				value={password.value}
				onChangeText={(text) => setPassword({ value: text, error: '' })}
				error={!!password.error}
				errorText={password.error}
				secureTextEntry
			/>
			<Button mode="contained" onPress={onLoginPressed}>
				Iniciar sesión
			</Button>
			<View style={styles.termsPrincipal}>
				<TouchableOpacity>
					<Text style={styles.terms}>Al continuar, acepta términos y condiciones.</Text>
				</TouchableOpacity>
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
  termsPrincipal: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  terms: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  title: {
	fontSize: 35,
	alignItems: 'center',
  }
})
