import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// ALTERAÇÃO 1: Importar apenas o 'firestore'
import { firestore } from '../firebase';

import { Cliente } from '../model/Cliente';
import styles from '../styles/styles';
import { ClienteStackParamList } from './ClienteNavigator';

// Tipagem (sem alterações)
type ManterClienteScreenNavigationProp = StackNavigationProp<ClienteStackParamList, 'ClienteManter'>;
type ManterClienteScreenRouteProp = RouteProp<ClienteStackParamList, 'ClienteManter'>;

export default function ClienteManter() {
    const navigation = useNavigation<ManterClienteScreenNavigationProp>();
    const route = useRoute<ManterClienteScreenRouteProp>();

    const [cliente, setCliente] = useState<Partial<Cliente>>(
        route.params?.cliente || {}
    );
    const isEditing = !!cliente.id;

    // REMOVIDO: A linha 'const clientesCollectionRef = collection(db, "clientes");' foi removida
    // pois a referência será feita diretamente na função de salvar.

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
            tags: cliente.tags || '',
        };

        try {
            if (isEditing) {
                // ALTERAÇÃO 2: Sintaxe da v8 para ATUALIZAR
                await firestore.collection("clientes").doc(cliente.id).update(dataToSave);
                Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
            } else {
                // ALTERAÇÃO 3: Sintaxe da v8 para ADICIONAR
                await firestore.collection("clientes").add(dataToSave);
                Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");
            }
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar o cliente:", error);
            Alert.alert("Erro", "Não foi possível salvar o cliente.");
        }
    };
    
    useEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Editar Cliente' : 'Novo Cliente'
        });
    }, [navigation, isEditing]);

    // O JSX permanece o mesmo
    return (
        <ScrollView style={styles.containerManter}>
           {/* ... Seu JSX ... */}
        </ScrollView>
    );
}