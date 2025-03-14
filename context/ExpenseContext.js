import React, { createContext, useState, useContext } from "react";

const ExpenseContext = createContext();

function ExpenseProvider({ children }) {
	const [expenses, setExpenses] = useState([]);

	// Add a new expense
	function addExpense(expense) {
		// Create a new expense with ID
		const newExpense = {
			...expense,
			id: Date.now().toString(),
		};

		// Add to our expenses list
		setExpenses([...expenses, newExpense]);
		return newExpense;
	}

	// Update an existing expense
	function updateExpense(updatedExpense) {
		const updatedExpenses = expenses.map((expense) => {
			if (expense.id === updatedExpense.id) {
				return updatedExpense;
			} else {
				return expense;
			}
		});

		setExpenses(updatedExpenses);
		return updatedExpense;
	}

	// Delete an expense
	function deleteExpense(id) {
		const filteredExpenses = expenses.filter((expense) => expense.id !== id);
		setExpenses(filteredExpenses);
	}

	// Calculate the total of all expenses
	function getTotal() {
		let total = 0;
		for (let i = 0; i < expenses.length; i++) {
			total += parseFloat(expenses[i].amount || 0);
		}
		return total;
	}

	// These are the values that will be available to components
	const contextValue = {
		expenses,
		addExpense,
		updateExpense,
		deleteExpense,
		getTotal,
	};

	return (
		<ExpenseContext.Provider value={contextValue}>
			{children}
		</ExpenseContext.Provider>
	);
}

function useExpenses() {
	const context = useContext(ExpenseContext);
	if (!context) {
		throw new Error("useExpenses must be used within an ExpenseProvider");
	}
	return context;
}

export { ExpenseProvider, useExpenses };
