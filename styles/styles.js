import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    resizeMode: 'contain',
    opacity: 0.07,
  },
  titleContent: {
    backgroundColor: 'rgb(165, 122, 13)',
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
});