// components/ExpenseDetail.js
import React from "react";
import {
	Modal,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";

function ExpenseDetail({ visible, expense, onClose, onEdit, onDelete }) {
	// Guard clause - don't render anything if no expense
	if (!expense) return null;

	// Helper function to format the date from the ID
	function getDateFromId(id) {
		try {
			// Try to convert the ID (which should be a timestamp) to a date
			const timestamp = parseInt(id);
			const date = new Date(timestamp);

			// Format the date as string
			const dateString = date.toLocaleDateString();
			const timeString = date.toLocaleTimeString();

			return dateString + " at " + timeString;
		} catch (error) {
			// If anything goes wrong, return a default message
			return "Unknown date";
		}
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					{/* Header section with name and amount */}
					<View style={styles.header}>
						<Text style={styles.title}>{expense.name}</Text>
						<Text style={styles.amount}>
							₱{parseFloat(expense.amount).toFixed(2)}
						</Text>
					</View>

					{/* Scrollable content area */}
					<ScrollView style={styles.content}>
						{/* Description section */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Description</Text>
							<Text style={styles.description}>
								{expense.description
									? expense.description
									: "No description provided"}
							</Text>
						</View>

						{/* Date section */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Date Added</Text>
							<Text style={styles.date}>{getDateFromId(expense.id)}</Text>
						</View>
					</ScrollView>

					{/* Action buttons */}
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.editButton]}
							onPress={() => {
								// Close this modal first, then open edit mode
								onClose();
								onEdit();
							}}
						>
							<Text style={styles.editButtonText}>Edit</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.deleteButton]}
							onPress={() => {
								// Close this modal first, then delete
								onClose();
								onDelete();
							}}
						>
							<Text style={styles.deleteButtonText}>Delete</Text>
						</TouchableOpacity>
					</View>

					{/* Close button */}
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

export default ExpenseDetail;

// Styles for our component
const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "90%",
		maxHeight: "80%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
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
		color: "#e53935", // Red color
	},
	content: {
		maxHeight: 300,
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
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 15,
		marginBottom: 10,
	},
	button: {
		flex: 1,
		padding: 12,
		borderRadius: 5,
		alignItems: "center",
		marginHorizontal: 5,
	},
	editButton: {
		backgroundColor: "#e3f2fd", // Light blue
	},
	editButtonText: {
		color: "#1976d2", // Blue
		fontWeight: "bold",
	},
	deleteButton: {
		backgroundColor: "#ffebee", // Light red
	},
	deleteButtonText: {
		color: "#c62828", // Dark red
		fontWeight: "bold",
	},
	closeButton: {
		padding: 12,
		borderRadius: 5,
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
	closeButtonText: {
		color: "#333",
		fontWeight: "bold",
	},
});
