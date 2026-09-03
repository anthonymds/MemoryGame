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

const modesWithConfig = [
    'memory',
    'memoryLocation'
];

export default function Index() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const [showConfig, setShowConfig] = useState(false);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [imageCount, setImageCount] = useState(4);
    const [imageDuration, setImageDuration] = useState(10);

    function handleModePress(mode: string) {

        if (modesWithConfig.includes(mode)) {
            setSelectedMode(mode);
            setShowConfig(true);
            return;
        }

        router.push({
            pathname: '/game/[mode]',
            params: {
                mode,
            },
        });
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

    return (
        <View style={globalStyles.screen}>
            <StatusBar style="light" />
            <View
                style={[
                    globalStyles.container,
                    isLandscape &&
                    globalStyles.containerLandscape,
                ]}
            >
                <View style={globalStyles.header}>
                    <Text style={globalStyles.emoji}>
                        🧠
                    </Text>

                    <Text style={globalStyles.title}>
                        Jogo da Memória
                    </Text>

                    <Text style={globalStyles.subtitle}>
                        Escolha um desafio
                    </Text>
                </View>

                <View style={globalStyles.card}>
                    <ModeButton
                        label="Clicar na Imagem"
                        icon="⚡"
                        onPress={() => handleModePress('reflex')}
                    />

                    <ModeButton
                        label="Localizar Imagem"
                        icon="📍"
                        onPress={() => handleModePress('memoryLocation')}
                    />

                    <ModeButton
                        label="Juntar Pares"
                        icon="🃏"
                        onPress={() => handleModePress('memoryPairs')}
                    />

                    <ModeButton
                        label="Cores"
                        icon="🎨"
                        onPress={() => handleModePress('colors')}
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
                onClose={() => setShowConfig(false)
                }
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
                pressed &&
                globalStyles.buttonPressed,
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