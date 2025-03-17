import React, { useState, useContext } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
} from "react-native";

import ExpenseInput from "./component/expenses/ExpenseInput";
import ExpenseItem from "./component/expenses/ExpenseItem";
import ExpenseDetail from "./component/expenses/ExpenseDetail";
import { ExpenseProvider, ExpenseContext } from "./context/ExpenseContext";

function ExpenseTrackerApp() {
	const { expenses, total, addExpense, updateExpense, deleteExpense } =
		useContext(ExpenseContext);

	const [showInputForm, setShowInputForm] = useState(false);
	const [showDetailView, setShowDetailView] = useState(false);
	const [currentExpense, setCurrentExpense] = useState(null);
	const [viewingExpense, setViewingExpense] = useState(null);

	// editing expense
	function startEditing(expense) {
		setCurrentExpense(expense);
		setShowInputForm(true);
	}

	// showing expense details
	function showExpenseDetails(expense) {
		setViewingExpense(expense);
		setShowDetailView(true);
	}

	// saving an expense
	function handleSaveExpense(expense) {
		if (currentExpense) {
			updateExpense(expense);

			if (viewingExpense && viewingExpense.id === expense.id) {
				setViewingExpense(expense);
			}
		} else {
			addExpense(expense);
		}

		setShowInputForm(false);
		setCurrentExpense(null);
	}

	// deleting expense
	function handleDeleteExpense(id) {
		deleteExpense(id);

		if (viewingExpense && viewingExpense.id === id) {
			setShowDetailView(false);
			setViewingExpense(null);
		}
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
				onSave={handleSaveExpense}
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

export default function App() {
	return (
		<ExpenseProvider>
			<ExpenseTrackerApp />
		</ExpenseProvider>
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
