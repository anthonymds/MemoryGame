import { Pressable, Text, View } from 'react-native';
import { gameConfigModalStyles } from '@/styles/gameConfigModalStyles';

type gameConfigModalProps = {
    visible: boolean;
    mode: string | null;
    imageCount: number;
    imageDuration: number;
    onChangeImageCount: (count: number) => void;
    onChangeImageDuration: (duration: number) => void;
    onStart: () => void;
    onClose: () => void;
};

export default function gameConfigModal({
    visible,
    mode,
    imageCount,
    imageDuration,
    onChangeImageCount,
    onChangeImageDuration,
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
    };

    function showImageSettings() {
        return [
            'memoryLocation',
            'reflex',
        ].includes(mode ?? '');
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
                        </>
                    )
                }

                {
                    showImageSettings() && (
                        <>
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

