import { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native';
import { reflexGameStyles } from '@/styles/reflexGameStyles';
import { dailyPlacesImages, GameImage } from '@/data/gameImages';
import { useRouter } from 'expo-router';

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

function shuffleArray<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function MemoryLocationGame({ config, }: MemoryLocationGameProps) {
    const router = useRouter();
    const [cards, setCards] = useState<MemoryCard[]>([]);
    const [targetCardId, setTargetCardId] = useState<string | null>(null);
    const [showImages, setShowImages] = useState(true);

    function createRound() {
        const selectedImages =
            shuffleArray(dailyPlacesImages)
                .slice(0, config.imageCount || 6);

        const newCards =
            selectedImages.map(image => ({
                id: image.id,
                image,
                revealed: true,
                found: false,
            }));

        setCards(newCards);
        setShowImages(true);

        setTimeout(() => {
            setCards(previous =>
                previous.map(card => ({
                    ...card,
                    revealed: false,
                }))
            );

            selectTarget(newCards);
            setShowImages(false);

        }, (config.imageDuration || 5) * 1000);
    }



    function selectTarget(currentCards: MemoryCard[]) {
        const availableCards = currentCards.filter(card => !card.found);

        if (availableCards.length === 0) {
            createRound();
            return;
        }

        const randomCard =
            availableCards[
            Math.floor(
                Math.random() *
                availableCards.length
            )
            ];
        setTargetCardId(randomCard.id);
    }

    useEffect(() => { createRound(); }, []);

    function handleCardPress(selectedCard: MemoryCard) {
        if (
            showImages ||
            !targetCardId
        ) {
            return;
        }

        if (
            selectedCard.id !== targetCardId
        ) {
            return;
        }

        const updatedCards =
            cards.map(card => {
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

        const remaining =
            updatedCards.filter(
                card => !card.found
            );

        if (remaining.length === 0) {
            setTimeout(() => {
                createRound();
            }, 700);
            return;
        }

        selectTarget(updatedCards);
    }

    const targetCard = cards.find(card => card.id === targetCardId);

    return (
        <View style={reflexGameStyles.container}>
            <Text style={reflexGameStyles.title}>
                Memória de Localização
            </Text>

            {
                targetCard && (
                    <Text style={reflexGameStyles.message}>
                        Encontre: {targetCard.image.name}
                    </Text>
                )
            }

            <View style={reflexGameStyles.grid}>
                {
                    cards.map(card => (
                        <Pressable
                            key={card.id}
                            style={reflexGameStyles.card}
                            onPress={() =>
                                handleCardPress(card)
                            }
                        >
                            {
                                card.revealed || card.found ?
                                    <Image source={card.image.source} style={reflexGameStyles.image} />
                                    :
                                    <Text style={reflexGameStyles.question}>
                                        ?
                                    </Text>
                            }
                        </Pressable>
                    ))
                }
            </View>
            <Pressable
                style={reflexGameStyles.backButton}
                onPress={() => router.back()}
            >
                <Text style={reflexGameStyles.backButtonText}>
                    Voltar
                </Text>
            </Pressable>
        </View>
    );
}