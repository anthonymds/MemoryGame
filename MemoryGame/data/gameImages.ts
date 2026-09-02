import { ImageSourcePropType } from 'react-native';

export type GameImage = {
    id: string;
    name: string;
    source: ImageSourcePropType;
};

export const objectImages: GameImage[] = [
    {
        id: 'barco',
        name: 'Barco',
        source: require('@/assets/gamesImages/objects/boatImage.png'),
    },
    {
        id: 'relogio',
        name: 'Relógio',
        source: require('@/assets/gamesImages/objects/clockImage.png'),
    },
    {
        id: 'casa',
        name: 'Casa',
        source: require('@/assets/gamesImages/objects/houseImage.png'),
    },
    {
        id: 'pc',
        name: 'Pc',
        source: require('@/assets/gamesImages/objects/pcImage.png'),
    },
    {
        id: 'violao',
        name: 'Violão',
        source: require('@/assets/gamesImages/objects/guitarImage.png'),
    }, {
        id: 'caneca',
        name: 'Caneca',
        source: require('@/assets/gamesImages/objects/mugImage.png'),
    }, {
        id: 'navio',
        name: 'Navio',
        source: require('@/assets/gamesImages/objects/shipImage.png'),
    }, {
        id: 'pelucia',
        name: 'Pelúcia',
        source: require('@/assets/gamesImages/objects/teddyBearImage.png'),
    },
];

export const dailyPlacesImages: GameImage[] = [
    {
        id: 'amusementPark',
        name: 'Parque de Diversões',
        source: require('../assets/gamesImages/dailyPlaces/amusementPark.jpeg'),
    },
    {
        id: 'bakery',
        name: 'Padaria',
        source: require('../assets/gamesImages/dailyPlaces/bakery.png'),
    },
    {
        id: 'bank',
        name: 'Banco',
        source: require('../assets/gamesImages/dailyPlaces/bank.jpg'),
    },
    {
        id: 'beautySaloon',
        name: 'Salão de Beleza',
        source: require('../assets/gamesImages/dailyPlaces/beautySaloon.jpg'),
    },
    {
        id: 'busStation',
        name: 'Rodoviária',
        source: require('../assets/gamesImages/dailyPlaces/busStation.jpeg'),
    },
    {
        id: 'church',
        name: 'Igreja',
        source: require('../assets/gamesImages/dailyPlaces/church.jpg'),
    },
    {
        id: 'cinema',
        name: 'Cinema',
        source: require('../assets/gamesImages/dailyPlaces/cinema.jpg'),
    },
    {
        id: 'circus',
        name: 'Circo',
        source: require('../assets/gamesImages/dailyPlaces/circus.jpg'),
    },
    {
        id: 'fair',
        name: 'Feira',
        source: require('../assets/gamesImages/dailyPlaces/feira.jpg'),
    },
    {
        id: 'gasStation',
        name: 'Posto de Gasolina',
        source: require('../assets/gamesImages/dailyPlaces/gasStation.jpg'),
    },
    {
        id: 'park',
        name: 'Parque',
        source: require('../assets/gamesImages/dailyPlaces/park.jpg'),
    },
    {
        id: 'parking',
        name: 'Estacionamento',
        source: require('../assets/gamesImages/dailyPlaces/parking.jpg'),
    },
    {
        id: 'pharmacy',
        name: 'Farmácia',
        source: require('../assets/gamesImages/dailyPlaces/pharmacy.jpg'),
    },
    {
        id: 'restaurant',
        name: 'Restaurante',
        source: require('../assets/gamesImages/dailyPlaces/restaurant.png'),
    },
    {
        id: 'shopping',
        name: 'Shopping',
        source: require('../assets/gamesImages/dailyPlaces/shopping.jpeg'),
    },
    {
        id: 'stadium',
        name: 'Estádio',
        source: require('../assets/gamesImages/dailyPlaces/stadium.jpg'),
    },
];