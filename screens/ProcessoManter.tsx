// screens/ProcessoManter.tsx
import { React, useState, useEffect, View, Text, TextInput, TouchableOpacity, Image } from '../imports';
import styles from '../styles/styles';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'; // Importe o RouteProp
import { Processo } from '../model/Processo';
import * as ProcessoService from '../database/ProcessoService';
import { Alert } from 'react-native';
import { ProcessoStackParamList } from './ProcessoNavigator'; // Importe o nosso "mapa"

// Criamos um tipo específico para os parâmetros da rota desta tela
type ProcessoManterRouteProp = RouteProp<ProcessoStackParamList, 'ProcessoManter'>;

export default function ProcessoManter() {
    const [formProcesso, setFormProcesso] = useState<Partial<Processo>>({});
    const navigation = useNavigation();
    const route = useRoute<ProcessoManterRouteProp>(); // Informamos ao useRoute sobre o nosso tipo
    const isUpdating = route.params?.processo ? true : false;

    useEffect(() => {
        // Agora o TypeScript sabe que route.params.processo existe e é do tipo Processo
        if (isUpdating && route.params?.processo) {
            const processoParaEditar = route.params.processo;
            setFormProcesso(processoParaEditar);
        }
    }, [route.params?.processo]);

    const salvarProcesso = async () => {
        if (!formProcesso.numero) {
            Alert.alert("Erro", "O número do processo é obrigatório.");
            return;
        }

        const processo = new Processo(formProcesso);

        try {
            if (isUpdating) {
                await ProcessoService.update(processo);
                Alert.alert("Sucesso", "Processo atualizado!");
            } else {
                await ProcessoService.create(processo);
                Alert.alert("Sucesso", "Processo cadastrado!");
            }
            navigation.goBack(); // Volta para a tela de listagem
        } catch (error) {
            console.error("Erro ao salvar processo:", error);
            Alert.alert("Erro", "Não foi possível salvar o processo.");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/coruja.png')} style={styles.backgroundImage as any} />
            <Text style={styles.cardTitle}>{isUpdating ? 'Editar Processo' : 'Novo Processo'}</Text>

            <TextInput
                style={styles.loginInput} // Reutilizando estilo
                placeholder='Número do Processo'
                placeholderTextColor="#888"
                value={formProcesso.numero || ''}
                onChangeText={valor => setFormProcesso({ ...formProcesso, numero: valor })}
            />
            <TextInput
                style={styles.loginInput}
                placeholder='Nome do Cliente'
                placeholderTextColor="#888"
                value={formProcesso.cliente || ''}
                onChangeText={valor => setFormProcesso({ ...formProcesso, cliente: valor })}
            />
            <TextInput
                style={styles.loginInput}
                placeholder='Status (Ex: Ativo, Urgente)'
                placeholderTextColor="#888"
                value={formProcesso.status || ''}
                onChangeText={valor => setFormProcesso({ ...formProcesso, status: valor })}
            />
            <TextInput
                style={styles.loginInput}
                placeholder='Próximo Prazo (Ex: 25/12/2025)'
                placeholderTextColor="#888"
                value={formProcesso.proximoPrazo || ''}
                onChangeText={valor => setFormProcesso({ ...formProcesso, proximoPrazo: valor })}
            />
            <TextInput
                style={styles.loginInput}
                placeholder='Última Movimentação'
                placeholderTextColor="#888"
                value={formProcesso.ultimaMovimentacao || ''}
                onChangeText={valor => setFormProcesso({ ...formProcesso, ultimaMovimentacao: valor })}
            />

            <TouchableOpacity style={styles.loginButton} onPress={salvarProcesso}>
                <Text style={styles.loginButtonText}>{isUpdating ? 'Atualizar' : 'Salvar'}</Text>
            </TouchableOpacity>
        </View>
    );
}