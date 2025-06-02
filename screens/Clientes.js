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
} from '../imports';

const DADOS_EXEMPLO_CLIENTES = [
  { id: '1', nome: 'Cliente Exemplo Alfa', email: 'alfa@exemplo.com', telefone: '(11) 11111-1111', status: 'Ativo', tags: ['Importante', 'Novo', 'Atenção']},
  { id: '2', nome: 'Cliente Exemplo Beta', email: 'beta@exemplo.com', telefone: '(22) 22222-2222', status: 'Potencial', tags: ['Novo'] },
];

export default function Clientes() {
  const [clientes, setClientes] = useState(DADOS_EXEMPLO_CLIENTES);
  const [termoBusca, setTermoBusca] = useState('');

  const renderCardCliente = ({ item }) => {
    const handleMaisOpcoes = () => {
      alert(`Mais opções para: ${item.nome}\n- Enviar Notificação\n- Criar Procuração`);
    };

    return (
      <View style={styles.cardCliente}>
        <Text style={styles.cardNomeCliente}>{item.nome}</Text>
        <Text style={styles.cardInfoText}>Email: {item.email}</Text>
        <Text style={styles.cardInfoText}>Telefone: {item.telefone}</Text>
        <Text style={styles.cardInfoText}>Status: {item.status}</Text>
        <View style={styles.cardTagContainer}>
        {item.tags && item.tags.length > 0 && <Text style={styles.tagText}>Tags: {item.tags.join(', ')}</Text>}
        </View>
        
        <View style={styles.cardAcoesContainer}>
          <TouchableOpacity onPress={() => alert(`Editar: ${item.nome}`)} style={styles.cardBotaoAcao}>
            <AntDesign name="edit" size={20} color="#44161F" />
            <Text style={styles.cardTextoBotaoAcao}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert(`Processos: ${item.nome}`)} style={styles.cardBotaoAcao}>
            <FontAwesome name="balance-scale" size={20} color="#44161F" />
            <Text style={styles.cardTextoBotaoAcao}>Processos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert(`Criar Recibo: ${item.nome}`)} style={styles.cardBotaoAcao}>
            <FontAwesome name="file-text-o" size={20} color="#44161F" />
            <Text style={styles.cardTextoBotaoAcao}>Recibo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMaisOpcoes} style={styles.cardBotaoAcao}>
            <MaterialIcons name="more-vert" size={24} color="#44161F" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <View style={styles.Clientescontainer}>
      <Image source={require('../assets/coruja.png')} style={styles.backgroundImage} />
      
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
        <TouchableOpacity onPress={() => alert('Adicionar Novo Cliente')} style={styles.botaoComTexto}>
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
      />
    </View>
  );
}