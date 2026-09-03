import { StyleSheet } from 'react-native';

export const gameColorStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        padding: 20,
        justifyContent: 'center',
    },

    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
    },

    score: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 20,
    },

    word: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 40,
    },

    question: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20,
    },

    options: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
    },

    button: {
        width: 150,
        height: 120,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    darkText: {
        color: '#000',
    },
});