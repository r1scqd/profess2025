import {Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import {ThemedView} from '@/components/ThemedView';
import Swiper from 'react-native-swiper';
import {ThemedText} from "@/components/ThemedText";
import {useState} from "react";

export default function HomeScreen() {
    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState([
        {
            image: 'https://reactnative.dev/img/tiny_logo.png',
            name: 'Название новости 1',
            description: 'Описание новости',
            date: '2025-02-10'
        },
        {
            image: 'https://reactnative.dev/img/tiny_logo.png',
            name: 'Название новости 2',
            description: 'Описание новости',
            date: '2025-02-10'
        },
        {
            image: 'https://reactnative.dev/img/tiny_logo.png',
            name: 'Название новости 3',
            description: 'Описание новости',
            date: '2025-02-10'
        },
        {
            image: 'https://reactnative.dev/img/tiny_logo.png',
            name: 'Название новости 4',
            description: 'Описание новости',
            date: '2025-02-10'
        },
    ])
    return (
        <ThemedView style={styles.wrapper}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            >
                <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedView style={{opacity: 50, backgroundColor: 'white', padding: 16, borderRadius: 8}}>
                        <ThemedText>
                            Новасть харошая или плохая?
                        </ThemedText>
                        <TouchableOpacity onPress={() => setIsVisible(false)}>
                            <ThemedText>Закрыть</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>
            </Modal>
            <Swiper showsButtons={true}>
                {data.map((item, index) => (
                    <TouchableWithoutFeedback
                        style={{flex: 1}}
                        onLongPress={() => {
                            setIsVisible(true)
                            console.log('длинный пресс')
                        }}>
                        <ThemedView
                            style={{flex: 1, padding: 20, paddingVertical: 48, position: 'relative'}}>
                            <Image style={{...styles.reactLogo, alignSelf: 'center'}} source={{uri: item.image}}/>
                            <ThemedText style={{alignSelf: 'center', marginTop: 32}}>{item.name}</ThemedText>
                            <ThemedText style={{paddingHorizontal: 24}}>{item.description}</ThemedText>
                            <ThemedView style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                position: 'absolute',
                                bottom: 16,
                                padding: 24,
                                alignItems: 'center',
                                gap: 200
                            }}>
                                <ThemedView style={{flexDirection: 'row', gap: 8}}>
                                    <ThemedText>+15</ThemedText>
                                    <ThemedText>-10</ThemedText>
                                </ThemedView>
                                <ThemedView>
                                    <ThemedText>{item.date}</ThemedText>
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                    </TouchableWithoutFeedback>
                ))}
            </Swiper>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
    },
    wrapper: {
        flex: 1
    },
    newsContainer: {
        borderRadius: 15
    }
});
