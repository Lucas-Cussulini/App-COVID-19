import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Vaccine from '../../img/vaccine.png';

const Home = ({route, navigation}) => {

    const [name, setName] = useState();

    const navigateToSearch = () => {
        if(name !== ''){
        navigation.navigate('Search', {name});

        }else{
            console.warn('Informe seu nome, por favor!')
        }
    }



    return(
        <SafeAreaView style={styles.mainView}>
            <ScrollView>
            <View style={styles.line}>
            </View>
            <Text style={styles.title}>
                Seja bem-vindo {'\n'}ao Query Covid-19!
            </Text>

            <Text style={styles.description}>
                * Realize consultas sobre a Covid-19!
                {'\n'}
                * Obtenha dados reais e confiáveis!
                {'\n'}
                * Mantenha-se atualizado todos os dias!
            </Text>
            <TextInput
                style={styles.getName}
                placeholder="Digite seu nome"
                value={name}
                onChangeText={text=>setName(text)}
                autoCapitalize="words"
                />
            <Text style={styles.line2}></Text>
            <TouchableOpacity
                style={styles.goButton}
                onPress={navigateToSearch}>
                <Text style={styles.textGoButton}>Vamos lá!</Text>
            </TouchableOpacity>

            <Text style={styles.textFooter}
                onPress={() => {
                    Linking.openURL('https://www.gov.br/anvisa/pt-br/assuntos/paf/coronavirus/vacinas')
                    .catch(err => {
                    console.error('Não foi possivel carregar a página', err)
                    Alert.alert('Não foi possivel carregar a página')})}}>
                VACINE-SE JÁ
            </Text> 
            <Image source={Vaccine} style={styles.imageFooter}/>

            </ScrollView>
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#ceadff',
    },
    line: {
        borderTopColor: '#000',
        borderTopWidth: 2
    },
    title: {
        padding: 35,
        lineHeight: 30,
        fontSize: 25,
        color: '#000',
        textAlign: 'center',
        marginTop: 30
    },
    description: {
        lineHeight: 30,
        fontSize: 18,
        color: '#000',
        paddingLeft: 30
    },
    getName: {
        color: '#000',
        width: 200,
        paddingLeft: 55,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 18,
        marginTop: 30
    },
    line2: {
        borderTopColor: '#000',
        borderTopWidth: 2,
        marginLeft: 30,
        marginRight: 30
    },
    goButton: {
        alignItems: 'center',
        backgroundColor: '#bf73fa',
        alignSelf: 'center',
        padding: 15,
        height: 50,
        width: 200,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 14,
        marginTop: 15,
    },
    textGoButton: {
        color: '#000',
        fontSize: 17,
    },
    textFooter: {
        color: '#000',
        fontSize: 17,
        alignSelf: 'center',
        paddingTop: 30,
    },
    imageFooter: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        paddingTop: 15
    }
})

export default Home;