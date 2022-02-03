import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Mapa from '../../img/brazil.png'
import Local from '../../img/pin.png'


const Results = ({route, navigation}) => {

  //Chamada da API
  const [isLoading, setLoading] = useState(true);
  const [covidData, setCovidData] = useState();
  const [covidError, setCovidError] = useState();

  const getCovidData = useCallback(async () => {
    // CovidModule.getApiToken('GetApiToken', 'ApiToken', async apiToken => {
    const token="f042688ff795a674bf0777b63fe7895bbd6be564";
    const {selectedOption} = route.params;
    const url = `https://api.brasil.io/v1/dataset/covid19/caso_full/data?state=${selectedOption.uf}&city=${selectedOption.city}`;
      try {
        const response = await fetch(url, {
          method: 'get',
          headers: {
          Authorization: `Token ${token}`,
          },
        });
      const json = await response.json();
        if (json?.message) {
          setCovidError(json.message);
        } else if (json?.city) {
          setCovidError(json?.city[0]);
        } else {
          setCovidData(json.results[0]);
        }
      } catch (error) {
        setCovidError(
          'Não foi possível obter as informações do painel de covid para a cidade selecionada, tente novamente mais tarde.',
        );
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    // });
  }, [route.params]);

  useEffect(() => {
    getCovidData();
  }, [getCovidData]);

  const goBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const formatPtBrDecimalValue = value => {
    return value.toLocaleString('pt-br', {minimumFractionDigits: 0});
  };
   //Fecha chamada da API

  return (
    <SafeAreaView style={styles.container}>
        {isLoading ? (
        <ActivityIndicator
          size="large"
          style={styles.activityIndicatorViewStyle}
        />
        ) : (
          <View style={styles.contentViewStyle}>
            {covidError ? (
              <>
                <Text style={styles.line}></Text>
                <Text style={styles.textStyle}>{covidError}</Text>
                <TouchableOpacity
                  style={styles.buttonViewStyle}
                  onPress={() => goBack()}>
                  <Text style={styles.textButtonError}>Tentar novamente</Text>
                </TouchableOpacity>
              </>
            ) : (
      <>
      <View style={styles.viewTitle}>
      </View>
        <Text style={styles.welcome}>{route.params?.name}, essas são as ultimas atualizações!</Text>
        <Text style={styles.textSelect}>Novas atualizações:</Text>
      <View style={styles.borderSelect}>
        <Text style={styles.results2}>
          Última atualização: {covidData.date}
        </Text>
      </View>

      <View style={styles.borderSelect}>
        <Text style={styles.results2}>
          Cidade: {covidData.city} - {covidData.state}
        </Text>
      </View>

      <View style={styles.borderSelect}>
        <Text style={styles.results2}>
            População:{' '}
           {formatPtBrDecimalValue(covidData.estimated_population)}
        </Text>
      </View>

      <View style={styles.borderSelect}>
        <Text style={styles.results2}>
          Óbitos:{' '}
          {formatPtBrDecimalValue(covidData.last_available_deaths)}
        </Text>
      </View>

      <View style={styles.borderSelect}>
        <Text style={styles.results2}>
          Novos casos: {formatPtBrDecimalValue(covidData.new_confirmed)}
        </Text>
      </View>

      <View style={styles.borderSelect}>
        <Text style={styles.results2}>
          Novos óbitos: {formatPtBrDecimalValue(covidData.new_deaths)}
        </Text> 
      </View>
      
      <View style={styles.viewImage}>
        <ImageBackground source={Mapa} resizeMode='cover' style={styles.imageMap}>
          <Image source={Local} style={styles.imageLocation}/>
        </ImageBackground>
      </View>
      </>
      )}
      </View>
       )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ceadff'
  },
  viewTitle: {
    paddingVertical: 1,
    backgroundColor: '#ceadff',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#000',
  },
  welcome: {
     marginTop: 10,
     marginLeft: 45,
     marginRight: 100,
    fontSize: 20,
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  textSelect: {
    marginTop: 20,
    marginLeft: 45,
    textAlign: "left",
    fontSize: 20,
    color: '#000',
  },
  borderSelect:{
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 6,
    marginTop: 5,
    marginLeft: 45,
    marginRight: 45,
    padding: 0.9,
    backgroundColor: '#ffe8f3',
    alignItems: 'center',
    padding: 3
  },
  results2: {
    fontSize: 17,
    color: '#000'
  },
  viewImage: {
    backgroundColor: '#ceadff',
    height:260,
    marginTop: 5,
    marginLeft: 30
  },

  imageMap: {
    width: 170,
    height: 170,
    marginLeft: 60,
    marginRight: 60,
  },
  imageLocation: {
    width: 40,
    height: 40,
    marginLeft: 100,
    marginTop: 75
  },
  buttonViewStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginTop: 20,
    marginLeft: 90
  },
  textStyle: {
    marginTop: 160,
    textAlign: "center",
    fontSize: 25,
    color: '#000',
    alignSelf: 'center'
  },
  textButtonError: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 17,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginTop: -20
  },

})

export default Results;