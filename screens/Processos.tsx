import styles from '../styles/styles';
import { React, Text, View, Image, AntDesign, FontAwesome, TouchableOpacity, useState, TextInput, ScrollView, FlatList, Alert } from '../imports';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProcessoStackParamList } from './ProcessoNavigator';
import * as ProcessoService from '../database/ProcessoService';
import { Processo } from '../model/Processo';

type ProcessosScreenNavigationProp = StackNavigationProp<ProcessoStackParamList, 'ProcessoListar'>;

export default function Processos() {
    const navigation = useNavigation<ProcessosScreenNavigationProp>();
    const [processos, setProcessos] = useState<Processo[]>([]);
    const [termoBusca, setTermoBusca] = useState('');
    const [loading, setLoading] = useState(true);

    const getStatusColor = (status: string) => {
      if (status?.toLowerCase() === 'ativo') return 'green';
      if (status?.toLowerCase() === 'urgente') return 'red';
      return '#454545';
    };

    const carregarProcessos = async () => {
      setLoading(true);
      try {
        const dados = await ProcessoService.findAll();
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
                      await ProcessoService.deleteById(item.id);
                      Alert.alert("Sucesso", "Processo excluído!");
                      carregarProcessos();
                  },
                  style: "destructive"
              }
          ]
      );
    };

    const RenderProcessoItem = ({ item }: { item: Processo }) => {
      return (
        <TouchableOpacity onPress={() => (navigation as any).navigate('ProcessoManter', { processo: item })} onLongPress={() => handleExcluir(item)}>
          <View style={styles.linhaProcessoContainer}>
              <Text style={[styles.celulaProcessoDado, { width: 180 }]}>{item.numero}</Text>
              <Text style={[styles.celulaProcessoDado, { width: 220 }]}>{item.cliente}</Text>
              <Text style={[styles.celulaProcessoDado, { width: 110, color: getStatusColor(item.status) }]}>
                {item.status}
              </Text>
              <Text style={[styles.celulaProcessoDado, { width: 130 }]}>{item.proximoPrazo || '---'}</Text>
              <Text style={[styles.celulaProcessoDado, { width: 200, paddingRight: 15 }]}>{item.ultimaMovimentacao}</Text>
          </View>
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
        <View style={styles.backgroundImageContainer}>
            <Image
                source={require('../assets/coruja.png')}
                style={styles.backgroundImage}
            />
        </View>

        <View style={{ flex: 1 }}>
            <View style={styles.acoesContainer}>
                <View style={styles.buscar}>
                <AntDesign name="search1" size={20} color="#888" style={{ marginRight: 8 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Buscar Processo (Nº, Cliente, Mov.)'
                    placeholderTextColor={"#888"}
                    value={termoBusca}
                    onChangeText={setTermoBusca}
                />
                </View>
            </View>

            <View style={styles.botoesAcaoLinha}>
                <TouchableOpacity onPress={() => alert('Importar Processo')} style={styles.botaoComTexto}>
                    <AntDesign name="cloudupload" size={20} color="#44161F"/>
                    <Text>Importar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => (navigation as any).navigate('ProcessoManter')} style={styles.botaoComTexto}>
                    <AntDesign name="pluscircle" size={19} color="#44161F"/>
                    <Text>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Filtrar')} style={styles.botaoComTexto}>
                    <FontAwesome name="filter" size={20} color="#44161F"/>
                    <Text>Filtrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.headerColunasContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text style={[styles.textoHeaderColuna, { width: 180 }]}>Nº Processo</Text>
                <Text style={[styles.textoHeaderColuna, { width: 220 }]}>Cliente</Text>
                <Text style={[styles.textoHeaderColuna, { width: 110 }]}>Status</Text>
                <Text style={[styles.textoHeaderColuna, { width: 130 }]}>Próx. Prazo</Text>
                <Text style={[styles.textoHeaderColuna, { width: 200, paddingRight: 15 }]}>Últ. Mov.</Text>
                </ScrollView>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dadosBlocoScrollViewHorizontal}>
                <View>
                <FlatList
                    data={processosFiltrados}
                    renderItem={RenderProcessoItem}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={<Text style={{textAlign: 'center', padding: 20, fontSize: 16, color: '#666'}}>Nenhum processo cadastrado.</Text>}
                    refreshing={loading}
                    onRefresh={carregarProcessos}
                />
                </View>
            </ScrollView>
        </View>
      </View>
    );
}