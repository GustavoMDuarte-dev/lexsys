import styles from '../styles/styles';
import { React, Text, View, Image, AntDesign, FontAwesome, TouchableOpacity, useState, TextInput, FlatList, Alert } from '../imports';
import { useFocusEffect } from '@react-navigation/native';
import * as ClienteService from '../database/ClienteService';
import { Cliente } from '../model/Cliente';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClienteStackParamList } from './ClienteNavigator';

type Props = {
  navigation: StackNavigationProp<ClienteStackParamList, 'ClienteListar'>;
};

export default function Clientes({ navigation }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [loading, setLoading] = useState(true);

  const carregarClientes = async () => {
    setLoading(true);
    try {
      const dados = await ClienteService.findAll();
      setClientes(dados);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarClientes();
    }, [])
  );

  const handleExcluir = (item: Cliente) => {
    Alert.alert("Excluir Cliente?", `Deseja excluir "${item.nome}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          await ClienteService.deleteById(item.id);
          carregarClientes();
        },
        style: "destructive"
      }
    ]);
  };

  const renderCardCliente = ({ item }: { item: Cliente }) => {
    const tagsArray = item.tags ? item.tags.split(',') : [];
    return (
      <View style={styles.cardCliente}>
        <Text style={styles.cardNomeCliente}>{item.nome} (ID: {item.id})</Text>
        <Text style={styles.cardInfoText}>Email: {item.email}</Text>
        <Text style={styles.cardInfoText}>Telefone: {item.telefone}</Text>
        <Text style={styles.cardInfoText}>Status: {item.status}</Text>
        <View style={styles.cardTagContainer}>
          {tagsArray.length > 0 && <Text style={styles.tagText}>Tags: {tagsArray.join(', ')}</Text>}
        </View>
        <View style={styles.cardAcoesContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ClienteManter', { cliente: item })} style={styles.cardBotaoAcao}>
            <AntDesign name="edit" size={20} color="#44161F" />
            <Text style={styles.cardTextoBotaoAcao}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleExcluir(item)} style={styles.cardBotaoAcao}>
            <AntDesign name="delete" size={20} color="#44161F" />
            <Text style={styles.cardTextoBotaoAcao}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const clientesFiltrados = clientes.filter(c => c.nome?.toLowerCase().includes(termoBusca.toLowerCase()));

  return (
    <View style={styles.Clientescontainer}>
      <View style={styles.backgroundImageContainer}>
        <Image source={require('../assets/coruja.png')} style={styles.backgroundImage} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.acoesContainer}>
          <View style={styles.buscar}>
            <AntDesign name="search1" size={20} color="#888" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder='Buscar Cliente'
              placeholderTextColor={"#888"}
              value={termoBusca}
              onChangeText={setTermoBusca}
            />
          </View>
        </View>
        <View style={styles.botoesAcaoLinha}>
          <TouchableOpacity onPress={() => alert('Importar Cliente')} style={styles.botaoComTexto}>
            <AntDesign name="cloudupload" size={20} color="#44161F" />
            <Text>Importar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ClienteManter')} style={styles.botaoComTexto}>
            <AntDesign name="pluscircle" size={19} color="#44161F" />
            <Text>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Filtrar')} style={styles.botaoComTexto}>
            <FontAwesome name="filter" size={20} color="#44161F" />
            <Text>Filtrar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={clientesFiltrados}
          renderItem={renderCardCliente}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum cliente cadastrado.</Text>}
          refreshing={loading}
          onRefresh={carregarClientes}
        />
      </View>
    </View>
  );
}