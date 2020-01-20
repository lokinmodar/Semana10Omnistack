import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; //navegação por pilha (com vai e volta)

import Main from './pages/Main';
import Profile from './pages/Profile'

const Routes = createAppContainer( // sempre por fora de toda a aplicação
    createStackNavigator({ //Rotas de navegação do app (páginas ou telas)
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            },

        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7d40e7'
            },
        },
    })
);

export default Routes;