import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import BarButton from '../BarButton/BarButton';
import styles from './styles';

class BarFlatlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
        stub: [
            {
                formattedAddress: '360 S Main St, Akron, OH 44301',
                name: 'Tear-EZ',
                place_id: 'ChIJy_SfNyTWMIgRXh1b740ZPDA',
                price_level: 1,
                rating: 4.5,
                photos: [{photo_reference: 'CmRaAAAA77swlJX8pAXp7GW4MAcNjN8Cdb_ilnQ_tvOZgnqdMN5vXw0yQ-XvrBGlzruU28F7TJOG5Xq7-52Mt6qc50AinCIfTnyiFT-fIjk-fZO0opBDrv3QQtPrFBOTfgU30GMIEhDFo_qIZsUiEjbJ_j6TeSGrGhRhSsi3qYt9_03fl2lQXm-BiHY58Q'}]
            },
            {
                formattedAddress: '360 S Main St, Akron, OH 44301',
                name: 'Tear-EZ',
                place_id: 'ChIJy_SfNyTWMIgRXh1b740ZPDA',
                price_level: 1,
                rating: 4.5,
                photos: [{photo_reference: 'CmRaAAAA77swlJX8pAXp7GW4MAcNjN8Cdb_ilnQ_tvOZgnqdMN5vXw0yQ-XvrBGlzruU28F7TJOG5Xq7-52Mt6qc50AinCIfTnyiFT-fIjk-fZO0opBDrv3QQtPrFBOTfgU30GMIEhDFo_qIZsUiEjbJ_j6TeSGrGhRhSsi3qYt9_03fl2lQXm-BiHY58Q'}]
            },
            {
                formattedAddress: '360 S Main St, Akron, OH 44301',
                name: 'Tear-EZ',
                place_id: 'ChIJy_SfNyTWMIgRXh1b740ZPDA',
                price_level: 1,
                rating: 4.5,
                photos: [{photo_reference: 'CmRaAAAA77swlJX8pAXp7GW4MAcNjN8Cdb_ilnQ_tvOZgnqdMN5vXw0yQ-XvrBGlzruU28F7TJOG5Xq7-52Mt6qc50AinCIfTnyiFT-fIjk-fZO0opBDrv3QQtPrFBOTfgU30GMIEhDFo_qIZsUiEjbJ_j6TeSGrGhRhSsi3qYt9_03fl2lQXm-BiHY58Q'}]
            },
            {
                formattedAddress: '360 S Main St, Akron, OH 44301',
                name: 'Tear-EZ',
                place_id: 'ChIJy_SfNyTWMIgRXh1b740ZPDA',
                price_level: 1,
                rating: 4.5,
                photos: [{photo_reference: 'CmRaAAAA77swlJX8pAXp7GW4MAcNjN8Cdb_ilnQ_tvOZgnqdMN5vXw0yQ-XvrBGlzruU28F7TJOG5Xq7-52Mt6qc50AinCIfTnyiFT-fIjk-fZO0opBDrv3QQtPrFBOTfgU30GMIEhDFo_qIZsUiEjbJ_j6TeSGrGhRhSsi3qYt9_03fl2lQXm-BiHY58Q'}]
            },
        ]
    };
  }

  render() {
    return (
        <FlatList 
            keyExtractor={(item, index) => String(Math.random())}
            data={this.state.stub}
            renderItem={({item}) => <BarButton info={item}/>}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
        />
    );
  }
}

export default BarFlatlist;
