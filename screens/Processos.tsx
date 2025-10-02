import styles from '../styles/styles';
import { React, Text, View, Image, AntDesign, FontAwesome, TouchableOpacity, useState, TextInput, ActivityIndicator, FlatList, Alert } from '../imports';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { firestore } from '../firebase';
import { Processo } from '../model/Processo';
import { ProcessoStackParamList } from './ProcessoNavigator';

type ProcessosScreenNavigationProp = StackNavigationProp<ProcessoStackParamList, 'ProcessoListar'>;

export default function Processos() {
    const navigation = useNavigation<ProcessosScreenNavigationProp>();
    const [processos, setProcessos] = useState<Processo[]>([]);
    const [termoBusca, setTermoBusca] = useState('');
    const [loading, setLoading] = useState(true);

    const processosCollectionRef = firestore.collection("processos");

    const getStatusColor = (status: string) => {
        if (status?.toLowerCase() === 'ativo') return 'green';
        if (status?.toLowerCase() === 'urgente') return 'red';
        return '#454545';
    };

    const carregarProcessos = async () => {
        if (!loading) setLoading(true); // Garante que o loading apareça ao re-focar na tela
        try {
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
                            await firestore.collection("processos").doc(item.id).delete();
                            Alert.alert("Sucesso", "Processo excluído!");
                            carregarProcessos();
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

    const RenderProcessoItem = ({ item }: { item: Processo }) => {
        return (
            <TouchableOpacity 
                style={styles.cardCliente}
                onPress={() => navigation.navigate('ProcessoManter', { processo: item })} 
                onLongPress={() => handleExcluir(item)}
            >
                <Text style={styles.cardNomeCliente}>Processo: {item.numero}</Text>
                <Text style={styles.cardInfoText}>Cliente: {item.cliente}</Text>
                <Text style={styles.cardInfoText}>Última Movimentação: {item.ultimaMovimentacao}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <Text style={[styles.cardInfoText, { marginRight: 8 }]}>Status:</Text>
                    <View style={{
                        width: 12, height: 12, borderRadius: 6,
                        backgroundColor: getStatusColor(item.status),
                        marginRight: 4,
                    }} />
                    <Text style={[styles.cardInfoText, { color: getStatusColor(item.status), fontWeight: 'bold' }]}>
                        {item.status || 'Não definido'}
                    </Text>
                </View>
                <Text style={styles.cardInfoText}>Próximo Prazo: {item.proximoPrazo}</Text>
            </TouchableOpacity>
        );
    };

    const processosFiltrados = processos.filter(processo =>
        processo.numero?.toLowerCase().includes(termoBusca.toLowerCase()) ||
        processo.cliente?.toLowerCase().includes(termoBusca.toLowerCase())
    );

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9' }}>
            <ActivityIndicator size="large" color="#44161F" />
            <Text style={{marginTop: 10, color: '#44161F'}}>Carregando processos...</Text>
          </View>
        );
    }
    
    return (
        <View style={styles.processosContainer}>
            <View style={styles.backgroundImageContainer}>
                <Image source={require('../assets/coruja.png')} style={styles.backgroundImage} />
            </View>

            <View style={styles.acoesContainer}>
                <View style={styles.buscar}>
                    <AntDesign name="search1" size={20} color="#888" style={{ marginRight: 8 }} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Buscar por número ou cliente...'
                        placeholderTextColor={"#888"}
                        value={termoBusca}
                        onChangeText={setTermoBusca}
                    />
                </View> 
            </View>

            {/* ===== BLOCO DE CÓDIGO ADICIONADO ===== */}
            <View style = {styles.botoesAcaoLinha}>
                <TouchableOpacity onPress={() => alert('Importar Processo')} style={styles.botaoComTexto}>
                    <AntDesign name="cloudupload" size={20} color="#44161F"/>
                    <Text> Importar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProcessoManter', {})} style={styles.botaoComTexto}>
                    <AntDesign name="pluscircle" size={19} color="#44161F"/>
                    <Text> Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Filtrar Processos')} style={styles.botaoComTexto}>
                    <FontAwesome name = "filter" size={20} color="#44161F"/>
                    <Text> Filtrar</Text>
                </TouchableOpacity>
            </View>
            {/* ======================================= */}

            <FlatList
                data={processosFiltrados}
                renderItem={RenderProcessoItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                    <View style={{alignItems: 'center', marginTop: 50}}>
                        <Text style={{fontSize: 16, color: '#555'}}>Nenhum processo encontrado.</Text>
                    </View>
                }
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 80 }}
            />
        </View>
    );
}