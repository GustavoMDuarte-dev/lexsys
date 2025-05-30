import styles from '../styles/styles';
import {
  React,
  Text,
  View,
  Image,
  NavigationContainer,
  createDrawerNavigator,
  AntDesign,
  FontAwesome,
  Feather,
  MaterialIcons,
  TouchableOpacity,
  useState,
  LayoutAnimation,
  Platform,
  UIManager,
  TextInput,
  ScrollView,
  FlatList,
} from '../imports';

const DADOS_EXEMPLO_CLIENTES = [

]

export default function Clientes() {
     const [clientes, setClientes] = useState(DADOS_EXEMPLO_CLIENTES);
     const [termoBusca, setTermoBusca] = useState('');

     const renderCardCliente = ({ item }) => {
        const handleMaisOpcoes = () => {
            alert(`Mais opções para: ${item.nome}\n- Enviar Notificação\n- Criar Procuração`);
        }
     }
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


              <View style={styles.cardCliente}>
        <Text style={styles.cardNomeCliente}>{item.nome}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Telefone: {item.telefone}</Text>
        <Text>Status: {item.status}</Text>
        {item.tags && item.tags.length > 0 && <Text>Tags: {item.tags.join(', ')}</Text>}
        
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

    </View>

    
  );
}