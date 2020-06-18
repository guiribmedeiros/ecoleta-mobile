import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';

interface Params {
    point_id: number;
};

interface Data {
    point: {
        image: string;
        name: string;
        email: string;
        whatsapp: string;
        city: string;
        uf: string;
    };
    items: {
        title: string;
    }[];
};

const Detail = () => {
    const [data, setData] = useState<Data>({} as Data);

    const navigation = useNavigation();
    const params = useRoute().params as Params;

    useEffect(() => {
        api.get(`points/${params.point_id}`).then(response => {
            setData(response.data);
        });
    }, []);

    function handleNavigateBack() {
        navigation.goBack();
    };

    function handleWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Olá, tenho interesse na coleta de resíduos.`);
    };

    function handleComposeMail() {
        MailComposer.composeAsync({
            subject: 'Interesse na coleta de resíduos.',
            recipients: [data.point.email],
        });
    };

    if (!data.point) {
        return null;
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Feather name="arrow-left" style={styles.backIcon} />
                </TouchableOpacity>
                <Image style={styles.pointImage} source={{ uri: data.point.image }} />
                <Text style={styles.pointName}>{data.point.name}</Text>
                <Text style={styles.pointItems}>{data.items.map(item => item.title).join(', ')}</Text>
                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsApp}>
                    <FontAwesome name="whatsapp" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>WhatsApp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Feather name="mail" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Email</Text>
                </RectButton>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    backIcon: {
        fontSize: 20,
        color: "#34CB79",
    },

    pointImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 32,
    },

    pointName: {
        color: '#322153',
        fontSize: 28,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    pointItems: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80',
    },

    address: {
        marginTop: 32,
    },

    addressTitle: {
        color: '#322153',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },

    addressContent: {
        fontFamily: 'Roboto_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80',
    },

    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#999',
        paddingVertical: 20,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    button: {
        width: '48%',
        backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonIcon: {
        color: '#FFF',
        fontSize: 20,
    },

    buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },
});

export default Detail;
