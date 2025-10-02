import { React, useState, useEffect, View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from '../imports';
import styles from '../styles/styles';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { firestore } from '../firebase';
import { Cliente } from '../model/Cliente';
import { ClienteStackParamList } from './ClienteNavigator';

type ManterClienteScreenNavigationProp = StackNavigationProp<ClienteStackParamList, 'ClienteManter'>;
type ManterClienteScreenRouteProp = RouteProp<ClienteStackParamList, 'ClienteManter'>;

export default function ClienteManter() {
    const navigation = useNavigation<ManterClienteScreenNavigationProp>();
    const route = useRoute<ManterClienteScreenRouteProp>();

    const [cliente, setCliente] = useState<Partial<Cliente>>(
        route.params?.cliente || {}
    );
    const isEditing = !!cliente.id;

    useEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Editar Cliente' : 'Novo Cliente'
        });
    }, [navigation, isEditing]);

    const handleChange = (name: keyof Cliente, value: string) => {
        setCliente(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSalvar = async () => {
        if (!cliente.nome || cliente.nome.trim() === '') {
            Alert.alert("Atenção", "O nome do cliente é obrigatório!");
            return;
        }

        const dataToSave = {
            nome: cliente.nome,
            email: cliente.email || '',
            telefone: cliente.telefone || '',
            status: cliente.status || '',
            tags: cliente.tags || '', // Salva as tags como uma string única, separada por vírgulas
        };

        try {
            if (isEditing) {
                await firestore.collection("clientes").doc(cliente.id).update(dataToSave);
                Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
            } else {
                await firestore.collection("clientes").add(dataToSave);
                Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");
            }
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar o cliente:", error);
            Alert.alert("Erro", "Não foi possível salvar o cliente.");
        }
    };
    
    
    return (
        <ScrollView style={styles.containerManter}>
            <View style={styles.backgroundImageContainer}>
                <Image
                    source={require('../assets/coruja.png')}
                    style={styles.backgroundImage}
                />
            </View>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder='Nome completo do cliente'
                value={cliente.nome}
                onChangeText={(value) => handleChange('nome', value)}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder='email@exemplo.com'
                value={cliente.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
                style={styles.input}
                placeholder='(XX) 9XXXX-XXXX'
                value={cliente.telefone}
                onChangeText={(value) => handleChange('telefone', value)}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Status</Text>
            <TextInput
                style={styles.input}
                placeholder='Ativo, Inativo, Potencial...'
                value={cliente.status}
                onChangeText={(value) => handleChange('status', value)}
            />

            <Text style={styles.label}>Tags</Text>
            <TextInput
                style={styles.input}
                placeholder='Importante,VIP,Novo (separado por vírgulas)'
                value={cliente.tags}
                onChangeText={(value) => handleChange('tags', value)}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleSalvar}>
                <Text style={styles.loginButtonText}>{isEditing ? 'Atualizar' : 'Salvar Cliente'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}