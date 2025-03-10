import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

function ExpenseInput({ visible, onClose, onSave, expense }) {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (expense && visible) {
			setName(expense.name);
			setAmount(expense.amount.toString());
			setDescription(expense.description);
		} else if (visible) {
			clearForm();
		}
	}, [expense, visible]);

	// Reset the form to blank values
	function clearForm() {
		setName("");
		setAmount("");
		setDescription("");
	}

	// om save button
	function handleSave() {
		if (name.trim() === "") {
			alert("Please enter an expense name");
			return;
		}

		if (amount.trim() === "") {
			alert("Please enter an amount");
			return;
		}

		const expenseData = {
			name: name,
			amount: amount,
			description: description,
		};

		//include ID if editing existing expense
		if (expense) {
			expenseData.id = expense.id;
		}

		onSave(expenseData);

		// Clear the form
		clearForm();
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>
							{expense ? "Edit Expense" : "Add New Expense"}
						</Text>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Name</Text>
							<TextInput
								style={styles.input}
								placeholder="Enter expense name"
								value={name}
								onChangeText={(text) => setName(text)}
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Amount (₱)</Text>
							<TextInput
								style={styles.input}
								placeholder="0.00"
								keyboardType="numeric"
								value={amount}
								onChangeText={(text) => setAmount(text)}
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Description (optional)</Text>
							<TextInput
								style={[styles.input, styles.textArea]}
								placeholder="Enter details about this expense"
								value={description}
								onChangeText={(text) => setDescription(text)}
								multiline={true}
								numberOfLines={3}
							/>
						</View>

						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={[styles.button, styles.cancelButton]}
								onPress={onClose}
							>
								<Text style={styles.buttonText}>Cancel</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[styles.button, styles.saveButton]}
								onPress={handleSave}
							>
								<Text style={[styles.buttonText, styles.saveButtonText]}>
									{expense ? "Update" : "Add"}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}

export default ExpenseInput;

//Styles
const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "90%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
	inputContainer: {
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
	textArea: {
		height: 80,
		paddingTop: 10,
		textAlignVertical: "top",
	},
	buttonContainer: {
		flexDirection: "row",
		marginTop: 10,
	},
	button: {
		flex: 1,
		padding: 12,
		borderRadius: 5,
		alignItems: "center",
		marginHorizontal: 5,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	cancelButton: {
		backgroundColor: "#f2f2f2",
	},
	saveButton: {
		backgroundColor: "#2196F3",
	},
	saveButtonText: {
		color: "white",
	},
});
