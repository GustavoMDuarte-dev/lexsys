import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    //justifyContent: 'center',
    paddingTop: 80,

  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    resizeMode: 'contain',
    opacity: 0.07,
  },
  titleContent: {
    backgroundColor: 'rgb(185, 153, 71)',
    position: 'absolute',
    top: 0.6,
    width: '100%',
    alignItems: 'center',
    zIndex: 2,
    paddingTop: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title:{
    fontFamily: 'Helvetica',
    fontSize: 26,
    fontWeight: '600',
    color: '#44161F',
    textAlign: 'center',
  },
  subtitle:{
    fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: '500',
    color: '#44161F',
    textAlign: 'center',
    marginTop: 2
  },
  appName:{
     color: '#7B2A3B',
  fontWeight: 'bold',
  fontSize: 28,
  letterSpacing: 2,
  textShadowColor: '#00000033',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 1,
  },
  card:{
  backgroundColor: '#fff',
  borderRadius: 15,
  padding: 15,
  marginVertical: 10,
  width: '90%',
  alignSelf: 'center',
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.5,
  shadowRadius: 5,

  },
  cardTitle:{
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 6,
  color: '#44161F',
  },
  cardContent:{
  fontSize: 14,
  color: '#444',
  },
  cardHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8'
  },
  statusDotGreen:{
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginLeft: 8,
    marginRight: 10,
  },
  cardStatusRow:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  saldoPrevistoText: {
    fontWeight: 'bold',
    color: '#2c8200', // Um verde para indicar saldo positivo, por exemplo
    marginTop: 4,
    marginBottom: 10, // Espaço antes do gráfico
  },
  miniGraficoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Ou 'space-evenly'
    alignItems: 'flex-end', // Alinha as barras pela base
    marginTop: 15,
    paddingHorizontal: 10, // Para não colar nas bordas do card
    height: 100, // Altura total para o container do gráfico
  },
  barraGrafico: { // Container para cada barra individual + legenda
    alignItems: 'center',
    flex: 1, // Para que as barras ocupem espaço similar
  },
  barra: {
    width: '60%', // Largura da barra (ajuste conforme o visual desejado)
    borderRadius: 4, // Pequeno arredondamento nas barras
    // marginBottom: 5, // Espaço entre a barra e a legenda (opcional, pode ser no estilo da legenda)
  },
  barraReceitas: {
    backgroundColor: 'green',
  },
  barraDespesas: {
    backgroundColor: 'red',
  },
  legendaBarra: {
    fontSize: 10,
    color: '#555',
    marginTop: 4,
  },
  fabButton: {
  position: 'absolute',
  bottom: 30,
  alignSelf: 'center',
  backgroundColor: '#44161F', // bordô que você gosta
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5, // sombra no Android
  shadowColor: '#000', // sombra no iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},
processosContainer: { // Container principal para a tela de Processos
    flex: 1,
    backgroundColor: ' #D9D9D9', // Mesma cor de fundo da Home
},
acoesContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  paddingVertical: 8,
  backgroundColor: '#fff'
},
buscar:{
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: 20,
  paddingHorizontal: 10,
},
searchImput:{
  flex: 1,
  height: 40,
  fontSize: 14,
  color: '#333',
  fontWeight: 'bold'
},
botoesAcaoLinha: {
    flexDirection: 'row',         
    justifyContent: 'flex-end', 
    paddingHorizontal: 10,        
    paddingVertical: 8, 
},
 botaoAcaoIndividual: {
    padding: 8,       
    marginLeft: 15,                    
    alignItems: 'center',
    justifyContent: 'center',
 },
  botaoComTexto: { 
    flexDirection: 'row',   
    alignItems: 'center',    
    paddingVertical: 8,
    paddingHorizontal: 12,  
    marginLeft: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginTop: 5,
  },
});