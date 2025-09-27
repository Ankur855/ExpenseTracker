import React, { Fragment, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAddExpense, useUpdateExpense } from '../Hooks/useExpenses';
import { Header } from '../Components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';

type FormData = {
  title: string;
  amount: string;
  date: string;
  category: string;
};

export const ExpenseFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const expense = route.params?.expense;

  const addMutation = useAddExpense();
  const updateMutation = useUpdateExpense();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: expense?.description || '',
      amount: expense?.amount?.toString() || '',
      date: expense?.date?.split('T')[0] || '',
      category: expense?.category || '',
    },
  });

  useEffect(() => {
    if (expense) {
      reset({
        title: expense.description,
        amount: expense.amount.toString(),
        date: expense.date.split('T')[0],
        category: expense.category,
      });
    }
  }, [expense]);

  const onSubmit = (data: FormData) => {
    const parsedDate = new Date(data.date);
    if (isNaN(parsedDate.getTime())) {
      Alert.alert('Validation', 'Please enter a valid date (YYYY-MM-DD)');
      return;
    }

    const payload = {
      description: data.title,
      amount: Number(data.amount),
      date: data.date,
      category: data.category || 'Misc',
    };

    if (expense) {
      updateMutation.mutate({ id: expense._id, ...payload });
      Alert.alert('Success', 'Expense updated successfully');
    } else {
      addMutation.mutate(payload);
      Alert.alert('Success', 'Expense added successfully');
    }

    navigation.goBack();
  };

  return (
    <Fragment>
      <Header title={expense ? 'Edit Expense' : 'Add Expense'} onBack={() => navigation.goBack()} />
      <View style={styles.container}>

        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          name="title"
          rules={{ required: 'Title is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} onChangeText={onChange} value={value} />
          )}
        />
        {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

        <Text style={styles.label}>Amount</Text>
        <Controller
          control={control}
          name="amount"
          rules={{
            required: 'Amount is required',
            pattern: { value: /^[0-9]+$/, message: 'Must be numeric' },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} keyboardType="numeric" onChangeText={onChange} value={value} />
          )}
        />
        {errors.amount && <Text style={styles.error}>{errors.amount.message}</Text>}

        <Text style={styles.label}>Category</Text>
        <Controller
          control={control}
          name="category"
          rules={{ required: 'Category is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} onChangeText={onChange} value={value} />
          )}
        />
        {errors.category && <Text style={styles.error}>{errors.category.message}</Text>}

        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <Controller
          control={control}
          name="date"
          rules={{ required: 'Date is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="2025-09-23" onChangeText={onChange} value={value} />
          )}
        />
        {errors.date && <Text style={styles.error}>{errors.date.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>{expense ? 'Update Expense' : 'Save Expense'}</Text>
        </TouchableOpacity>

      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: '#F9FAFB',
  },
  error: { color: '#E53935', marginBottom: 10, fontSize: 12 },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
