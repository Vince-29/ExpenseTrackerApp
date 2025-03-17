import React from "react";
import { View, StyleSheet } from "react-native";

function Card({ children, style }) {
	return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 8,
		padding: 15,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
});

export default Card;
