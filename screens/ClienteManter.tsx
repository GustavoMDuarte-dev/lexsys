import { React, useState, useEffect, View, Text, TextInput, TouchableOpacity, Image } from '../imports';
import styles from '../styles/styles';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Cliente } from '../model/Cliente';
import * as ClienteService from '../database/ClienteService';
import { Alert } from 'react-native';
import { ClienteStackParamList } from './ClienteNavigator';

type ClienteManterRouteProp = RouteProp<ClienteStackParamList, 'ClienteManter'>;

export default function ClienteManter() {
    const [formCliente, setFormCliente] = useState<Partial<Cliente>>({});
    const navigation = useNavigation();
    const route = useRoute<ClienteManterRouteProp>();
    const isUpdating = !!route.params?.cliente;

    useEffect(() => {
        if (route.params?.cliente) {
            setFormCliente(route.params.cliente);
        }
    }, [route.params?.cliente]); 
    const salvarCliente = async () => {
        if (!formCliente.nome) {
            Alert.alert("Erro", "O nome do cliente é obrigatório.");
            return;
        }
        const cliente = new Cliente(formCliente);
        try {
            if (isUpdating) {
                await ClienteService.update(cliente);
                Alert.alert("Sucesso", "Cliente atualizado!");
            } else {
                await ClienteService.create(cliente);
                Alert.alert("Sucesso", "Cliente cadastrado!");
            }
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            Alert.alert("Erro", "Não foi possível salvar o cliente.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundImageContainer}>
                <Image
                    source={require('../assets/coruja.png')}
                    style={styles.backgroundImage}
                />
            </View>
            <View style={{ flex: 1, paddingTop: 40 }}>
                <Text style={styles.cardTitle}>{isUpdating ? 'Editar Cliente' : 'Novo Cliente'}</Text>

                <TextInput
                    style={styles.loginInput}
                    placeholder='Nome do Cliente'
                    placeholderTextColor="#888"
                    value={formCliente.nome || ''}
                    onChangeText={valor => setFormCliente({ ...formCliente, nome: valor })}
                />
                <TextInput
                    style={styles.loginInput}
                    placeholder='E-mail'
                    placeholderTextColor="#888"
                    value={formCliente.email || ''}
                    onChangeText={valor => setFormCliente({ ...formCliente, email: valor })}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.loginInput}
                    placeholder='Telefone'
                    placeholderTextColor="#888"
                    value={formCliente.telefone || ''}
                    onChangeText={valor => setFormCliente({ ...formCliente, telefone: valor })}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.loginInput}
                    placeholder='Status (Ex: Ativo, Potencial)'
                    placeholderTextColor="#888"
                    value={formCliente.status || ''}
                    onChangeText={valor => setFormCliente({ ...formCliente, status: valor })}
                />
                 <TextInput
                    style={styles.loginInput}
                    placeholder='Tags (separadas por vírgula)'
                    placeholderTextColor="#888"
                    value={formCliente.tags || ''}
                    onChangeText={valor => setFormCliente({ ...formCliente, tags: valor })}
                />
                <TouchableOpacity style={styles.loginButton} onPress={salvarCliente}>
                    <Text style={styles.loginButtonText}>{isUpdating ? 'Atualizar' : 'Salvar'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}