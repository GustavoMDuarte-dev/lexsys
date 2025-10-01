import { React, useState, useEffect, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from '../imports';
import styles from '../styles/styles';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Processo } from '../model/Processo';
import { ProcessoStackParamList } from './ProcessoNavigator';

// 1. Importar o 'firestore' e remover as outras importações do SDK
import { firestore } from '../firebase';

type ProcessoManterRouteProp = RouteProp<ProcessoStackParamList, 'ProcessoManter'>;

export default function ProcessoManter() {
    const navigation = useNavigation();
    const route = useRoute<ProcessoManterRouteProp>();
    
    const [formProcesso, setFormProcesso] = useState<Partial<Processo>>(
        route.params?.processo || {}
    );
    const isUpdating = !!formProcesso.id;

    useEffect(() => {
        navigation.setOptions({
            title: isUpdating ? 'Editar Processo' : 'Novo Processo'
        });
    }, [navigation, isUpdating]);

    const salvarProcesso = async () => {
        if (!formProcesso.numero || formProcesso.numero.trim() === '') {
            Alert.alert("Erro", "O número do processo é obrigatório.");
            return;
        }

        const dataToSave = {
            numero: formProcesso.numero,
            cliente: formProcesso.cliente || '',
            status: formProcesso.status || '',
            proximoPrazo: formProcesso.proximoPrazo || '',
            ultimaMovimentacao: formProcesso.ultimaMovimentacao || '',
        };

        try {
            if (isUpdating) {
                // ALTERAÇÃO 2: Sintaxe da v8 para ATUALIZAR
                await firestore.collection("processos").doc(formProcesso.id).update(dataToSave);
                Alert.alert("Sucesso", "Processo atualizado!");
            } else {
                // ALTERAÇÃO 3: Sintaxe da v8 para ADICIONAR
                await firestore.collection("processos").add(dataToSave);
                Alert.alert("Sucesso", "Processo cadastrado!");
            }
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar processo:", error);
            Alert.alert("Erro", "Não foi possível salvar o processo.");
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

            <View style={{ padding: 20 }}>
                {/* O seu JSX permanece exatamente igual */}
                <Text style={styles.cardTitle}>{isUpdating ? 'Editar Processo' : 'Novo Processo'}</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Número do Processo'
                    // ... resto das props
                />
                {/* ... resto dos TextInputs ... */}

                <TouchableOpacity style={styles.loginButton} onPress={salvarProcesso}>
                    <Text style={styles.loginButtonText}>{isUpdating ? 'Atualizar' : 'Salvar'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}