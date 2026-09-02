import { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    dailyPlacesImages,
    GameImage,
} from '@/data/gameImages';

type MemoryLocationGameProps = {
    config: {
        imageCount?: number;
        imageDuration?: number;
    };
};

type MemoryCard = {
    id: string;
    image: GameImage;
    revealed: boolean;
    found: boolean;
};

type GamePhase =
    | 'memorizing'
    | 'playing'
    | 'finished';

function shuffleArray<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function MemoryLocationGame({
    config,
}: MemoryLocationGameProps) {

    const [cards, setCards] = useState<MemoryCard[]>([]);
    const [phase, setPhase] = useState<GamePhase>('memorizing');
    const [targetCardId, setTargetCardId] = useState<string | null>(null);

    useEffect(() => {
        const selectedImages =
            shuffleArray(dailyPlacesImages)
                .slice(
                    0,
                    config.imageCount || 6
                );

        const generatedCards =
            selectedImages.map(image => ({
                id: image.id,
                image,
                revealed: true,
                found: false,
            }));

        setCards(generatedCards);

        const timer = setTimeout(() => {
            setCards(previous =>
                previous.map(card => ({
                    ...card,
                    revealed: false,
                }))
            );

            setPhase('playing');
            setTimeout(() => {
                selectNextCard(generatedCards);
            }, 300);
        }, (config.imageDuration ?? 5) * 1000);
        return () => clearTimeout(timer);

    }, []);

    function selectNextCard(currentCards: MemoryCard[]) {

        const availableCards = currentCards.filter(card => !card.found);

        if (availableCards.length === 0) {
            setPhase('finished');
            setTargetCardId(null);
            return;
        }

        const randomCard =
            availableCards[
            Math.floor(
                Math.random() * availableCards.length
            )
            ];
        setTargetCardId(randomCard.id);
    }

    function handleCardPress(selectedCard: MemoryCard) {
        if (
            phase !== 'playing' ||
            !targetCard
        ) {
            return;
        }

        if (selectedCard.id !== targetCard.id) {
            return;
        }
        const updatedCards = cards.map(card => {

            if (card.id === selectedCard.id) {
                return {
                    ...card,
                    found: true,
                    revealed: true,
                };
            }
            return card;
        });
        setCards(updatedCards);
        setTimeout(() => {
            selectNextCard(updatedCards);
        }, 10);
    }
    const targetCard = cards.find(card => card.id === targetCardId);
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Memória de Localização
            </Text>

            {
                phase === 'memorizing' && (
                    <Text style={styles.message}>
                        Memorize as posições
                    </Text>
                )
            }

            {
                phase === 'playing' &&
                targetCard && (
                    <Text style={styles.message}>
                        Encontre: {
                            phase === 'playing' &&
                            targetCard && (
                                <Text style={styles.message}>
                                    Encontre: {targetCard.image.name}
                                </Text>
                            )
                        }
                    </Text>
                )
            }
            {
                phase === 'finished' && (
                    <Text style={styles.message}>
                        Parabéns! Finalizado 🎉
                    </Text>
                )
            }

            <View style={styles.grid}>
                {
                    cards.map(card => (
                        <Pressable
                            key={card.id}
                            style={styles.card}
                            onPress={() =>
                                handleCardPress(card)
                            }
                        >
                            {
                                card.revealed || card.found ?
                                    <Image source={card.image.source} style={styles.image} />
                                    :
                                    <Text
                                        style={styles.question}
                                    >
                                        ?
                                    </Text>
                            }
                        </Pressable>
                    ))
                }
            </View>
        </View>
    );
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        padding: 20,
    },

    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    score: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },

    message: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 25,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
    },

    card: {
        width: 120,
        height: 120,
        borderRadius: 18,
        backgroundColor: '#334155',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: '90%',
        height: '90%',
        borderRadius: 15,
    },

    question: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
    },

});