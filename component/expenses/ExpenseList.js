// components/expense/ExpenseList.js
import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({
	expenses,
	onExpensePress,
	onExpenseEdit,
	onExpenseDelete,
}) {
	if (expenses.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyText}>No expenses yet. Add one!</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={expenses}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<ExpenseItem
					expense={item}
					onPress={() => onExpensePress(item)}
					onEdit={() => onExpenseEdit(item)}
					onDelete={() => onExpenseDelete(item.id)}
				/>
			)}
			contentContainerStyle={styles.list}
		/>
	);
}

const styles = StyleSheet.create({
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
});

export default ExpenseList;
