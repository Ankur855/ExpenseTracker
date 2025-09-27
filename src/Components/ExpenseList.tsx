import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ExpenseItem} from './ExpenseItem';
import scaler from '../Utility/helper';

interface Expense {
  _id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: any) => void;
}

export function ExpenseList({expenses, onDelete,onEdit}: ExpenseListProps) {
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={expenses}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <ExpenseItem  expenses={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: scaler(16),
  },
});
