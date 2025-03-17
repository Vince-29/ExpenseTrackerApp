import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

function ExpenseInput({ visible, onClose, onSave, expense }) {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (expense && visible) {
			setName(expense.name);
			setAmount(expense.amount.toString());
			setDescription(expense.description || "");
		} else if (visible) {
			clearForm();
		}
	}, [expense, visible]);

	function clearForm() {
		setName("");
		setAmount("");
		setDescription("");
	}

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

		if (expense) {
			expenseData.id = expense.id;
		}

		onSave(expenseData);

		clearForm();
	}

	return (
		<Modal visible={visible} onClose={onClose}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>
							{expense ? "Edit Expense" : "Add New Expense"}
						</Text>

						<Input
							label="Name"
							value={name}
							onChangeText={setName}
							placeholder="Enter expense name"
						/>

						<Input
							label="Amount (₱)"
							value={amount}
							onChangeText={setAmount}
							placeholder="0.00"
							keyboardType="numeric"
						/>

						<Input
							label="Description (optional)"
							value={description}
							onChangeText={setDescription}
							placeholder="Enter details about this expense"
							multiline={true}
							numberOfLines={3}
							style={styles.textArea}
						/>

						<View style={styles.buttonContainer}>
							<Button
								title="Cancel"
								type="secondary"
								onPress={onClose}
								style={styles.buttonSpacing}
							/>

							<Button
								title={expense ? "Update" : "Add"}
								type="primary"
								onPress={handleSave}
								style={styles.buttonSpacing}
							/>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}

export default ExpenseInput;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
	},
	modalContainer: {
		padding: 10,
	},
	modalTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 15,
	},
	textArea: {
		height: 100,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 15,
	},
	buttonSpacing: {
		flex: 1,
		marginHorizontal: 5,
	},
});
