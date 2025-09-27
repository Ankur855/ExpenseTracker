import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import {createStackNavigator} from '@react-navigation/stack';
import MyTaskScreen from '../Screens/MyTaskScreen';
import CreateTask from '../Screens/CreateTask';
import {route, routes} from '../Utility/constantString';
import {ExpenseTrackerScreen} from '../Screens/ExpenseTrackerScreen';
import {ExpenseFormScreen} from '../Screens/ExpenseFormScreen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../Store/queryClient';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Tasks: undefined;
  CreateTask: undefined;
  ExpenseTracker: undefined;
  ExpenseForm: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.ExpenseTracker}>
        <Stack.Screen
          name={routes.ExpenseTracker}
          component={ExpenseTrackerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.ExpenseForm}
          component={ExpenseFormScreen}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          name="Tasks"
          component={MyTaskScreen}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          name="CreateTask"
          component={CreateTask}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </QueryClientProvider>
  );
};

export default StackNavigation;
