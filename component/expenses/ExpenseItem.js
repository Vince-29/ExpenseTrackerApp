// components/expense/ExpenseItem.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Card from "../ui/Card";
import Button from "../ui/Button";

function ExpenseItem({ expense, onPress, onEdit, onDelete }) {
	function handleButtonPress(event, action) {
		event.stopPropagation();
		action();
	}

	return (
		<TouchableOpacity onPress={onPress}>
			<Card>
				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.name}>{expense.name}</Text>
						<Text style={styles.amount}>
							₱ {parseFloat(expense.amount).toFixed(2)}
						</Text>
					</View>

					{expense.description ? (
						<Text
							style={styles.description}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{expense.description}
						</Text>
					) : null}
				</View>

				<View style={styles.actions}>
					<Button
						title="Edit"
						type="secondary"
						style={styles.editButton}
						onPress={(e) => handleButtonPress(e, onEdit)}
					/>

					<Button
						title="Delete"
						type="danger"
						style={styles.deleteButton}
						onPress={(e) => handleButtonPress(e, onDelete)}
					/>
				</View>
			</Card>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	content: {
		marginBottom: 10,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 6,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
		flex: 1,
	},
	amount: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#e53935",
	},
	description: {
		fontSize: 14,
		color: "#666",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	editButton: {
		marginRight: 8,
		paddingVertical: 6,
		paddingHorizontal: 12,
	},
	deleteButton: {
		paddingVertical: 6,
		paddingHorizontal: 12,
	},
});

export default ExpenseItem;
