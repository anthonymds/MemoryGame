import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/styles/globalStyles';
export default function Index() {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const router = useRouter();

    function handleModePress(mode: string) {
        router.push(`/game/${mode}`);
    }

    return (
        <View style={globalStyles.screen}>
            <StatusBar style="light" />

            <View style={[globalStyles.container, isLandscape && globalStyles.containerLandscape]}>
                <View style={globalStyles.header}>
                    <Text style={globalStyles.title}>Jogo da Memória</Text>
                    <Text style={globalStyles.emoji}>🧠</Text>
                    <Text style={globalStyles.subtitle}>Escolha um modo para começar</Text>
                </View>

                <View style={[globalStyles.card, isLandscape && globalStyles.cardLandscape]}>
                    <ModeButton label="Números" icon="🔢" onPress={() => handleModePress('numeros')} />
                    <ModeButton label="Cores" icon="🎨" onPress={() => handleModePress('cores')} />
                    <ModeButton label="Objetos" icon="🧸" onPress={() => handleModePress('objetos')} />
                </View>
            </View>
        </View>
    );
}

function ModeButton({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) {
    return (
        <Pressable
            onPress={onPress}
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
