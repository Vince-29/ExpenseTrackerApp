import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
} from "react-native";

import ExpenseInput from "./component/ExpenseInput";
import ExpenseItem from "./component/ExpenseItem";
import ExpenseDetail from "./component/ExpenseDetail";

export default function App() {
	const [expenses, setExpenses] = useState([]);
	const [showInputForm, setShowInputForm] = useState(false);
	const [showDetailView, setShowDetailView] = useState(false);
	const [currentExpense, setCurrentExpense] = useState(null);
	const [viewingExpense, setViewingExpense] = useState(null);

	// Adding new expense
	function handleAddExpense(expense) {
		const newExpense = {
			...expense,
			id: Date.now().toString(), // Use timestamp as ID
		};
		const newExpensesList = [...expenses, newExpense];
		setExpenses(newExpensesList);

		setShowInputForm(false);
	}

	// Update existing expense
	function handleUpdateExpense(updatedExpense) {
		const updatedExpenses = expenses.map((expense) => {
			if (expense.id === updatedExpense.id) {
				return updatedExpense;
			}
			return expense;
		});

		setExpenses(updatedExpenses);
		setShowInputForm(false);
		setCurrentExpense(null);

		if (viewingExpense && viewingExpense.id === updatedExpense.id) {
			setViewingExpense(updatedExpense);
		}
	}

	// Delete an expense
	function handleDeleteExpense(id) {
		// Remove the expense with this ID
		const remainingExpenses = expenses.filter((expense) => expense.id !== id);
		setExpenses(remainingExpenses);

		if (viewingExpense && viewingExpense.id === id) {
			setShowDetailView(false);
			setViewingExpense(null);
		}
	}

	// Expense editing function
	function startEditing(expense) {
		setCurrentExpense(expense);
		setShowInputForm(true);
	}

	// Showwing expense details
	function showExpenseDetails(expense) {
		setViewingExpense(expense);
		setShowDetailView(true);
	}

	// Calculation total of all expenses
	let total = 0;
	for (let i = 0; i < expenses.length; i++) {
		total += parseFloat(expenses[i].amount || 0);
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<View style={styles.header}>
				<Text style={styles.title}>Expense Tracker</Text>
				<Text style={styles.total}>Total: ₱{total.toFixed(2)}</Text>
			</View>

			{expenses.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>No expenses yet</Text>
				</View>
			) : (
				<FlatList
					data={expenses}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ExpenseItem
							expense={item}
							onPress={() => showExpenseDetails(item)}
							onEdit={() => startEditing(item)}
							onDelete={() => handleDeleteExpense(item.id)}
						/>
					)}
					contentContainerStyle={styles.list}
				/>
			)}

			<TouchableOpacity
				style={styles.addButton}
				onPress={() => {
					setCurrentExpense(null);
					setShowInputForm(true);
				}}
			>
				<Text style={styles.addButtonText}>+</Text>
			</TouchableOpacity>

			<ExpenseInput
				visible={showInputForm}
				onClose={() => {
					setShowInputForm(false);
					setCurrentExpense(null);
				}}
				onSave={(expense) => {
					if (currentExpense) {
						handleUpdateExpense(expense);
					} else {
						handleAddExpense(expense);
					}
				}}
				expense={currentExpense}
			/>

			<ExpenseDetail
				visible={showDetailView}
				expense={viewingExpense}
				onClose={() => setShowDetailView(false)}
				onEdit={() => {
					setShowDetailView(false);
					startEditing(viewingExpense);
				}}
				onDelete={() => {
					handleDeleteExpense(viewingExpense.id);
				}}
			/>
		</SafeAreaView>
	);
}

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		padding: 20,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 5,
	},
	total: {
		fontSize: 18,
		color: "#666",
	},
	list: {
		padding: 16,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyText: {
		fontSize: 16,
		color: "#888",
	},
	addButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "#2196F3",
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
	addButtonText: {
		fontSize: 30,
		color: "white",
	},
});
