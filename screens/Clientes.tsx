import styles from '../styles/styles';
import { React, Text, View, Image, AntDesign, FontAwesome, TouchableOpacity, useState, TextInput, FlatList, Alert } from '../imports';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// ALTERAÇÃO 1: Importar apenas o 'firestore'
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

  // ALTERAÇÃO 2: A referência da coleção usa a sintaxe da v8
  const clientesCollectionRef = firestore.collection("clientes");

  const carregarClientes = async () => {
    setLoading(true);
    try {
      // ALTERAÇÃO 3: A busca de dados usa .get()
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

  const handleExcluir = (item: Cliente) => {
    Alert.alert("Excluir Cliente?", `Deseja excluir "${item.nome}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            // ALTERAÇÃO 4: A exclusão usa .doc().delete()
            await firestore.collection("clientes").doc(item.id).delete();
            Alert.alert("Sucesso", "Cliente excluído!");
            carregarClientes(); // Recarrega a lista
          } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            Alert.alert("Erro", "Não foi possível excluir o cliente.");
          }
        },
        style: "destructive"
      }
    ]);
  };

  // Nenhuma alteração necessária no JSX abaixo
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
        {/* ... todo o seu JSX permanece igual ... */}
    </View>
  );
}