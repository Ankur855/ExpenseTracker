import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import StackNavigation from './src/Navigation/StackNavigation';
import {createTable} from './src/Database/queries';
import ComponentWithLoader from './src/Screens/MyTaskScreen';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store';

function App(): React.JSX.Element {
  useEffect(() => {
    (async () => {
      await createTable();
    })();
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <StackNavigation />
        {/* <ComponentWithLoader isLoading={false} /> */}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
