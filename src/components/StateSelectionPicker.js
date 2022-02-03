import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const StateSelectionPicker = ({dataSource, onOptionSelected}) => {
const [isLoading, setLoading] = useState(false);
const [ufPickerData, setUfPickerData] = useState([]);
const [selectedUf, setSelectedUf] = useState();
const [cityPickerData, setCityPickerData] = useState([]);
const [cityPickerDataError, setCityPickerDataError] = useState();
const [selectedCity, setSelectedCity] = useState();

  useEffect(() => {
    const getUfPickerData = () => {
      return dataSource.map(o => {
        return {
          value: {id: o.id, uf: o.sigla},
          label: o.nome + ' - ' + o.sigla,
        };
      });
    };

  setUfPickerData(getUfPickerData);
  }, [dataSource]);

  const getCityData = async newUfValue => {
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${newUfValue.id}/distritos`,
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
      setCityPickerData(getCityPickerData(json));
    } catch (error) {
      setCityPickerDataError(
        'Não foi possível obter a lista de cidades para a UF selecionada.',
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const getCityPickerData = response => {
    return response.map(o => {
      return {value: o.nome, label: o.nome};
    });
  };

  const onUfValueChanged = async newUfValue => {
    if (newUfValue) {
      setSelectedCity(9999);
      setSelectedUf(newUfValue);
      onOptionSelected(null);
      if (newUfValue !== 9999) {
        setLoading(true);
        setCityPickerDataError();
        await getCityData(newUfValue);
      }
    }
  };

  const onCityValueChanged = newCityValue => {
    if (newCityValue) {
      setSelectedCity(newCityValue);
      if (newCityValue !== 9999) {
        const selectedOption = {
          uf: selectedUf.uf,
          city: newCityValue,
        };
        onOptionSelected(selectedOption);
      } else {
        onOptionSelected(null);
      }
    }
  };

  return (
    <>
      <RNPickerSelect
        placeholder={{
          label: 'Escolha um Estado',
          value: 9999, 
          color: 'balck'
        }}
        onValueChange={value => onUfValueChanged(value)}
        items={ufPickerData}
        value={selectedUf}
        useNativeAndroidPickerStyle={false}
        style={styles.listSelected}
      />
      <>
        {cityPickerDataError ? (
          <>
            <Text style={styles.errorTextStyle}>{cityPickerDataError}</Text>
          </>
        ) : (
          <>
      <RNPickerSelect
        placeholder={{
        label: 'Escolha uma cidade',
        value: 9999,
        color: 'black'
        }}
        onValueChange={value => onCityValueChanged(value)}
        items={cityPickerData}
        disabled={isLoading || !(selectedUf !== 9999)}
        value={selectedCity}
        useNativeAndroidPickerStyle={false}
        style={styles.listSelected}
      />
        {isLoading && <ActivityIndicator size="large" />}
          </>
        )}
      </>
    </>
  );
};

const styles = StyleSheet.create({
  errorTextStyle: {
    padding: 15,
  },
  listSelected: {
    inputAndroid: {
    fontSize: 17,
    backgroundColor: '#bf73fa',
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    color: '#fff',
    paddingRight: 30,
    margin: 10,
    textAlign: 'center'
    },
  }
});

export default StateSelectionPicker;