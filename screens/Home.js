import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { fetchAll } from '../api/tvmaze'
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Home = ({ navigation }) => {

    const fallbackImage = require('../assets/fallback.png')

    const [allMovies, setAllMovies] = useState([])

    const scrollY = useRef(new Animated.Value(0)).current
    const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);



    const backgroundColor = scrollY.interpolate({
        inputRange: [0, 550],
        outputRange: ['rgba(38, 38, 38, 1)', 'rgba(38, 38, 38, 0.1)'],
        extrapolate: 'clamp',
    });

    const color = scrollY.interpolate({
        inputRange: [0, 550],
        outputRange: ['#fff', '#000'],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        fetchAllMovies()
    }, [])

    const fetchAllMovies = async () => {
        const data = await fetchAll()
        setAllMovies(data)
    }

    const handleSearch = () => {
        navigation.navigate('Search')
    }

    return (
        <>
            <AnimatedSafeAreaView style={{ backgroundColor }}>
                <View style={styles.header}>
                    <Animated.Text style={[styles.appName, { color }]}>Let's watch!</Animated.Text>
                    <TouchableOpacity onPress={handleSearch}>
                        <FontAwesome name="search" size={24} color={'red'} />
                    </TouchableOpacity>
                </View>
            </AnimatedSafeAreaView>

            <Animated.ScrollView contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {allMovies.length !== 0 && allMovies.map((item, index) => {
                    const cleanSummary = item?.show?.summary?.replace(/<\/?[^>]+(>|$)/g, '');
                    return (
                        <TouchableOpacity key={index} style={styles.movieContainer} activeOpacity={0.8} onPress={() => navigation.navigate('Details', { item })}>
                            <Image source={item?.show?.image?.original ? { uri: item.show.image.original } : fallbackImage}
                                style={styles.image} resizeMode='cover' />
                            <Text style={styles.movieName}>{item?.show?.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.details}>{item?.show?.premiered?.split('-')[0]} · {item?.show?.language}</Text>
                            </View>
                            <Text style={styles.summary}>{cleanSummary}</Text>
                        </TouchableOpacity>
                    )
                })}
            </Animated.ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    appName: {
        fontSize: 28,
        fontWeight: '600',
    },
    scrollView: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        padding: 20,
        backgroundColor: '#fff',
    },
    movieContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    image: {
        width: 350,
        height: 500,
        borderRadius: 20,
    },
    movieName: {
        fontSize: 24,
    },
    details: {
        fontSize: 16,
        fontWeight: '600'
    },
    summary: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 10,
        textAlign: 'center',
    }
})

export default Home