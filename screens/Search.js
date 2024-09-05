import { View, Text, SafeAreaView, StyleSheet, TextInput, Image, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { fetchSearch } from '../api/tvmaze'

const { width, height } = Dimensions.get('window')

const Search = ({ navigation }) => {

    const [results, setResults] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const fallbackImage = require('../assets/fallback.png')

    const handleInputChange = async (input) => {
        setSearchInput(input)
        const data = await fetchSearch(input)
        setResults(data)
        console.log(data);
    }



    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#262626' }}>
                <TextInput placeholder='What would you like to watch?' placeholderTextColor='grey' style={styles.searchInput} value={searchInput} onChangeText={input => handleInputChange(input)} />
            </SafeAreaView>
            {results.length === 0 ? (
                <Image source={require('../assets/movieTime.jpg')} style={{ width, height: height / 2 }} />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15, gap: 10, }}>
                    <Text style={styles.number}>Results: {results.length}</Text>
                    <View style={styles.resultsContainer}>
                        {results.map((item, index) => (
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Details', { item })}>
                                <View style={styles.result}>
                                    <Image source={item?.show?.image?.original ? { uri: item.show.image.original } : fallbackImage} style={styles.image} resizeMode="cover" />
                                    <Text style={styles.movieName}>{item?.show?.name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </ScrollView>

            )}
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    searchInput: {
        backgroundColor: '#fff',
        height: 50,
        margin: 10,
        marginBottom: 20,
        borderRadius: 25,
        paddingLeft: 20,
    },
    number: {
        color: '#262626',
        fontWeight: '600',
        marginTop: 10,
    },
    resultsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
        paddingVertical: 20,
    },
    result: {
        alignItems: 'center',
        gap: 10,
    },
    image: {
        width: 180,
        height: 250,
        borderRadius: 20
    },
    movieName: {
        fontSize: 20,
        textAlign: 'center',
        maxWidth: 180,
    }
})

export default Search