import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDeleteExpense, useExpenses} from '../Hooks/useExpenses';
import {FloatingButton} from '../Components/FloatingButton';
import {ExpenseList} from '../Components/ExpenseList';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HomeHeader} from '../Components/HomeHeader';
const dummyExpenses = [
  {
    id: 1,
    title: 'Groceries',
    amount: 250,
    date: '2025-09-20',
    category: 'Food',
  },
  {
    id: 2,
    title: 'Electricity Bill',
    amount: 1200,
    date: '2025-09-15',
    category: 'Utilities',
  },
  {
    id: 3,
    title: 'Uber Ride',
    amount: 350,
    date: '2025-09-18',
    category: 'Transport',
  },
  {
    id: 4,
    title: 'Movie Night',
    amount: 500,
    date: '2025-09-10',
    category: 'Entertainment',
  },
];

export function ExpenseTrackerScreen() {
  const {data, isLoading, error, isFetching, refetch} = useExpenses();
  const navigation = useNavigation();
  const deleteMutation = useDeleteExpense();
  console.log(data, 'jfhdjhjdh');

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading expenses...</Text>
      </View>
    );
  }

  const handleEdit = (expense: any) => {
    navigation.navigate('ExpenseForm', {expense}); // pass expense object
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteMutation.mutate(id, {
              onSuccess: () => {
                Alert.alert('Success', 'Expense deleted successfully');
              },
              onError: () => {
                Alert.alert('Error', 'Failed to delete expense');
              },
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  // if (error) {
  //   return (
  //     <View style={styles.center}>
  //       <Text style={{color: 'red'}}>Error loading expenses</Text>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={styles.flex_1}>
      <HomeHeader />
      <View style={styles.container}>
        <ExpenseList
          expenses={data || []}
          refreshing={isFetching}
          onRefresh={refetch}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <FloatingButton
          onPress={() => navigation.navigate('ExpenseForm' as never)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {flex: 1, backgroundColor: '#F4F6F8', padding: 12},
  flex_1: {
    flex: 1,
  },
});
