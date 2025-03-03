// components/ExpenseItem.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ExpenseItem = ({ expense, onPress, onEdit, onDelete }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.name}>{expense.name}</Text>
					<Text style={styles.amount}>
						₱{parseFloat(expense.amount).toFixed(2)}
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
				<TouchableOpacity
					style={styles.editButton}
					onPress={(e) => {
						e.stopPropagation(); // Prevent triggering the parent onPress
						onEdit();
					}}
				>
					<Text style={styles.editButtonText}>Edit</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.deleteButton}
					onPress={(e) => {
						e.stopPropagation(); // Prevent triggering the parent onPress
						onDelete();
					}}
				>
					<Text style={styles.deleteButtonText}>Delete</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

export default ExpenseItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		borderRadius: 8,
		marginBottom: 12,
		padding: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
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
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: "#f0f0f0",
		borderRadius: 4,
		marginRight: 8,
	},
	editButtonText: {
		color: "#333",
	},
	deleteButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: "#ffebee",
		borderRadius: 4,
	},
	deleteButtonText: {
		color: "#c62828",
	},
});
