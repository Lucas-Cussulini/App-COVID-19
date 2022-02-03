import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground
} from 'react-native';
import StateSelectionPicker from '../components/StateSelectionPicker';
import Zoom from '../../img/zoom.png'
import Covid from '../../img/covid.png'

const Search = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [ufData, setUfData] = useState([]);
  const [ufError, setUfError] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const name = route.params?.name

  const getUfData = async () => {
    try {
      const response = await fetch(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );
      const json = await response.json();
      json.sort((a, b) => {
        if (a.nome > b.nome) {
          return 1;
        }
        if (a.nome < b.nome) {
          return -1;
        }
        return 0;
      });
      setUfData(json);
    } catch (error) {
      setUfError(
        'Não foi possível obter as unidades da federação, tente novamente mais tarde.',
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const onRefreshStateListPressed = async () => {
    if (!isLoading) {
      setLoading(true);
    }
    await getUfData();
  };

  useEffect(() => {
    getUfData();
  }, []);

  const onOptionSelected = newSelectedOption => {
    setSelectedOption(newSelectedOption);
  };

  const navigateToResults = () => {
    if (navigation && selectedOption && name) {
      navigation.navigate('Results', {selectedOption, name});
    }
  };

  return (
    <SafeAreaView style={styles.mainView}>
        <Text style={styles.line}></Text>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {isLoading ? (
        <ActivityIndicator
          size="large"
          style={styles.activityIndicatorViewStyle}
        />
        ) : (
      <View style={styles.contentViewStyle}>
        {ufError ? (
          <>
          <Text style={styles.textStyle}>{ufError}</Text>
          <TouchableOpacity
            style={styles.tryAgainButtonViewStyle}
            onPress={onRefreshStateListPressed}>
          <Text>Atualizar lista de estados</Text>
          </TouchableOpacity>
          </>
          ) : (
          <>
              <Text style={styles.textStyle}>
                Olá, {route.params?.name}!
                {'\n'}
                Realize sua pesquisa!
              </Text>
            <StateSelectionPicker
              dataSource={ufData}
              onOptionSelected={newSelectedOption =>
              onOptionSelected(newSelectedOption)
              }
            />
              {selectedOption && (
            <TouchableOpacity
              style={styles.tryAgainButtonViewStyle}
              onPress={navigateToResults}>
            <Text style={styles.textButton}>Pesquisar</Text>
            <Image 
              source={Zoom}
              style={styles.imageSearch}
            />
            <Image source={Covid} style={styles.imageCovid}/>
            </TouchableOpacity>
              )}
            </>   
            )}
        </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ceadff',
    color: '#000'
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  activityIndicatorViewStyle: {
    flex: 1,
  },
  imageBack:{
    width: 40,
    height: 40,
    marginLeft: 20,
    marginTop: 10
  },
  imageDoctor:{
    width: 40,
    height: 40,
    marginLeft: 50
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginTop: -20
  },
  contentViewStyle: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    padding: 15,
    color: '#000',
    fontSize: 20,
    marginRight: -20,
    width:350,
  },

  tryAgainButtonViewStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginTop: 20,
  },
  textButton: {
    fontSize: 17,
    color: '#000',
    alignItems: 'center',
    marginLeft: -40
  },
  imageCovid: {
    width: 200,
    height: 195,
    marginLeft: 170,
    marginRight: 60,
    marginTop: 15
  },

  imageSearch: {
    marginLeft: 90,
    marginTop: -24,
  },

});

export default Search;