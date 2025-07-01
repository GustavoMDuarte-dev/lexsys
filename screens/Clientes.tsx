// screens/Clientes.tsx
import styles from '../styles/styles';
import { React, Text, View, Image, AntDesign, FontAwesome, TouchableOpacity, useState, TextInput, FlatList, Alert } from '../imports';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as ClienteService from '../database/ClienteService'; // Nosso especialista em Clientes
import { Cliente } from '../model/Cliente'; // Nosso "molde" de Cliente
import { StackNavigationProp } from '@react-navigation/stack';
import { ClienteStackParamList } from './ClienteNavigator';

type ClientesScreenNavigationProp = StackNavigationProp<ClienteStackParamList, 'ClienteListar'>;

export default function Clientes() {
  // Estado para guardar a lista de clientes que vem do banco
  const navigation = useNavigation<ClientesScreenNavigationProp>();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados do banco e atualizar nosso estado
  const carregarClientes = async () => {
    setLoading(true); // Mostra o indicador de "carregando"
    try {
      const dados = await ClienteService.findAll();
      setClientes(dados);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      Alert.alert("Erro", "Não foi possível carregar os clientes.");
    } finally {
      setLoading(false); // Esconde o indicador de "carregando"
    }
  };

  // Este hook garante que a função carregarClientes seja chamada toda vez que a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      carregarClientes();
    }, [])
  );

  // Função para lidar com a exclusão de um cliente
  const handleExcluir = (item: Cliente) => {
    Alert.alert(
        "Excluir Cliente?",
        `Você tem certeza que deseja excluir "${item.nome}"?`,
        [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                onPress: async () => {
                    await ClienteService.deleteById(item.id);
                    Alert.alert("Sucesso", "Cliente excluído!");
                    carregarClientes(); // Recarrega a lista para mostrar a mudança
                },
                style: "destructive"
            }
        ]
    );
  };

  // Componente que renderiza cada card de cliente na lista
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
          // Dentro da função renderCardCliente
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

  // Filtra a lista de clientes com base no termo de busca
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome?.toLowerCase().includes(termoBusca.toLowerCase())
  );

   return (
        
        <View style={styles.Clientescontainer}>
          <Image source={require('../assets/coruja.png')} style={styles.backgroundImage as any} />
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
    <TouchableOpacity onPress={() => (navigation as any).navigate('ClienteManter')} style={styles.botaoComTexto}>
        <AntDesign name="pluscircle" size={19} color="#44161F"/>
        <Text>Adicionar</Text>
    </TouchableOpacity>
    {/* Seus outros botões podem vir aqui */}
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
      );
    }