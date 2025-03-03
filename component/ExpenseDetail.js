import React from "react";
import {
	Modal,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";

const ExpenseDetail = ({ visible, expense, onClose, onEdit, onDelete }) => {
	if (!expense) return null;

	// Format the date based on ID (assuming ID is a timestamp)
	const formatDate = (id) => {
		try {
			const date = new Date(parseInt(id));
			return date.toLocaleDateString() + " " + date.toLocaleTimeString();
		} catch (e) {
			return "Unknown date";
		}
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
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
							<Text style={styles.date}>{formatDate(expense.id)}</Text>
						</View>
					</ScrollView>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.editButton]}
							onPress={() => {
								onClose();
								onEdit();
							}}
						>
							<Text style={styles.editButtonText}>Edit</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.deleteButton]}
							onPress={() => {
								onClose();
								onDelete();
							}}
						>
							<Text style={styles.deleteButtonText}>Delete</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default ExpenseDetail;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
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
		color: "#e53935",
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
		backgroundColor: "#e3f2fd",
	},
	editButtonText: {
		color: "#1976d2",
		fontWeight: "bold",
	},
	deleteButton: {
		backgroundColor: "#ffebee",
	},
	deleteButtonText: {
		color: "#c62828",
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
