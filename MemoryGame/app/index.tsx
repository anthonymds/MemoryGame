import { StatusBar } from 'expo-status-bar';
import {
    Pressable,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { globalStyles } from '@/styles/globalStyles';
import GameConfigModal from '@/components/gameConfigModal';

export default function Index() {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const router = useRouter();
    // Modo selecionado pelo usuário
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    // Controle de exibição do popup
    const [showConfig, setShowConfig] = useState(false);
    // Configurações do jogo
    const [imageCount, setImageCount] = useState(5);
    const [imageDuration, setImageDuration] = useState(3);

    function handleModePress(mode: string) {
        setSelectedMode(mode);
        setShowConfig(true);
    }

    function handleStartGame() {
        if (!selectedMode) {
            return;
        }

        setShowConfig(false);

        router.push({
            pathname: '/game/[mode]',
            params: {
                mode: selectedMode,
                imageCount: String(imageCount),
                imageDuration: String(imageDuration),
            },
        });
    }

    function handleCloseConfig() {
        setShowConfig(false);
        setSelectedMode(null);
    }

    return (
        <View style={globalStyles.screen}>
            <StatusBar style="light" />

            <View style={[globalStyles.container, isLandscape && globalStyles.containerLandscape,]}>
                <View style={globalStyles.header}>

                    <Text style={globalStyles.title}>
                        Jogo da Memória
                    </Text>

                    <Text style={globalStyles.emoji}>
                        🧠
                    </Text>

                    <Text style={globalStyles.subtitle}>
                        Escolha um modo para começar
                    </Text>

                </View>

                <View style={[globalStyles.card, isLandscape && globalStyles.cardLandscape,]}>
                    <ModeButton
                        label="Lugares Famosos"
                        icon="✈️"
                        onPress={() => handleModePress('lugaresFamosos')}
                    />

                    <ModeButton
                        label="Cores"
                        icon="🎨"
                        onPress={() => handleModePress('cores')}
                    />

                    <ModeButton
                        label="Objetos"
                        icon="🧸"
                        onPress={() => handleModePress('objetos')}
                    />

                </View>
            </View>

            <GameConfigModal
                visible={showConfig}
                mode={selectedMode}
                imageCount={imageCount}
                imageDuration={imageDuration}
                onChangeImageCount={setImageCount}
                onChangeImageDuration={setImageDuration}
                onStart={handleStartGame}
                onClose={handleCloseConfig}
            />
        </View>
    );
}

type ModeButtonProps = {
    label: string;
    icon: string;
    onPress: () => void;
};

function ModeButton({
    label,
    icon,
    onPress,
}: ModeButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                globalStyles.button,
                pressed && globalStyles.buttonPressed,
            ]}
        >
            <Text style={globalStyles.buttonIcon}>
                {icon}
            </Text>

            <Text style={globalStyles.buttonText}>
                {label}
            </Text>
        </Pressable>
    );
}