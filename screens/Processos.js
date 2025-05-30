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


export default function Processos() {

  const getStatusColor = (status) =>{
    if (status === 'Ativo') return 'green';
    if (status === 'Urgente') return 'red';
  }

  const RenderProcessoItem = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => alert(`Processo: ${item.numero}`)}>
      <View style={styles.linhaProcessoContainer}>
          <Text style={[styles.celulaProcessoDado, { width: 180 }]}>{item.numero}</Text>
          <Text style={[styles.celulaProcessoDado, { width: 220 }]}>{item.cliente}</Text>
            <Text style={[
            styles.celulaProcessoDado,
            {
              width: 110,
              color: getStatusColor(item.status)
            }
          ]}>
            {item.status}
          </Text>
          <Text style={[styles.celulaProcessoDado, { width: 130 }]}>{item.proximoPrazo || '---'}</Text>
          <Text style={[styles.celulaProcessoDado, { width: 200, paddingRight: 15 }]}>{item.ultimaMovimentacao}</Text>
      </View>
    </TouchableOpacity>
  );
};

const mockProcessos = [
    { id: '1', numero: '0012345-67.2023.8.21.0001', cliente: 'Empresa Fantasia Alfa Ltda.', status: 'Ativo', proximoPrazo: '10/06/2025', ultimaMovimentacao: 'Juntada de Petição Inicial' },
    { id: '2', numero: '1009876-54.2022.5.04.0010', cliente: 'Maria Joaquina da Silva e Outros', status: 'Urgente', proximoPrazo: '25/05/2025', ultimaMovimentacao: 'Concluso para Sentença' },
    { id: '3', numero: '0055555-22.2024.8.21.0015', cliente: 'Condomínio Residencial Flores', status: 'Suspenso', proximoPrazo: 'N/A', ultimaMovimentacao: 'Aguardando Laudo Pericial' },
    { id: '4', numero: '0778899-00.2021.2.03.0020', cliente: 'Ana Beatriz Oliveira Costa', status: 'Arquivado', proximoPrazo: '', ultimaMovimentacao: 'Baixado Definitivamente' },
    { id: '5', numero: '0000555-11.2024.8.21.0001', cliente: 'Pedro Alvares Cabral Neto', status: 'Ativo', proximoPrazo: '30/07/2025', ultimaMovimentacao: 'Réplica Apresentada' },
    { id: '6', numero: '0076543-99.2023.8.21.0010', cliente: 'Comércio de Alimentos S.A.', status: 'Com Prazo', proximoPrazo: '01/06/2025', ultimaMovimentacao: 'Intimação para Manifestação' },
    { id: '7', numero: '0011223-33.2023.8.21.0008', cliente: 'Construtora Casas Prontas Ltda', status: 'Em Recurso', proximoPrazo: '15/08/2025', ultimaMovimentacao: 'Apelação Recebida' },
    { id: '8', numero: '2003004-55.2022.4.04.7100', cliente: 'Marta Ferreira de Souza', status: 'Extinto', proximoPrazo: '', ultimaMovimentacao: 'Transitado em Julgado' },
    { id: '9', numero: '0034567-11.2024.8.21.0021', cliente: 'Transportadora Rápida Ltda.', status: 'Ativo', proximoPrazo: '15/07/2025', ultimaMovimentacao: 'Aguardando citação do réu' },
    { id: '10', numero: '0001234-98.2023.5.04.0005', cliente: 'Carlos Alberto Nobrega Jr.', status: 'Com Prazo', proximoPrazo: '02/06/2025', ultimaMovimentacao: 'Prazo para impugnar cálculos' },
    { id: '11', numero: '0077777-44.2022.8.21.0001', cliente: 'Padaria Pão Quente & Cia', status: 'Suspenso', proximoPrazo: 'N/A', ultimaMovimentacao: 'Acordo em negociação' },
    { id: '12', numero: '0023456-78.2024.2.03.0033', cliente: 'Joana D\'Arc Medeiros', status: 'Urgente', proximoPrazo: '29/05/2025', ultimaMovimentacao: 'Necessário protocolar defesa' },
    { id: '13', numero: '1122334-55.2021.8.21.0018', cliente: 'Mecânica Irmãos Rocha', status: 'Arquivado', proximoPrazo: '', ultimaMovimentacao: 'Cumprimento de sentença finalizado' },
    { id: '14', numero: '0000001-01.2025.8.21.0001', cliente: 'StartUP Inovadora Soluções Web', status: 'Ativo', proximoPrazo: '01/09/2025', ultimaMovimentacao: 'Processo distribuído recentemente' },
    { id: '15', numero: '0045678-12.2023.8.21.0007', cliente: 'Escola de Idiomas Fale Bem', status: 'Em Recurso', proximoPrazo: '20/08/2025', ultimaMovimentacao: 'Contra-arrazoadas ao Recurso Especial' },
    { id: '16', numero: '3001002-33.2022.4.04.7200', cliente: 'Antônio Conselheiro Neto', status: 'Extinto', proximoPrazo: '', ultimaMovimentacao: 'Acordo homologado e cumprido' }
  ];

  
  return (
    <View style={styles.processosContainer}>
      <Image source={require('../assets/coruja.png')} style={styles.backgroundImage} />
      <View style={styles.acoesContainer}>
        <View style={styles.buscar}>
        <AntDesign name="search1" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
        style={styles.searchInput}
        placeholder='Buscar Processo'
        placeholderTextColor={"#888"}
        />
        </View> 
      </View>


      <View style = {styles.botoesAcaoLinha}>
 <TouchableOpacity onPress={() => alert('Importar Processo')} style={styles.botaoComTexto}>
    <AntDesign name="cloudupload" size={20} color="#44161F"/>
    <Text>Importar</Text>
  </TouchableOpacity>
 <TouchableOpacity onPress={() => alert('Adicionar Novo Processo')} style={styles.botaoComTexto}>
    <AntDesign name="pluscircle" size={19} color="#44161F"/>
    <Text>Adicionar</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => alert('filtrar')} style={styles.botaoComTexto}>
    <FontAwesome name = "filter" size={20} color="#44161F"/>
    <Text>Filtrar</Text>

  </TouchableOpacity>
</View>
<View style={styles.headerColunasContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
         
          <Text style={[styles.textoHeaderColuna, { width: 100 }]}>Nº Processo</Text>
          <Text style={[styles.textoHeaderColuna, { width: 100}]}>Cliente</Text>
          <Text style={[styles.textoHeaderColuna, { width: 100 }]}>Status</Text>
          <Text style={[styles.textoHeaderColuna, { width: 100}]}>Próx. Prazo</Text>
          <Text style={[styles.textoHeaderColuna, { width: 100, paddingRight: 15 }]}>Últ. Mov.</Text> 
        </ScrollView>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dadosBlocoScrollViewHorizontal}>
        <View style={styles.flatListConteudoLargo}>
       <FlatList
        data={mockProcessos}
        renderItem={RenderProcessoItem}
        keyExtractor={item => item.id}
        style={styles.flatListProcessos}
      />
      </View>
      </ScrollView>

    </View>
  );
}
