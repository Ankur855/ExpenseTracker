import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import scaler from '../Utility/helper';

interface ExpenseItemProps {
  _id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  onDelete: (id: string) => void;
  onEdit: (expense: any) => void;
  expenses: any[];
}

export function ExpenseItem({
  onDelete,
  onEdit,
  expenses,
}: ExpenseItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onEdit(expenses)}>
      {/* Left: Category + Description */}
      <View>
        <Text style={styles.category}>{expenses?.category}</Text>
        <Text style={styles.description}>{expenses?.description}</Text>
        <Text style={styles.date}>
          {new Date(expenses?.date).toLocaleDateString('en-IN')}
        </Text>
      </View>

      {/* Right: Amount + Delete */}
      <View style={styles.rightWrapper}>
        <Text style={styles.amount}>₹{expenses?.amount?.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => onDelete(expenses?._id)}
          style={styles.deleteBtn}>
          <Icon name="trash-2" size={scaler(18)} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scaler(12),
    marginBottom: scaler(10),
    backgroundColor: '#fff',
    borderRadius: scaler(12),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: scaler(2)},
    shadowRadius: scaler(4),
    elevation: 2,
  },
  category: {
    fontSize: scaler(12),
    color: '#007bff',
    fontWeight: '600',
  },
  description: {
    fontSize: scaler(14),
    fontWeight: '500',
    marginTop: scaler(2),
  },
  date: {
    fontSize: scaler(12),
    color: '#777',
    marginTop: scaler(2),
  },
  rightWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: scaler(16),
    fontWeight: 'bold',
    color: '#333',
  },
  deleteBtn: {
    marginTop: scaler(8),
    padding: scaler(4),
  },
});
