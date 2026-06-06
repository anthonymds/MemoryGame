import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
export default function Index() {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    return (
        <View style={globalStyles.screen}>
            <StatusBar style="light" />

            <View style={[globalStyles.container, isLandscape && globalStyles.containerLandscape]}>
                <View style={globalStyles.header}>
                    <Text style={globalStyles.emoji}>🧠</Text>
                    <Text style={globalStyles.title}>Jogo da Memória</Text>
                    <Text style={globalStyles.subtitle}>Escolha um modo para começar</Text>
                </View>

                <View style={[globalStyles.card, isLandscape && globalStyles.cardLandscape]}>
                    <ModeButton label="Números" icon="🔢" />
                    <ModeButton label="Cores" icon="🎨" />
                    <ModeButton label="Objetos" icon="🧸" />
                </View>
            </View>
        </View>
    );
}

function ModeButton({ label, icon }: { label: string; icon: string }) {
    return (
        <Pressable
            style={({ pressed }) => [
                globalStyles.button,
                pressed && globalStyles.buttonPressed,
            ]}
        >
            <Text style={globalStyles.buttonIcon}>{icon}</Text>
            <Text style={globalStyles.buttonText}>{label}</Text>
        </Pressable>
    );
}
