import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  checkbox: {
    width: 28,
    color: '#3157A4',
    fontSize: 20,
  },
  todoText: {
    flex: 1,
    color: '#1E293B',
    fontSize: 16,
  },
  completedText: {
    color: '#8892A3',
    textDecorationLine: 'line-through',
  },
});
