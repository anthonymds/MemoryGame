import { StyleSheet } from 'react-native';

export const gameConfigModalStyles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    modal: {
        width: '90%',
        maxWidth: 450,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 28,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },

    mode: {
        fontSize: 17,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 25,
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    options: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 25,
    },

    option: {
        minWidth: 55,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
    },

    optionSelected: {
        backgroundColor: '#6366f1',
    },

    optionText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#374151',
    },

    optionTextSelected: {
        color: '#ffffff',
    },

    startButton: {
        backgroundColor: '#6366f1',
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 5,
    },

    startButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    cancelButton: {
        paddingVertical: 14,
        alignItems: 'center',
    },

    cancelButtonText: {
        color: '#6b7280',
        fontSize: 16,
        fontWeight: 'bold',
    },
});