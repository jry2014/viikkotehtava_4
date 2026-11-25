import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 64,
    backgroundColor: '#F5F6FA',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  heading: {
    marginBottom: 20,
    color: '#1E293B',
    fontSize: 32,
    fontWeight: 'bold',
  },
  addRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  addButton: {
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#3157A4',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyMessage: {
    marginTop: 24,
    color: '#64748B',
    textAlign: 'center',
  },
  message: {
    color: '#1E293B',
    textAlign: 'center',
  },
  retry: {
    marginTop: 16,
    color: '#3157A4',
    fontWeight: 'bold',
  },
  error: {
    marginBottom: 12,
    color: '#B42318',
  },
});
