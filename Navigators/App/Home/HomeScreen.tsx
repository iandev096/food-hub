import React, { useContext, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Screen } from '../../../UIComponents/Screen';
import { Container } from '../../../UIComponents/Container';
import { ThemeContext } from 'react-native-elements';
import { CustomSearchBar } from '../../../UIComponents/CustomSearchBar';
import { FadeTitleText } from '../../../UIComponents/FadeTitleText';
import { SectionTitle } from '../../../UIComponents/SectionTitle';
import { RestaurantsList } from '../../../UIComponents/RestaurantsList';
import { FooterBtn } from '../../../UIComponents/FooterBtn';
import { restaurantList } from '../../../data/fake-data';
import { BottomNavigationProp } from '../BottomTabs/bottomTabs.types';


interface HomeScreenProps {
  navigation: BottomNavigationProp<'Home'>
}

const restList = restaurantList;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState('');

  const selectRestaurantHandler = (restId: string) => {
    navigation.navigate('RestaurantDetail', { restaurantId: restId });
  }

  return (
    <>
      <CustomSearchBar
        onSubmit={(text) => console.log(text)}
        value={search}
        onChangeText={(text) => setSearch(text)}
        theme={theme}
        placeholder='Search for a restaurant or dish'
        onFilter={() => console.log('Filtering')}
      />
      <Screen>
        <Container style={styles.container}>
          <View style={styles.inner}>
            <FadeTitleText style={{ ...styles.mainTitle, ...styles.contain }} theme={theme}>RESTAURANTS</FadeTitleText>

            <View style={styles.horizontalSectionList}>
              <SectionTitle style={styles.contain} theme={theme}>Opened</SectionTitle>
              <RestaurantsList
                horizontal={true}
                data={restList.filter(rest => !rest.closed)}
                theme={theme}
                onSelectRestaurant={(restId) => selectRestaurantHandler(restId)}
              />
              <View style={{ alignItems: 'flex-end', ...styles.contain }}>
                <FooterBtn
                  onPress={() => navigation.navigate('Restaurants', { jumpTo: 'OpenedRestaurants' })}
                  title='See All'
                  theme={theme}
                />
              </View>
            </View>

            <View style={styles.horizontalSectionList}>
              <SectionTitle style={styles.contain} theme={theme}>Your Favorites</SectionTitle>
              <RestaurantsList
                horizontal={true}
                data={restList}
                theme={theme}
                onSelectRestaurant={(restId) => selectRestaurantHandler(restId)}
              />
              <View style={{ alignItems: 'flex-end', ...styles.contain }}>
                <FooterBtn
                  onPress={() => navigation.navigate('Restaurants', { jumpTo: 'Favorite' })}
                  title='See All'
                  theme={theme}
                />
              </View>
            </View>

            <View style={styles.horizontalSectionList}>
              <SectionTitle style={styles.contain} theme={theme}>Our Favorites</SectionTitle>
              <RestaurantsList
                horizontal={true}
                data={restList}
                theme={theme}
                onSelectRestaurant={(restId) => selectRestaurantHandler(restId)}
              />
              <View style={{ alignItems: 'flex-end', ...styles.contain }}>
                <FooterBtn
                  onPress={() => navigation.navigate('Restaurants', { jumpTo: 'FoodHubChoice' })}
                  title='See All'
                  theme={theme}
                />
              </View>
            </View>

            <View style={styles.horizontalSectionList}>
              <SectionTitle style={styles.contain} theme={theme}>New</SectionTitle>
              <RestaurantsList
                horizontal={true}
                data={restList.filter(rest => rest.badges.includes('NEW'))}
                theme={theme}
                onSelectRestaurant={(restId) => selectRestaurantHandler(restId)}
              />
              <View style={{ alignItems: 'flex-end', ...styles.contain }}>
                <FooterBtn
                  onPress={() => navigation.navigate('Restaurants', { jumpTo: 'NewRestaurants' })}
                  title='See All'
                  theme={theme}
                />
              </View>
            </View>

            <View style={styles.horizontalSectionList}>
              <SectionTitle style={styles.contain} theme={theme}>Closed</SectionTitle>
              <RestaurantsList
                horizontal={true}
                data={restList.filter(rest => rest.closed)}
                theme={theme}
                onSelectRestaurant={(restId) => selectRestaurantHandler(restId)}
              />
              <View style={{ alignItems: 'flex-end', ...styles.contain }}>
                <FooterBtn
                  onPress={() => navigation.navigate('Restaurants', { jumpTo: 'ClosedRestaurants' })}
                  title='See All'
                  theme={theme}
                />
              </View>
            </View>
          </View>
        </Container>
      </Screen>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    minHeight: Dimensions.get('window').height - 50,
    paddingHorizontal: 0,
  },
  mainTitle: {
    marginVertical: 15
  },
  contain: {
    paddingHorizontal: 10
  },
  inner: {
    width: '100%',
    height: '100%',
  },
  sectionsTitle: {

  },
  sectionTitle: {

  },
  horizontalSectionList: {
    marginVertical: 10
  },

});
