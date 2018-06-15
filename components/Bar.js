import React from 'react';
import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons'


/*
    Bar.js is used as the component for getting and rendering the saved bar a person has on their home page.
    This component should be nested inside of a scrollview on the home page of the app. The component includes a button
    to join the bar this component is apart of, as well as details about the bar and its current status (i.e. if its open, recent comments...)

    This component has 3 states. Active, Inactive, and observer
    If the bar is set to active, the user can join the bar and do everything inside the 'room' (i.e. post, message people, etc...)
    If the bar is set to inactive, the bar is closed and it can't be joined.
    If the bar is set to observer, the bar is open; however, the user is not in range of the bar so they can only 'observe' whats happening in the bar

    This component gets initialized inside the search screen when users tap on bars and add them.
    It can be de-init. by clicking the x and asking the user if they want to delete the bar, which will then delete the component from their app.
*/

class Bar extends React.Component {
        
}