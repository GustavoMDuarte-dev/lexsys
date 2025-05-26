import styles from './styles/styles';
import {
  React,
  Text,
  View,
  Image,
  NavigationContainer,
  createDrawerNavigator,
  AntDesign,
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
} from './imports';


const Drawer = createDrawerNavigator();

function Inicial({ navigation }) {
    const [expandido, setExpandido] = useState(false);
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/coruja.png')}
        style={styles.backgroundImage}
      />
    <View style = {styles.titleContent}>
     <Text style={styles.title}>Bem Vindo ao <Text style={styles.appName}>LexSys</Text></Text>
    <Text style={styles.subtitle}>Dr. Gustavo</Text>
    </View>
    <TouchableOpacity onPress={() => setExpandido(!expandido)}>
    <View style = {styles.card}>
      <View style = {styles.cardHeader}>
      <AntDesign name="folderopen" size={20} color="#333" style={{ marginRight: 8 }} />
      <Text style = {styles.cardTitle} >Resumo dos Processos</Text>
      </View>
      <View style = {styles.cardStatusRow}>
      <View style = {styles.statusDotGreen}/>
      <Text style = {styles.cardContent}>15 Processos Ativos </Text>
       <AntDesign
        name={expandido ? 'up' : 'down'}
        size={18}
        color="#333"
        style={{ marginLeft: 'auto' }}
      />
      </View>
       {expandido && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.cardContent}>• 10 Cíveis</Text>
              <Text style={styles.cardContent}>• 3 Trabalhistas</Text>
              <Text style={styles.cardContent}>• 2 Familiares</Text>
            </View>
          )}
    </View>
    </TouchableOpacity>

     <View style={styles.card}>
        <View style={styles.cardHeader}>
          <AntDesign name="calendar" size={20} color="#333" style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Audiência do Dia</Text>
        </View>
        <Text style={styles.cardContent}>Próxima audiência: 10/06 às 14h</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="alert-triangle" size={20} color="#333" style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Pendências Importantes</Text>
        </View>
        <Text style={styles.cardContent}>3 pendências críticas</Text>
      </View>

       <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="notifications" size={20} color="#333" style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Lembrete</Text>
        </View>
        <Text style={styles.cardContent}>Pagar taxa até 05/06</Text>
      </View>

      <View style = {styles.card}>
          <View style = {styles.cardHeader}>
          <MaterialIcons name = "attach-money" size={20} color= "#333" style={{ marginRight: 8 }}/>
          <Text style={styles.cardTitle}>Visão Financeira (Junho)</Text>
          </View>
          <Text style={styles.cardContent}>Previsto Receber: R$ 4.500,00</Text>
          <Text style={styles.cardContent}>Previsto Pagar:   R$ 1.200,00</Text>
          <Text style={[styles.cardContent, styles.saldoPrevistoText]}>Saldo Previsto: R$ 3.300,00</Text>

          <View style={styles.miniGraficoContainer}>
            <View style={styles.barraGrafico}>
              <View style={[styles.barra, styles.barraReceitas, {height: 80}]}/>
             <Text style={styles.legendaBarra}>Receitas</Text>
            </View>
            <View style={styles.barraGrafico}>
        <View style={[styles.barra, styles.barraDespesas, { height: 30 }]} />
        <Text style={styles.legendaBarra}>Despesas</Text>
        </View>
          </View>
        
      </View>

      <TouchableOpacity style={styles.fabButton} onPress={() => alert('Ação rápida!')}>
        <AntDesign name = "plus" size={30} color = "#fff"/>
      </TouchableOpacity>
    </View>
  );
}

function Processos({ navigation }) {

  const RenderProcessoItem = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => alert(`Processo: ${item.numero}`)}>
      <View style={styles.linhaProcessoContainer}>
          <Text style={[styles.celulaProcessoDado, { width: 180 }]}>{item.numero}</Text>
          <Text style={[styles.celulaProcessoDado, { width: 220 }]}>{item.cliente}</Text>
          <Text style={[styles.celulaProcessoDado, { width: 110 }]}>{item.status}</Text>
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
  ];

  
  return (
    <View style={styles.processosContainer}>
      <Image source={require('./assets/coruja.png')} style={styles.backgroundImage} />
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

function Clientes({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/coruja.png')} style={styles.backgroundImage} />
    </View>
  );
}

function Financeiro({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/coruja.png')} style={styles.backgroundImage} />
    </View>
  );
}

function Agenda({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/coruja.png')} style={styles.backgroundImage} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#44161F",
            width: "60%",
          },
          drawerActiveTintColor: "#fff",
          drawerActiveBackgroundColor: "#360C14",
          drawerLabelStyle: {
            fontSize: 20,
            color: "#fff",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Inicial}
          options={{
            drawerLabel: "Home",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#44161F" },
            headerShown: true,
            drawerIcon: () => <AntDesign name="home" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Processos"
          component={Processos}
          options={{
            drawerLabel: "Processos",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#44161F" },
            headerShown: true,
            drawerIcon: () => <AntDesign name="folderopen" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Clientes"
          component={Clientes}
          options={{
            drawerLabel: "Clientes",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#44161F" },
            headerShown: true,
            drawerIcon: () => <Feather name="users" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Financeiro"
          component={Financeiro}
          options={{
            drawerLabel: "Financeiro",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#44161F" },
            headerShown: true,
            drawerIcon: () => <MaterialIcons name="attach-money" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Agenda"
          component={Agenda}
          options={{
            drawerLabel: "Agenda",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#44161F" },
            headerShown: true,
            drawerIcon: () => <AntDesign name="calendar" color="#fff" size={34} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


