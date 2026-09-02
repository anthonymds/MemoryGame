import { useEffect, useMemo, useState } from 'react';
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { gameScreenStyles } from '@/styles/gameScreenStyles'
import {
    objectImages,
    dailyPlacesImages
} from '@/data/gameImages';

function shuffleArray<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function GameScreen() {
    const router = useRouter();

    const {
        mode,
        imageCount,
        imageDuration,
    } = useLocalSearchParams();

    const count = Number(imageCount);
    const duration = Number(imageDuration);

    const [currentIndex, setCurrentIndex] = useState(0);

    const images = useMemo(() => {
        if (mode === 'lugares') {
            return shuffleArray(dailyPlacesImages).slice(
                0,
                Math.min(count, dailyPlacesImages.length)
            );
        }

        return shuffleArray(objectImages).slice(
            0,
            Math.min(count, objectImages.length)
        );
    }, [mode, count]);

    const currentImage = images[currentIndex];

    function handleNextImage() {
        if (images.length === 0) {
            return;
        }

        setCurrentIndex((previousIndex) => {
            if (previousIndex >= images.length - 1) {
                return 0;
            }

            return previousIndex + 1;
        });
    }

    useEffect(() => {
        if (images.length === 0 || duration <= 0) {
            return;
        }

        const timer = setInterval(() => {
            handleNextImage();
        }, duration * 1000);

        return () => {
            clearInterval(timer);
        };
    }, [duration, images.length]);

    if (!currentImage) {
        return (
            <View style={gameScreenStyles.screen}>
                <StatusBar style="light" />

                <Text style={gameScreenStyles.title}>
                    Nenhuma imagem disponível
                </Text>

                <Pressable
                    style={gameScreenStyles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={gameScreenStyles.backButtonText}>
                        Voltar
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <Pressable style={gameScreenStyles.screen}>
            <StatusBar style="light" />

            <View style={gameScreenStyles.header}>
                <Text style={gameScreenStyles.title}>
                    {mode}
                </Text>

                <Text style={gameScreenStyles.counter}>
                    {currentIndex + 1} / {images.length}
                </Text>
            </View>

            <View style={gameScreenStyles.imageContainer}>
                <Image
                    source={currentImage.source}
                    style={gameScreenStyles.image}
                    resizeMode="contain"
                />
                <Text style={gameScreenStyles.hint}>{currentImage.name}</Text>
            </View>

            <Pressable
                style={gameScreenStyles.backButton}
                onPress={() => router.back()}
            >
                <Text style={gameScreenStyles.backButtonText}>
                    Voltar
                </Text>
            </Pressable>
        </Pressable>
    );
}