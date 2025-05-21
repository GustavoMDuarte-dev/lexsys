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
  }
});