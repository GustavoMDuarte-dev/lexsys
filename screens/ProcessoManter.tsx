import { React, useState, useEffect, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from '../imports';
import styles from '../styles/styles';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Processo } from '../model/Processo';
import { ProcessoStackParamList } from './ProcessoNavigator';
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
            // O header da stack já está desabilitado, mas caso habilite, o título estará correto.
            title: isUpdating ? 'Editar Processo' : 'Novo Processo'
        });
    }, [navigation, isUpdating]);

    // Função para atualizar o estado do formulário
    const handleChange = (name: keyof Processo, value: string) => {
        setFormProcesso(prevState => ({ ...prevState, [name]: value }));
    };

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
                await firestore.collection("processos").doc(formProcesso.id).update(dataToSave);
                Alert.alert("Sucesso", "Processo atualizado!");
            } else {
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

            {/* Labels e Inputs para todos os campos do processo */}
            <Text style={styles.label}>Número do Processo</Text>
            <TextInput
                style={styles.input}
                placeholder='0000000-00.0000.0.00.0000'
                value={formProcesso.numero}
                onChangeText={(value) => handleChange('numero', value)}
            />

            <Text style={styles.label}>Cliente</Text>
            <TextInput
                style={styles.input}
                placeholder='Nome do cliente'
                value={formProcesso.cliente}
                onChangeText={(value) => handleChange('cliente', value)}
            />

            <Text style={styles.label}>Status</Text>
            <TextInput
                style={styles.input}
                placeholder='Ativo, Urgente, Arquivado...'
                value={formProcesso.status}
                onChangeText={(value) => handleChange('status', value)}
            />

            <Text style={styles.label}>Próximo Prazo</Text>
            <TextInput
                style={styles.input}
                placeholder='DD/MM/AAAA'
                value={formProcesso.proximoPrazo}
                onChangeText={(value) => handleChange('proximoPrazo', value)}
            />

            <Text style={styles.label}>Última Movimentação</Text>
            <TextInput
                style={styles.input}
                placeholder='Descreva a última atualização'
                value={formProcesso.ultimaMovimentacao}
                onChangeText={(value) => handleChange('ultimaMovimentacao', value)}
            />

            <TouchableOpacity style={styles.loginButton} onPress={salvarProcesso}>
                <Text style={styles.loginButtonText}>{isUpdating ? 'Atualizar' : 'Salvar'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}