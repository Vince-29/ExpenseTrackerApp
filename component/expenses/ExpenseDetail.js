import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

function ExpenseDetail({ visible, expense, onClose, onEdit, onDelete }) {
	if (!expense) return null;

	// date formatter for ID
	function getDateFromId(id) {
		try {
			const timestamp = parseInt(id);
			const date = new Date(timestamp);

			const dateString = date.toLocaleDateString();
			const timeString = date.toLocaleTimeString();

			return dateString + " at " + timeString;
		} catch (error) {
			return "Unknown date";
		}
	}

	return (
		<Modal visible={visible} onClose={onClose}>
			<View style={styles.header}>
				<Text style={styles.title}>{expense.name}</Text>
				<Text style={styles.amount}>
					₱{parseFloat(expense.amount).toFixed(2)}
				</Text>
			</View>
			<ScrollView style={styles.content}>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Description</Text>
					<Text style={styles.description}>
						{expense.description
							? expense.description
							: "No description provided"}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Date Added</Text>
					<Text style={styles.date}>{getDateFromId(expense.id)}</Text>
				</View>
			</ScrollView>
			<View style={styles.buttonContainer}>
				<Button
					title="Edit"
					type="secondary"
					onPress={() => {
						onClose();
						onEdit();
					}}
				/>
				<Button
					title="Delete"
					type="danger"
					onPress={() => {
						onClose();
						onDelete();
					}}
				/>
			</View>
			<Button title="Close" type="secondary" onPress={onClose} />
		</Modal>
	);
}

export default ExpenseDetail;

// Styles
const styles = StyleSheet.create({
	header: {
		marginBottom: 15,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 5,
	},
	amount: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#e53935",
	},
	content: {
		maxHeight: 200,
	},
	section: {
		marginBottom: 15,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#555",
		marginBottom: 5,
	},
	description: {
		fontSize: 16,
		color: "#333",
		lineHeight: 22,
	},
	date: {
		fontSize: 14,
		color: "#666",
	},
	buttonContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		gap: 10,
		marginTop: 15,
		marginBottom: 10,
	},
});
