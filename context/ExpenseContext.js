import React, { createContext, useState, useEffect, useContext } from "react";

// Create the ExpenseContext
const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
	const [expenses, setExpenses] = useState([]);
	const [total, setTotal] = useState(0);

	// Calculate total whenever expenses change
	useEffect(() => {
		let sum = 0;
		for (let i = 0; i < expenses.length; i++) {
			sum += parseFloat(expenses[i].amount || 0);
		}
		setTotal(sum);
	}, [expenses]);

	// Add new expense
	const addExpense = (expense) => {
		const newExpense = {
			...expense,
			id: Date.now().toString(), // Use timestamp as ID
		};
		setExpenses([...expenses, newExpense]);
	};

	// Update existing expense
	const updateExpense = (updatedExpense) => {
		const updatedExpenses = expenses.map((expense) => {
			if (expense.id === updatedExpense.id) {
				return updatedExpense;
			}
			return expense;
		});
		setExpenses(updatedExpenses);
	};

	// Delete an expense
	const deleteExpense = (id) => {
		const remainingExpenses = expenses.filter((expense) => expense.id !== id);
		setExpenses(remainingExpenses);
	};

	return (
		<ExpenseContext.Provider
			value={{
				expenses,
				total,
				addExpense,
				updateExpense,
				deleteExpense,
			}}
		>
			{children}
		</ExpenseContext.Provider>
	);
};

// custom hook
const useExpenses = () => useContext(ExpenseContext);

export { ExpenseContext, ExpenseProvider, useExpenses };
