import { Pressable, Text, View } from 'react-native';
import { gameConfigModalStyles } from '@/styles/gameConfigModalStyles';
type gameConfigModalProps = {
    visible: boolean;
    mode: string | null;
    imageCount: number;
    imageDuration: number;
    pairCount: number;
    onChangeImageCount: (count: number) => void;
    onChangeImageDuration: (duration: number) => void;
    onChangePairCount: (count: number) => void;
    onStart: () => void;
    onClose: () => void;
};

export default function gameConfigModal({
    visible,
    mode,
    imageCount,
    imageDuration,
    pairCount,
    onChangeImageCount,
    onChangeImageDuration,
    onChangePairCount,
    onStart,
    onClose,
}: gameConfigModalProps) {

    if (!visible) {
        return null;
    }

    const modeNames: Record<string, string> = {
        numeros: 'Números',
        cores: 'Cores',
        objetos: 'Objetos',
        memoryLocation: 'Memória - Localização',
        memoryPairs: 'Memória - Pares',
        reflex: 'Reflexo',
    };

    function showImageSettings() {
        return [
            'memoryLocation',
        ].includes(mode ?? '');
    }

    function showPairSettings() {
        return mode === 'memoryPairs';
    }

    return (
        <View style={gameConfigModalStyles.overlay}>
            <View style={gameConfigModalStyles.modal}>

                <Text style={gameConfigModalStyles.title}>
                    Configurar jogo
                </Text>

                <Text style={gameConfigModalStyles.mode}>
                    {modeNames[mode ?? ''] ?? mode}
                </Text>

                {
                    showImageSettings() && (
                        <>
                            <Text style={gameConfigModalStyles.label}>
                                Quantas imagens?
                            </Text>

                            <View style={gameConfigModalStyles.options}>
                                {[4, 6, 8, 10].map((amount) => (
                                    <Pressable
                                        key={amount}
                                        onPress={() =>
                                            onChangeImageCount(amount)
                                        }
                                        style={[
                                            gameConfigModalStyles.option,
                                            imageCount === amount &&
                                            gameConfigModalStyles.optionSelected,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                gameConfigModalStyles.optionText,
                                                imageCount === amount &&
                                                gameConfigModalStyles.optionTextSelected,
                                            ]}
                                        >
                                            {amount}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>

                            <Text style={gameConfigModalStyles.label}>
                                Tempo para memorizar
                            </Text>

                            <View style={gameConfigModalStyles.options}>
                                {[3, 5, 8, 10].map((seconds) => (
                                    <Pressable
                                        key={seconds}
                                        onPress={() =>
                                            onChangeImageDuration(seconds)
                                        }
                                        style={[
                                            gameConfigModalStyles.option,
                                            imageDuration === seconds &&
                                            gameConfigModalStyles.optionSelected,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                gameConfigModalStyles.optionText,
                                                imageDuration === seconds &&
                                                gameConfigModalStyles.optionTextSelected,
                                            ]}
                                        >
                                            {seconds}s
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </>
                    )
                }

                {
                    showPairSettings() && (
                        <>
                            <Text style={gameConfigModalStyles.label}>
                                Quantidade de pares
                            </Text>

                            <View style={gameConfigModalStyles.options}>
                                {[3, 4, 6, 8].map((amount) => (
                                    <Pressable
                                        key={amount}
                                        onPress={() =>
                                            onChangePairCount(amount)
                                        }
                                        style={[
                                            gameConfigModalStyles.option,
                                            pairCount === amount &&
                                            gameConfigModalStyles.optionSelected,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                gameConfigModalStyles.optionText,
                                                pairCount === amount &&
                                                gameConfigModalStyles.optionTextSelected,
                                            ]}
                                        >
                                            {amount}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </>
                    )
                }

                <Pressable
                    style={gameConfigModalStyles.startButton}
                    onPress={onStart}
                >
                    <Text style={gameConfigModalStyles.startButtonText}>
                        Começar
                    </Text>
                </Pressable>

                <Pressable
                    style={gameConfigModalStyles.cancelButton}
                    onPress={onClose}
                >
                    <Text style={gameConfigModalStyles.cancelButtonText}>
                        Voltar
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}