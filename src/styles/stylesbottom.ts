import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({

    // Agrega esto al final de src/styles/styles.ts

  // --- BOTTOM TAB NAVIGATOR STYLES ---
  mainContent: {
    flex: 1,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomTabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  bottomTabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  bottomTabTextActive: {
    color: '#ffc95e',
    fontWeight: '600',
  },


});