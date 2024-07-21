import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store/store';
import { createTables } from './src/services/database';
import { PaperProv } from './src/context/ThemeContext';
import StackApp from './StackApp';

export default function App() {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <ReduxProvider store={store}>
      <PaperProv>
        <StackApp />
      </PaperProv>
    </ReduxProvider>
  );
}
