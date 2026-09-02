import { StyleSheet } from 'react-native';
export const reflexGameStyles = StyleSheet.create({

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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0f172a',
    },

    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    question: {
        color: '#cbd5e1',
        textAlign: 'center',
        marginTop: 30,
        fontSize: 18,
    },

    answer: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
    },

    card: {
        width: 250,
        height: 250,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },

    round: {
        color: '#94a3b8',
        textAlign: 'center',
    },

});