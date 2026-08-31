import { useEffect, useMemo, useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    Pressable,
    Text,
    View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { gameScreenStyles } from '@/styles/gameScreenStyles'

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

const famousPlacesImages: GameImage[] = [
    {
        id: 'bigBen',
        name: 'Big Ben',
        source: require('../../assets/gamesImages/famousPlaces/bigBen.jpg'),
    },
    {
        id: 'colosseum',
        name: 'Coliseu',
        source: require('../../assets/gamesImages/famousPlaces/colosseum.jpg'),
    },
    {
        id: 'cristoRedentor',
        name: 'Cristo Redentor',
        source: require('../../assets/gamesImages/famousPlaces/cristoRedentor.jpg'),
    },
    {
        id: 'eiffelTower',
        name: 'Torre Eiffel',
        source: require('../../assets/gamesImages/famousPlaces/eiffelTower.jpg'),
    },
    {
        id: 'goldenGateBridge',
        name: 'Golden Gate Bridge',
        source: require('../../assets/gamesImages/famousPlaces/goldenGateBridge.jpg'),
    },
    {
        id: 'greatWall',
        name: 'Grande Muralha da China',
        source: require('../../assets/gamesImages/famousPlaces/greatWall.jpg'),
    },
    {
        id: 'mountFuji',
        name: 'Monte Fuji',
        source: require('../../assets/gamesImages/famousPlaces/mountFuji.jpg'),
    },
    {
        id: 'notreDame',
        name: 'Notre-Dame',
        source: require('../../assets/gamesImages/famousPlaces/notreDame.jpg'),
    },
    {
        id: 'osakaCastle',
        name: 'Castelo de Osaka',
        source: require('../../assets/gamesImages/famousPlaces/osakaCastle.jpg'),
    },
    {
        id: 'pyramidsGiza',
        name: 'Pirâmides de Gizé',
        source: require('../../assets/gamesImages/famousPlaces/pyramidsGiza.jpg'),
    },
    {
        id: 'statueLiberty',
        name: 'Estátua da Liberdade',
        source: require('../../assets/gamesImages/famousPlaces/statueLiberty.jpg'),
    },
    {
        id: 'sydneyOperaHouse',
        name: 'Sydney Opera House',
        source: require('../../assets/gamesImages/famousPlaces/sydneyOperaHouse.jpg'),
    },
    {
        id: 'tajMahal',
        name: 'Taj Mahal',
        source: require('../../assets/gamesImages/famousPlaces/tajMahal.jpeg'),
    },
    {
        id: 'timesSquare',
        name: 'Times Square',
        source: require('../../assets/gamesImages/famousPlaces/timesSquare.jpg'),
    },
    {
        id: 'towerPisa',
        name: 'Torre de Pisa',
        source: require('../../assets/gamesImages/famousPlaces/towerPisa.jpg'),
    },
];

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
        if (mode == 'lugaresFamosos') {
            return shuffleArray(famousPlacesImages).slice(
                0,
                Math.min(count, famousPlacesImages.length)
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

    // if (mode !== 'objetos') {
    //     return (
    //         <View style={gameScreenStyles.screen}>
    //             <StatusBar style="light" />

    //             <Text style={gameScreenStyles.title}>
    //                 Modo não disponível
    //             </Text>

    //             <Pressable
    //                 style={gameScreenStyles.backButton}
    //                 onPress={() => router.back()}
    //             >
    //                 <Text style={gameScreenStyles.backButtonText}>
    //                     Voltar
    //                 </Text>
    //             </Pressable>
    //         </View>
    //     );
    // }

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