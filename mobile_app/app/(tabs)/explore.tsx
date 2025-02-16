import {FlatList, StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState} from "react";

export default function TabTwoScreen() {
    const [events, setEvents] = useState([
        {
            name: 'Название',
            description: 'Описание',
            date: '2025-02-10',
            author: 'Петя'
        },
        {
            name: 'Название',
            description: 'Описание',
            date: '2025-02-10',
            author: 'Петя'
        },
        {
            name: 'Название',
            description: 'Описание',
            date: '2025-02-10',
            author: 'Петя'
        },
        {
            name: 'Название',
            description: 'Описание',
            date: '2025-02-10',
            author: 'Петя'
        },
        {
            name: 'Название',
            description: 'Описание',
            date: '2025-02-10',
            author: 'Петя'
        },
        {
            name: 'Название',
            description: 'Описание',
            date: '2025-02-10',
            author: 'Петя'
        },
        {
            name: 'Название',
            description: 'Описание',
            date: '2025-02-10',
            author: 'Петя'
        },
        {
            name: 'Название',
            description: 'Описание',
            date: '2025-02-10',
            author: 'Петя'
        },
        {
            name: 'Название',
            description: 'Описание',
            date: '2025-02-10',
            author: 'Петя'
        },
        {
            name: 'Название',
            description: 'Описание',
            date: '2025-02-10',
            author: 'Петя'
        },
    ])
    return (
        <ThemedView style={{flex: 1, padding: 32}}>
            <FlatList
                style={{gap: 10}}
                data={events} renderItem={({item}) => {
                return (<ThemedView style={{backgroundColor: 'green', borderRadius: 20, padding: 10, marginTop: 20}}>
                    <ThemedText>{item.name}</ThemedText>
                    <ThemedText>{item.description}</ThemedText>
                    <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'green'}}>
                        <ThemedText>{item.date}</ThemedText>
                        <ThemedText>{item.author}</ThemedText>
                    </ThemedView>
                </ThemedView>)
            }}/>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
