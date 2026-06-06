import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create(
    {
        screen: {
            flex: 1,
            backgroundColor: '#E0F7FA',
        },

        container: {
            flex: 1,
            padding: 24,
            alignItems: 'center',
            justifyContent: 'center',
        },

        containerLandscape: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingHorizontal: 64,
        },

        header: {
            alignItems: 'center',
            marginBottom: 32,
        },

        emoji: {
            fontSize: 64,
            marginBottom: 12,
        },

        title: {
            fontSize: 34,
            fontWeight: '800',
            textAlign: 'center',
        },

        subtitle: {
            fontSize: 16,
            marginTop: 8,
            textAlign: 'center',
        },

        card: {
            width: '100%',
            maxWidth: 420,
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: 24,
            gap: 16,

            elevation: 8,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 12,
            shadowOffset: {
                width: 0,
                height: 6,
            },
        },

        cardLandscape: {
            maxWidth: 460,
            padding: 32,
        },

        button: {
            width: '100%',
            height: 64,
            backgroundColor: '#FFD166',
            borderRadius: 18,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
        },

        buttonPressed: {
            opacity: 0.75,
            transform: [{ scale: 0.98 }],
        },

        buttonIcon: {
            fontSize: 24,
        },

        buttonText: {
            fontSize: 18,
            fontWeight: '700',
        },
    });
