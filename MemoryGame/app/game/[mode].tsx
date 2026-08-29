import { useMemo, useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { globalStyles } from '@/styles/globalStyles';

type GameImage = {
    id: string;
    name: string;
    source: ImageSourcePropType;
};

const objectImages: GameImage[] = [
    {
        id: 'barco',
        name: 'Barco',
        source: require('../../assets/gamesImages/objects/boatImage.png'),
    },
    {
        id: 'relogio',
        name: 'Relógio',
        source: require('../../assets/gamesImages/objects/clockImage.png'),
    },
    {
        id: 'casa',
        name: 'Casa',
        source: require('../../assets/gamesImages/objects/houseImage.png'),
    },
    {
        id: 'pc',
        name: 'Pc',
        source: require('../../assets/gamesImages/objects/pcImage.png'),
    },
    {
        id: 'violao',
        name: 'Violão',
        source: require('../../assets/gamesImages/objects/guitarImage.png'),
    }, {
        id: 'caneca',
        name: 'Caneca',
        source: require('../../assets/gamesImages/objects/mugImage.png'),
    }, {
        id: 'navio',
        name: 'Navio',
        source: require('../../assets/gamesImages/objects/shipImage.png'),
    }, {
        id: 'pelucia',
        name: 'Pelúcia',
        source: require('../../assets/gamesImages/objects/teddyBearImage.png'),
    },
];

function shuffleArray<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function GameScreen() {
    const { mode } = useLocalSearchParams();
    const router = useRouter();

    const [currentIndex, setCurrentIndex] = useState(0);

    const images = useMemo(() => {
        if (mode === 'objetos') {
            return shuffleArray(objectImages);
        }

        return [];
    }, [mode]);

    const currentImage = images[currentIndex];

    function handleNextImage() {
        if (images.length === 0) {
            return;
        }

        if (currentIndex >= images.length - 1) {
            setCurrentIndex(0);
            return;
        }

        setCurrentIndex((previousIndex) => previousIndex + 1);
    }

    if (mode !== 'objetos') {
        return (
            <View style={globalStyles.screen}>
                <StatusBar style="light" />

                <View style={globalStyles.container}>
                    <Text style={globalStyles.title}>Modo ainda não disponível</Text>
                    <Text style={globalStyles.subtitle}>Modo selecionado: {String(mode)}</Text>

                    <Pressable style={globalStyles.button} onPress={() => router.back()}>
                        <Text style={globalStyles.buttonText}>Voltar</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    if (!currentImage) {
        return (
            <View style={globalStyles.screen}>
                <StatusBar style="light" />

                <View style={globalStyles.container}>
                    <Text style={globalStyles.title}>Nenhuma imagem encontrada</Text>
                    <Text style={globalStyles.subtitle}>
                        Adicione imagens no array objectImages.
                    </Text>

                    <Pressable style={globalStyles.button} onPress={() => router.back()}>
                        <Text style={globalStyles.buttonText}>Voltar</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <Pressable style={styles.screen} onPress={handleNextImage}>
            <StatusBar style="light" />

            <View style={styles.header}>
                <Text style={styles.title}>Modo Objetos</Text>
                <Text style={styles.counter}>
                    {currentIndex + 1} / {images.length}
                </Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={currentImage.source}
                    style={styles.image}
                    resizeMode="contain"
                />

                {/* <Text style={styles.imageName}>{currentImage.name}</Text> */}
                <Text style={styles.hint}>Toque na tela para trocar</Text>
            </View>

            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#0f172a',
        padding: 24,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    title: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    counter: {
        color: '#cbd5e1',
        fontSize: 16,
        marginTop: 8,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '85%',
        height: '55%',
    },
    imageName: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24,
    },
    hint: {
        color: '#94a3b8',
        fontSize: 16,
        marginTop: 8,
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