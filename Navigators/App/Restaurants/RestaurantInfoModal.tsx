import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Theme, ListItem, Text, Icon } from 'react-native-elements';
import { NormalText } from '../../../UIComponents/NormalText';
import { ScrollableModal } from '../../../UIComponents/ScrollableModal';
import { MapPreview } from '../../../UIComponents/MapPreview';

interface RestaurantInfoProps {
  isVisible: boolean;
  onClose: Function;
  location: {
    lat: number,
    lng: number,
  }
  theme: Theme;
  cuisines?: string[]
}

export const RestaurantInfoModal: React.FC<RestaurantInfoProps> = ({ isVisible, onClose, theme, location, cuisines }) => {
  const [contentHeight, setContentHeight] = useState(400);
  
  return (
    <ScrollableModal isVisible={isVisible} onClose={onClose} contentHeight={contentHeight}>
      <View onLayout={(event) =>  {
        const { height } = event.nativeEvent.layout;
        setContentHeight(height);
      }} style={[styles.container, {backgroundColor: theme.colors?.grey5}]}>
        <View style={styles.cuisines}>
          {cuisines?.map((cuisine, idx, arr) =>
            <NormalText key={cuisine} style={[styles.cuisine, { color: theme.colors?.primary }]}>
              {cuisine}  {(idx + 1 < arr.length) ? '•' : ''}
            </NormalText>)}
        </View>
        <View style={styles.mapPreview}>
          <MapPreview
            onPress={() => {}}
            location={location}
            initialLocation={location}
            theme={theme}
            style={styles.mapPreview}
          >
            <NormalText>No Location chosen yet.</NormalText>
          </MapPreview>
        </View>
        <ListItem 
          title='Opening Hours'
          titleStyle={styles.infoTitle}
          subtitle='Monday to Sunday'
          subtitleStyle={{color: theme.colors?.grey3}}
          rightTitle='10:00 - 21:00'
          containerStyle={styles.infoContainer}
        />
        <ListItem 
          title='Payment Methods'
          titleStyle={styles.infoTitle}
          subtitle={<>
            <Text style={{...styles.infoSubTitle, color: theme.colors?.grey3}}>Cash on Delivery</Text>
            <Text style={{...styles.infoSubTitle, color: theme.colors?.grey3}}>Mobile Money - MTN</Text>
            <Text style={{...styles.infoSubTitle, color: theme.colors?.grey3}}>Cards by JumiaPay</Text>
          </>}
          containerStyle={styles.infoContainer}
        />
        <ListItem 
          title={<Text style={[styles.infoTitle, {fontSize: 16}]}>
            Reviews
          </Text>}
          rightTitle={<View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name='star' color={theme.colors?.warning} />
            <Text>4.7 (87)</Text>
          </View>}
          bottomDivider
        />
        <ListItem 
          title='SEAN A.'
          titleStyle={styles.infoTitle}
          subtitle={<>
            <Text style={{...styles.infoSubTitle, color: theme.colors?.grey3}}>06.09.2019</Text>
            <Text style={{...styles.reviewSubTitle, color: theme.colors?.grey1}}>Amazingly delicious</Text>
          </>}
          rightElement={<View style={{flexDirection: 'row'}}>
            <Icon color={theme.colors?.warning} name='star'/>
            <Icon color={theme.colors?.warning} name='star'/>
            <Icon color={theme.colors?.warning} name='star'/>
            <Icon color={theme.colors?.warning} name='star'/>
            <Icon color={theme.colors?.warning} name='star'/>
          </View>}
    
        />
        <ListItem 
          title='RICKY AWN.'
          titleStyle={styles.infoTitle}
          subtitle={<>
            <Text style={{...styles.infoSubTitle, color: theme.colors?.grey3}}>06.09.2019</Text>
            <Text style={{...styles.reviewSubTitle, color: theme.colors?.grey1}}>Amazingly delicious</Text>
          </>}
          rightElement={<View style={{flexDirection: 'row'}}>
            <Icon color={theme.colors?.warning} name='star'/>
            <Icon color={theme.colors?.warning} name='star'/>
            <Icon color={theme.colors?.warning} name='star'/>
            <Icon color={theme.colors?.warning} name='star'/>
            <Icon color={theme.colors?.warning} name='star'/>
          </View>}
    
        />
      </View>
    </ScrollableModal>
  );
}

const styles = StyleSheet.create({

  container: {
    minHeight: Dimensions.get('window').height * 0.7,
    paddingVertical: 10,
  },
  cuisines: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  cuisine: {
    fontSize: 12,
    paddingRight: 9,
    fontWeight: 'bold',
    letterSpacing: 1.3
  },
  mapPreview: {
    width: '100%',
    height: 200,
    borderWidth: 0,
    marginVertical: 5
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  infoSubTitle: {
    marginBottom: 4
  },
  infoContainer: {
    marginBottom: 2
  },
  reviewSubTitle: {
    
  },
  separator: {
    marginHorizontal: 5
  },
})