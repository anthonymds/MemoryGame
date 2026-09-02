import { useEffect, useMemo, useState } from 'react';
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { dailyPlacesImages, GameImage } from '@/data/gameImages';
import { reflexGameStyles } from '@/styles/reflexGameStyles'

type ReflexGameProps = {
    config: {
        imageCount?: number;
        imageDuration?: number;
    };
};

function shuffleArray<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function ReflexGame({
    config,
}: ReflexGameProps) {

    const router = useRouter();
    const [round, setRound] = useState(1);
    const [options, setOptions] = useState<GameImage[]>([]);

    const [correctImage, setCorrectImage] =
        useState<GameImage | null>(null);

    function createRound() {

        const shuffled =
            shuffleArray(dailyPlacesImages);

        const selected =
            shuffled.slice(0, 4);

        const answer =
            selected[
            Math.floor(
                Math.random() * selected.length
            )
            ];

        setOptions(selected);
        setCorrectImage(answer);
    }

    useEffect(() => {
        createRound();
    }, []);

    function handleAnswer(image: GameImage) {
        if (!correctImage) {
            return;
        }

        setRound(
            previous => previous + 1
        );

        createRound();
    }



    if (!correctImage) {
        return null;
    }

    return (
        <View style={reflexGameStyles.container}>
            <Text style={reflexGameStyles.title}>
                Reflexo
            </Text>

            <Text style={reflexGameStyles.question}>
                Encontre:
            </Text>

            <Text style={reflexGameStyles.answer}>
                {correctImage.name}
            </Text>

            <View style={reflexGameStyles.grid}>
                {options.map((image) => (

                    <Pressable
                        key={image.id}
                        onPress={() =>
                            handleAnswer(image)
                        }
                        style={reflexGameStyles.card}
                    >

                        <Image
                            source={image.source}
                            style={reflexGameStyles.image}
                        />

                    </Pressable>
                ))}
            </View>

            <Text style={reflexGameStyles.round}>
                Rodada {round}
            </Text>

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