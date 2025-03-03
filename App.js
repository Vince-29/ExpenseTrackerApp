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
	// Main state to store all expenses
	const [expenses, setExpenses] = useState([]);

	// State to control the ExpenseInput modal visibility
	const [inputModalVisible, setInputModalVisible] = useState(false);

	// State to control the ExpenseDetail modal visibility
	const [detailModalVisible, setDetailModalVisible] = useState(false);

	// State to track if we're editing an existing expense
	const [editingExpense, setEditingExpense] = useState(null);

	// State to track which expense to show in detail view
	const [selectedExpense, setSelectedExpense] = useState(null);

	// Function to add a new expense
	const addExpense = (expense) => {
		// Generate a unique ID for the expense
		const newExpense = {
			...expense,
			id: Date.now().toString(),
		};

		setExpenses([...expenses, newExpense]);
		setInputModalVisible(false);
	};

	// Function to update an existing expense
	const updateExpense = (updatedExpense) => {
		setExpenses(
			expenses.map((expense) =>
				expense.id === updatedExpense.id ? updatedExpense : expense
			)
		);
		setInputModalVisible(false);
		setEditingExpense(null);

		// Update selected expense if it's the one being edited
		if (selectedExpense && selectedExpense.id === updatedExpense.id) {
			setSelectedExpense(updatedExpense);
		}
	};

	// Function to delete an expense
	const deleteExpense = (id) => {
		setExpenses(expenses.filter((expense) => expense.id !== id));

		// Close detail modal if the deleted expense is currently selected
		if (selectedExpense && selectedExpense.id === id) {
			setDetailModalVisible(false);
			setSelectedExpense(null);
		}
	};

	// Function to start editing an expense
	const handleEdit = (expense) => {
		setEditingExpense(expense);
		setInputModalVisible(true);
	};

	// Function to show expense details
	const handleExpensePress = (expense) => {
		setSelectedExpense(expense);
		setDetailModalVisible(true);
	};

	// Calculate total expenses
	const totalExpenses = expenses.reduce(
		(sum, expense) => sum + parseFloat(expense.amount || 0),
		0
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<View style={styles.header}>
				<Text style={styles.title}>Expense Tracker</Text>
				<Text style={styles.total}>Total: ₱{totalExpenses.toFixed(2)}</Text>
			</View>

			{expenses.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>No expenses yet. Add one!</Text>
				</View>
			) : (
				<FlatList
					data={expenses}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ExpenseItem
							expense={item}
							onPress={() => handleExpensePress(item)}
							onEdit={() => handleEdit(item)}
							onDelete={() => deleteExpense(item.id)}
						/>
					)}
					contentContainerStyle={styles.list}
				/>
			)}

			<TouchableOpacity
				style={styles.addButton}
				onPress={() => {
					setEditingExpense(null);
					setInputModalVisible(true);
				}}
			>
				<Text style={styles.addButtonText}>+</Text>
			</TouchableOpacity>

			<ExpenseInput
				visible={inputModalVisible}
				onClose={() => {
					setInputModalVisible(false);
					setEditingExpense(null);
				}}
				onSave={editingExpense ? updateExpense : addExpense}
				expense={editingExpense}
			/>

			<ExpenseDetail
				visible={detailModalVisible}
				expense={selectedExpense}
				onClose={() => setDetailModalVisible(false)}
				onEdit={() => handleEdit(selectedExpense)}
				onDelete={() => deleteExpense(selectedExpense.id)}
			/>
		</SafeAreaView>
	);
}

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
