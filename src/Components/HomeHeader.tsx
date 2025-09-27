import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import scaler from '../Utility/helper';

interface HomeHeaderProps {
  userName?: string;
  totalExpenses?: number;
  todayExpenses?: number;
}

export function HomeHeader({ userName = "User", totalExpenses = 0, todayExpenses = 0 }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Welcome Section */}
      <View>
        <Text style={styles.welcomeText}>Welcome, {userName}</Text>
        <Text style={styles.subtitle}>Your Dashboard</Text>
      </View>

      {/* Quick Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Expenses</Text>
          <Text style={styles.statValue}>₹{totalExpenses}</Text>
        </View>
        <View style={[styles.statCard, { marginLeft: scaler(12) }]}>
          <Text style={styles.statLabel}>Today</Text>
          <Text style={styles.statValue}>₹{todayExpenses}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaler(16),
    paddingTop: scaler(40), // for status bar space
    paddingBottom: scaler(20),
    backgroundColor: '#007bff',
    borderBottomLeftRadius: scaler(20),
    borderBottomRightRadius: scaler(20),
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: scaler(3) },
    shadowRadius: scaler(5),
    elevation: 4,
  },
  welcomeText: {
    fontSize: scaler(20),
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: scaler(14),
    color: '#e0e0e0',
    marginTop: scaler(4),
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: scaler(16),
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: scaler(12),
    borderRadius: scaler(12),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: scaler(2) },
    shadowRadius: scaler(3),
    elevation: 3,
  },
  statLabel: {
    fontSize: scaler(12),
    color: '#777',
  },
  statValue: {
    fontSize: scaler(16),
    fontWeight: 'bold',
    color: '#333',
    marginTop: scaler(4),
  },
});
