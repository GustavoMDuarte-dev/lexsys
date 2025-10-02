import styles from '../styles/styles';
import { 
  React, 
  Text, 
  View, 
  Image, 
  AntDesign, 
  FontAwesome, 
  MaterialIcons,
  TouchableOpacity, 
  useState, 
  TextInput, 
  FlatList, 
  Alert,
  ActivityIndicator
} from '../imports';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { firestore } from '../firebase';
import { Cliente } from '../model/Cliente';
import { ClienteStackParamList } from './ClienteNavigator';

type Props = {
  navigation: StackNavigationProp<ClienteStackParamList, 'ClienteListar'>;
};

export default function Clientes({ navigation }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [loading, setLoading] = useState(true);

  const clientesCollectionRef = firestore.collection("clientes");

  const carregarClientes = async () => {
    if (!loading) setLoading(true);
    try {
      const querySnapshot = await clientesCollectionRef.get();
      const dados = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return new Cliente({
          id: doc.id,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          status: data.status,
          tags: data.tags,
        });
      });
      setClientes(dados);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      Alert.alert("Erro", "Não foi possível carregar os clientes.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarClientes();
    }, [])
  );

  // *** 1. FUNÇÃO DE EXCLUSÃO ADICIONADA AQUI ***
  const handleExcluir = (item: Cliente) => {
    Alert.alert(
      "Excluir Cliente?", // Título do Alerta
      `Você tem certeza que deseja excluir "${item.nome}"? Esta ação não pode ser desfeita.`, // Mensagem
      [
        { text: "Cancelar", style: "cancel" }, // Botão de cancelar
        {
          text: "Excluir",
          onPress: async () => {
            try {
              // Lógica para deletar do Firebase
              await firestore.collection("clientes").doc(item.id).delete();
              Alert.alert("Sucesso", "Cliente excluído!");
              carregarClientes(); // Recarrega a lista para refletir a exclusão
            } catch(error) {
              console.error("Erro ao excluir cliente:", error);
              Alert.alert("Erro", "Não foi possível excluir o cliente.");
            }
          },
          style: "destructive" // Deixa o texto do botão vermelho (iOS)
        }
      ]
    );
  };

  const handleMaisOpcoes = (item: Cliente) => {
    alert(`Mais opções para: ${item.nome}\n- Enviar Notificação\n- Criar Procuração`);
  };

  const renderCardCliente = ({ item }: { item: Cliente }) => {
    const tagsArray = typeof item.tags === 'string' && item.tags.length > 0 ? item.tags.split(',') : [];

    return (
      // *** 2. ONLONGPRESS ADICIONADO AO TOUCABLEOPACITY QUE ENVOLVE O CARD ***
      <TouchableOpacity onLongPress={() => handleExcluir(item)}>
        <View style={styles.cardCliente}>
          <Text style={styles.cardNomeCliente}>{item.nome}</Text>
          <Text style={styles.cardInfoText}>Email: {item.email}</Text>
          <Text style={styles.cardInfoText}>Telefone: {item.telefone}</Text>
          <Text style={styles.cardInfoText}>Status: {item.status}</Text>
          
          <View style={styles.cardTagContainer}>
            {tagsArray.length > 0 && 
              <Text style={styles.tagText}>Tags: {tagsArray.join(', ')}</Text>
            }
          </View>
          
          <View style={styles.cardAcoesContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ClienteManter', { cliente: item })} style={styles.cardBotaoAcao}>
              <AntDesign name="edit" size={20} color="#44161F" />
              <Text style={styles.cardTextoBotaoAcao}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert(`Processos de: ${item.nome}`)} style={styles.cardBotaoAcao}>
              <FontAwesome name="balance-scale" size={20} color="#44161F" />
              <Text style={styles.cardTextoBotaoAcao}>Processos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert(`Recibo para: ${item.nome}`)} style={styles.cardBotaoAcao}>
              <FontAwesome name="file-text-o" size={20} color="#44161F" />
              <Text style={styles.cardTextoBotaoAcao}>Recibo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMaisOpcoes(item)} style={styles.cardBotaoAcao}>
              <MaterialIcons name="more-vert" size={24} color="#44161F" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const clientesFiltrados = clientes.filter(c => 
    c.nome?.toLowerCase().includes(termoBusca.toLowerCase())
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9' }}>
        <ActivityIndicator size="large" color="#44161F" />
        <Text style={{marginTop: 10, color: '#44161F'}}>Buscando clientes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.Clientescontainer}>
      <View style={styles.backgroundImageContainer}>
        <Image source={require('../assets/coruja.png')} style={styles.backgroundImage} />
      </View>
      
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

      <View style = {styles.botoesAcaoLinha}>
        <TouchableOpacity onPress={() => alert('Importar Cliente')} style={styles.botaoComTexto}>
          <AntDesign name="cloudupload" size={20} color="#44161F"/>
          <Text>Importar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ClienteManter', {})} style={styles.botaoComTexto}>
          <AntDesign name="pluscircle" size={19} color="#44161F"/>
          <Text>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Filtrar')} style={styles.botaoComTexto}>
          <FontAwesome name = "filter" size={20} color="#44161F"/>
          <Text>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={clientesFiltrados}
        renderItem={renderCardCliente}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum cliente encontrado.</Text>}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}