import { useCallback, useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native';
import { dailyPlacesImages, GameImage } from '@/data/gameImages';
import { gameMemoryPairsStyles } from '@/styles/gameMemoryPairsStyles';
import { useRouter } from 'expo-router';

type MemoryPairsGameProps = {
    config: {
        imageCount?: number;
    };
};

type MemoryCard = {
    id: string;
    image: GameImage;
    flipped: boolean;
    matched: boolean;
};

function shuffleArray<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function MemoryPairsGame({ config, }: MemoryPairsGameProps) {
    const router = useRouter();
    const [cards, setCards] = useState<MemoryCard[]>([]);
    const [firstCard, setFirstCard] = useState<MemoryCard | null>(null);
    const [blocked, setBlocked] = useState(false);

    const createRound = useCallback(() => {
        const selectedImages =
            shuffleArray(dailyPlacesImages)
                .slice(
                    0,
                    config.imageCount || 6
                );

        const pairs = [...selectedImages, ...selectedImages];
        const generatedCards =
            shuffleArray(pairs)
                .map((image, index) => ({
                    id: `${image.id}-${index}`,
                    image,
                    flipped: false,
                    matched: false,
                }));

        setCards(generatedCards);
    }, [config.imageCount]);

    useEffect(() => { createRound(); }, [createRound]);

    function handleCardPress(card: MemoryCard) {
        if (
            blocked ||
            card.flipped ||
            card.matched
        ) {
            return;
        }
        const updatedCards =
            cards.map(item =>
                item.id === card.id
                    ?
                    {
                        ...item,
                        flipped: true,
                    }
                    :
                    item
            );
        setCards(updatedCards);

        if (!firstCard) {
            setFirstCard({ ...card, flipped: true });
            return;
        }
        checkPair(firstCard, card, updatedCards);
    }

    function checkPair(
        first: MemoryCard,
        second: MemoryCard,
        currentCards: MemoryCard[]
    ) {

        setBlocked(true);

        if (
            first.image.id === second.image.id
        ) {

            const updated = currentCards.map(card => {
                if (
                    card.id === first.id ||
                    card.id === second.id
                ) {
                    return {
                        ...card,
                        matched: true,
                    };
                }
                return card;
            });

            setCards(updated);
            const finished = updated.every(card => card.matched);

            resetSelection();

            if (finished) {

                setTimeout(() => {

                    createRound();

                }, 1000);

                return;
            }
            setBlocked(false);

        }
        else {

            setTimeout(() => {

                const updated =
                    currentCards.map(card => {
                        if (
                            card.id === first.id ||
                            card.id === second.id
                        ) {
                            return {
                                ...card,
                                flipped: false,
                            };
                        }
                        return card;
                    });
                setCards(updated);
                resetSelection();
                setBlocked(false);

            }, 1000);
        }
    }

    function resetSelection() {
        setFirstCard(null);
        setBlocked(false);
    }

    return (
        <View style={gameMemoryPairsStyles.container}>
            <Text style={gameMemoryPairsStyles.title}>
                Memória de Pares
            </Text>

            <View style={gameMemoryPairsStyles.grid}>
                {
                    cards.map(card => (

                        <Pressable
                            key={card.id}
                            style={gameMemoryPairsStyles.card}
                            onPress={() =>
                                handleCardPress(card)
                            }
                        >

                            {
                                card.flipped || card.matched ?
                                    <Image
                                        source={
                                            card.image.source
                                        }
                                        style={gameMemoryPairsStyles.image}
                                    />

                                    :

                                    <Text style={gameMemoryPairsStyles.question}>
                                        ?
                                    </Text>
                            }
                        </Pressable>
                    ))
                }
            </View>
            <Pressable
                style={gameMemoryPairsStyles.backButton}
                onPress={() => router.back()}
            >
                <Text style={gameMemoryPairsStyles.backButtonText}>
                    Voltar
                </Text>
            </Pressable>
        </View>
    );
}
