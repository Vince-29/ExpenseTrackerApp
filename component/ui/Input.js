import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function Input({
	label,
	value,
	onChangeText,
	placeholder,
	multiline = false,
	keyboardType = "default",
	numberOfLines = 1,
	style,
}) {
	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={[styles.input, multiline && styles.multilineInput, style]}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				multiline={multiline}
				numberOfLines={numberOfLines}
				keyboardType={keyboardType}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
		color: "#333",
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 5,
		paddingHorizontal: 10,
		backgroundColor: "#f9f9f9",
	},
	multilineInput: {
		height: 80,
		paddingTop: 10,
		textAlignVertical: "top",
	},
});

export default Input;
