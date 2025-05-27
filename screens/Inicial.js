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

export default function Inicial() {

  const [expandido, setExpandido] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/coruja.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.titleContent}>
        <Text style={styles.title}>
          Bem Vindo ao <Text style={styles.appName}>LexSys</Text>
        </Text>
        <Text style={styles.subtitle}>Dr. Gustavo</Text>
      </View>
      <TouchableOpacity onPress={() => setExpandido(!expandido)}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <AntDesign
              name="folderopen"
              size={20}
              color="#333"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.cardTitle}>Resumo dos Processos</Text>
          </View>
          <View style={styles.cardStatusRow}>
            <View style={styles.statusDotGreen} />
            <Text style={styles.cardContent}>15 Processos Ativos </Text>
            <AntDesign
              name={expandido ? "up" : "down"}
              size={18}
              color="#333"
              style={{ marginLeft: "auto" }}
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
          <AntDesign
            name="calendar"
            size={20}
            color="#333"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.cardTitle}>Audiência do Dia</Text>
        </View>
        <Text style={styles.cardContent}>Próxima audiência: 10/06 às 14h</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather
            name="alert-triangle"
            size={20}
            color="#333"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.cardTitle}>Pendências Importantes</Text>
        </View>
        <Text style={styles.cardContent}>3 pendências críticas</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons
            name="notifications"
            size={20}
            color="#333"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.cardTitle}>Lembrete</Text>
        </View>
        <Text style={styles.cardContent}>Pagar taxa até 05/06</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons
            name="attach-money"
            size={20}
            color="#333"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.cardTitle}>Visão Financeira (Junho)</Text>
        </View>
        <Text style={styles.cardContent}>Previsto Receber: R$ 4.500,00</Text>
        <Text style={styles.cardContent}>Previsto Pagar: R$ 1.200,00</Text>
        <Text style={[styles.cardContent, styles.saldoPrevistoText]}>
          Saldo Previsto: R$ 3.300,00
        </Text>

        <View style={styles.miniGraficoContainer}>
          <View style={styles.barraGrafico}>
            <View
              style={[styles.barra, styles.barraReceitas, { height: 80 }]}
            />
            <Text style={styles.legendaBarra}>Receitas</Text>
          </View>
          <View style={styles.barraGrafico}>
            <View
              style={[styles.barra, styles.barraDespesas, { height: 30 }]}
            />
            <Text style={styles.legendaBarra}>Despesas</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => alert("Ação rápida!")}
      >
        <AntDesign name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );

}
