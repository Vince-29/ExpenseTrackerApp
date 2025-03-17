import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function Button({ onPress, title, type = "primary", style, textStyle }) {
	let buttonStyle = styles.primaryButton;
	let buttonTextStyle = styles.primaryButtonText;

	if (type === "secondary") {
		buttonStyle = styles.secondaryButton;
		buttonTextStyle = styles.secondaryButtonText;
	} else if (type === "danger") {
		buttonStyle = styles.dangerButton;
		buttonTextStyle = styles.dangerButtonText;
	}

	return (
		<TouchableOpacity style={[buttonStyle, style]} onPress={onPress}>
			<Text style={[buttonTextStyle, textStyle]}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	primaryButton: {
		backgroundColor: "#2196F3",
		padding: 12,
		borderRadius: 5,
		alignItems: "center",
	},
	primaryButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	secondaryButton: {
		backgroundColor: "#f2f2f2",
		padding: 12,
		borderRadius: 5,
		alignItems: "center",
	},
	secondaryButtonText: {
		color: "#333",
		fontWeight: "bold",
		fontSize: 16,
	},
	dangerButton: {
		backgroundColor: "#ffebee",
		padding: 12,
		borderRadius: 5,
		alignItems: "center",
	},
	dangerButtonText: {
		color: "#c62828",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default Button;
