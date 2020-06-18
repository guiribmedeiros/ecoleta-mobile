import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();

const Routes = () => (
    <NavigationContainer>
        <AppStack.Navigator headerMode="none" screenOptions={{ cardStyle: styles.cardContainer }}>
            <AppStack.Screen name="Home" component={Home} />
            <AppStack.Screen name="Points" component={Points} />
            <AppStack.Screen name="Detail" component={Detail} />
        </AppStack.Navigator>
    </NavigationContainer>
);

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#F0F0F5',
    },
});

export default Routes;
