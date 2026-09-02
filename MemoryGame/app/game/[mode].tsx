import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import ReflexGame from '@/games/reflex/reflexGame';
import MemoryLocationGame from '@/games/memory/memoryLocationGame';
const games = {

    reflex: ReflexGame,

    memoryLocation: MemoryLocationGame,

    // memoryPairs: MemoryPairsGame,

    // colors: ColorGame,

};

export default function GameScreen() {

    const params = useLocalSearchParams();
    const mode = String(params.mode);

    const GameComponent =
        games[mode as keyof typeof games];

    if (!GameComponent) {
        return (
            <View>
                <Text>
                    Modo inexistente
                </Text>
            </View>
        );
    }

    return (
        <GameComponent
            config={{
                imageCount: Number(params.imageCount ?? 6),
                imageDuration: Number(params.imageDuration ?? 5),
            }}
        />
    );
}