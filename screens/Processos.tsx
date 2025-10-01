import styles from '../styles/styles';
import { React, Text, View, Image, AntDesign, FontAwesome, TouchableOpacity, useState, TextInput, ScrollView, FlatList, Alert } from '../imports';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// ALTERAÇÃO 1: Importar apenas o 'firestore'
import { firestore } from '../firebase';

import { Processo } from '../model/Processo';
import { ProcessoStackParamList } from './ProcessoNavigator';


type ProcessosScreenNavigationProp = StackNavigationProp<ProcessoStackParamList, 'ProcessoListar'>;

export default function Processos() {
    const navigation = useNavigation<ProcessosScreenNavigationProp>();
    const [processos, setProcessos] = useState<Processo[]>([]);
    const [termoBusca, setTermoBusca] = useState('');
    const [loading, setLoading] = useState(true);

    // ALTERAÇÃO 2: A referência da coleção usa a sintaxe da v8
    const processosCollectionRef = firestore.collection("processos");

    const getStatusColor = (status: string) => {
        if (status?.toLowerCase() === 'ativo') return 'green';
        if (status?.toLowerCase() === 'urgente') return 'red';
        return '#454545';
    };

    const carregarProcessos = async () => {
        setLoading(true);
        try {
            // ALTERAÇÃO 3: A busca de dados usa .get()
            const querySnapshot = await processosCollectionRef.get();
            const dados = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return new Processo({
                    id: doc.id,
                    numero: data.numero,
                    cliente: data.cliente,
                    status: data.status,
                    proximoPrazo: data.proximoPrazo,
                    ultimaMovimentacao: data.ultimaMovimentacao,
                });
            });
            setProcessos(dados);
        } catch (error) {
            console.error("Erro ao carregar processos:", error);
            Alert.alert("Erro", "Não foi possível carregar os processos.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
      React.useCallback(() => {
        carregarProcessos();
      }, [])
    );

    const handleExcluir = (item: Processo) => {
        Alert.alert(
            "Excluir Processo?",
            `Você tem certeza que deseja excluir o processo "${item.numero}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            // ALTERAÇÃO 4: A exclusão usa .doc().delete()
                            await firestore.collection("processos").doc(item.id).delete();
                            Alert.alert("Sucesso", "Processo excluído!");
                            carregarProcessos(); // Recarrega a lista
                        } catch(error) {
                            console.error("Erro ao excluir processo:", error);
                            Alert.alert("Erro", "Não foi possível excluir o processo.");
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    // Nenhuma alteração necessária no JSX abaixo
    const RenderProcessoItem = ({ item }: { item: Processo }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProcessoManter', { processo: item })} onLongPress={() => handleExcluir(item)}>
                {/* ... seu JSX ... */}
            </TouchableOpacity>
        );
    };

    const processosFiltrados = processos.filter(processo =>
        processo.numero?.toLowerCase().includes(termoBusca.toLowerCase()) ||
        processo.cliente?.toLowerCase().includes(termoBusca.toLowerCase()) ||
        processo.ultimaMovimentacao?.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return (
        <View style={styles.processosContainer}>
            {/* ... todo o seu JSX permanece igual ... */}
        </View>
    );
}