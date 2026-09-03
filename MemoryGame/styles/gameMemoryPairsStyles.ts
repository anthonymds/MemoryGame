import { StyleSheet } from 'react-native';

export const gameMemoryPairsStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        padding: 20,
    },

    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
    },

    card: {
        width: 120,
        height: 120,
        borderRadius: 18,
        backgroundColor: '#334155',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: '90%',
        height: '90%',
        borderRadius: 15,
    },

    question: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
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