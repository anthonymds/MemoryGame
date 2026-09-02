import { StyleSheet } from 'react-native';

export const gameScreenStyles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#0f172a',
        padding: 24,
        justifyContent: 'space-between',
    },

    header: {
        alignItems: 'center',
        marginTop: 40,
    },

    title: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
    },

    counter: {
        color: '#cbd5e1',
        fontSize: 16,
        marginTop: 8,
    },

    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: '85%',
        height: '55%',
    },

    hint: {
        color: '#94a3b8',
        fontSize: 16,
        marginTop: 20,
    },

    backButton: {
        backgroundColor: '#334155',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 24,
    },

    backButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});