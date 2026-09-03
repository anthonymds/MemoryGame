import { useCallback, useEffect, useState } from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';
import { gameColorStyles } from '@/styles/gameColorStyles';
import { colors, ColorOption } from '@/data/colorsOptions';
type ColorGameProps = {
    config?: any;
};


function shuffleArray<T>(array: T[]) {
    return [...array]
        .sort(() => Math.random() - 0.5);
}

function randomItem<T>(array: T[]): T {
    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];
}
function generateOptions(correctColor: ColorOption) {

    const wrongColors =
        colors.filter(
            color =>
                color.name !== correctColor.name
        );

    const shuffledWrong =
        shuffleArray(wrongColors)
            .slice(0, 3);

    return shuffleArray([
        correctColor,
        ...shuffledWrong,
    ]);

}
export default function ColorGame({ config, }: ColorGameProps) {
    const [options, setOptions] = useState<ColorOption[]>([]);
    const [word, setWord] = useState<ColorOption | null>(null);
    const [displayColor, setDisplayColor] = useState<ColorOption | null>(null);
    const [score, setScore] = useState(0);

    const createRound = useCallback(() => {
        const selectedWord = randomItem(colors);
        let selectedColor = randomItem(colors);

        while (
            selectedColor.name === selectedWord.name
        ) {
            selectedColor =
                randomItem(colors);
        }

        setWord(selectedWord);
        setDisplayColor(selectedColor);
        setOptions(generateOptions(selectedColor));
    }, []);

    useEffect(() => { createRound(); }, [createRound]);

    function handleAnswer(answer: ColorOption) {

        if (
            answer.name === displayColor?.name
        ) {
            setScore(
                previous => previous + 1
            );
        }

        createRound();
    }

    if (
        !word ||
        !displayColor
    ) {
        return null;
    }

    return (
        <View style={gameColorStyles.container}>
            <Text style={gameColorStyles.title}>
                Teste de Cores
            </Text>

            <Text style={gameColorStyles.score}>
                Pontos: {score}
            </Text>

            <Text
                style={[
                    gameColorStyles.word,
                    {
                        color:
                            displayColor.hex
                    }
                ]}
            >
                {word.name}
            </Text>

            <Text style={gameColorStyles.question}>
                Qual é a cor da palavra?
            </Text>

            <View style={gameColorStyles.options}>
                {
                    options.map(color => (

                        <Pressable
                            key={color.name}
                            style={[
                                gameColorStyles.button,
                                {
                                    backgroundColor:
                                        color.hex
                                }
                            ]}
                            onPress={() => handleAnswer(color)}
                        >
                            <Text
                                style={[
                                    gameColorStyles.buttonText,

                                    color.name === 'Branco' &&
                                    gameColorStyles.darkText
                                ]}
                            >
                                {color.name}
                            </Text>
                        </Pressable>
                    ))
                }
            </View>
        </View>
    );
}