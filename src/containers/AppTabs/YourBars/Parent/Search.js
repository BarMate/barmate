import React from "react";
import { View, Text, StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { PullableModalView } from "../../../../components/Global/index";
import { SearchBar } from '../../../../components/AppTabs/index'
import mapStyle from './CustomSearchStyle';

const Search = (props) => {
    return(
        <PullableModalView visible={props.visible}>
            <MapView
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            <SearchBar />
        </PullableModalView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
    },
})

export default Search;