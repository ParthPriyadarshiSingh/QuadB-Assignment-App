import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Linking } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window')

const Details = ({ route, navigation }) => {

    const { item } = route.params

    const fallbackImage = require('../assets/fallback.png')
    const cleanSummary = item?.show?.summary?.replace(/<\/?[^>]+(>|$)/g, '');
    const handlePress = () => {
        url = item?.show?.url
        Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#262626' }}>

            <SafeAreaView style={{ position: 'absolute', zIndex: 20, width: width }}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={20} color="#fff" />
                </TouchableOpacity>
            </SafeAreaView>
            <View style={styles.detailsContainer}>
                <Image source={item?.show?.image?.original ? { uri: item.show.image.original } : fallbackImage}
                    style={styles.image} resizeMode='cover' />
                <LinearGradient
                    colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                    style={{
                        width, height: height * 0.2, position: 'absolute', bottom: 0,
                        flex: 1,
                    }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }} />
                <Text style={styles.movieName}>{item?.show?.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.details}>{item?.show?.premiered?.split('-')[0]} · {item?.show?.language}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {item?.show?.genres?.map((genre, index) => {
                        const showDot = index + 1 !== item?.show?.genres?.length
                        return (
                            <Text key={index} style={styles.details}> {genre} {showDot ? '·' : null}</Text>
                        )
                    })}
                </View>
                <Text style={styles.summary}>{cleanSummary}</Text>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.link}>Visit  Page</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    backButton: {
        width: 35,
        height: 35,
        borderRadius: 10,
        backgroundColor: '#d5b60a',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
    },
    detailsContainer: {
        alignItems: 'center',
        gap: 10,
    },
    image: {
        width: width,
        height: height * 0.6,
    },
    movieName: {
        fontSize: 28,
        color: '#fff',
    },
    details: {
        fontSize: 16,
        fontWeight: '600',
        color: '#c0c0c0'
    },
    summary: {
        color: '#fff',
        fontSize: 18,
        margin: 10,
        textAlign: 'center',
    },
    link: {
        color: '#7CB9E8',
        textDecorationLine: 'underline',
        fontSize: 18,
        marginBottom: 20,
    },
})

export default Details