import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Feather, can use Ionicons, MaterialIcons, etc.
import scaler from '../Utility/helper';

interface HeaderProps {
  title: string;
  subtitle?: string;
  total?: number;
  onBack?: () => void; // optional back handler
}

export function Header({ title, subtitle, total, onBack }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left: Back Icon */}
      {onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icon name="arrow-left" size={scaler(20)} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Middle: Title & Subtitle */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {/* Right: Total */}
      {typeof total === 'number' && (
        <View style={styles.totalWrapper}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(20),
    backgroundColor: '#007bff',
  },
  backButton: {
    marginRight: scaler(12),
    padding: scaler(4),
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: scaler(22),
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: scaler(14),
    color: '#e0e0e0',
    marginTop: scaler(2),
  },
  totalWrapper: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: scaler(12),
    color: '#f0f0f0',
  },
  totalValue: {
    fontSize: scaler(18),
    fontWeight: 'bold',
    color: '#fff',
  },
});
