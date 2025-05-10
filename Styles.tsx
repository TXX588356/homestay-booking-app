import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;

export const ExternalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainTitle: {
        fontSize: 30,
        fontFamily: 'Montserrat-Bold',
        color: 'black'
    },
    SubHeader: {
        backgroundColor: '#ff5a5f',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
    },
    subHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold',
    },
    titleText: {
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
    },
    subTitle: {
        fontFamily: 'Montserrat-Medium'
    },
    inputContainer: {
        marginBottom: 10,
    },
    
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 10,
    },

    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold', 
    },
    label: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: '700',
    },

    authLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        fontFamily: 'Montserrat-Bold'
    },

    loginText: {
        color: '#ff5a5f',
        fontWeight: 'bold',
        marginLeft: 5,
        fontFamily: 'Montserrat-Regular'
    },

    row: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      infoBoxWrapper: {
        borderTopColor: '#dddddd',
        borderBottomColor: '#dddddd',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 100,
      },

   /*  searchArea: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 20, 
        paddingHorizontal: 15,
        fontSize: 16,
        elevation: 4, 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }, */

    button: {
        backgroundColor: '#ff5a5f',
        padding: 15,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        borderRadius: 8,
    },
    imageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
      },
      dotContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
      },

    propertyName: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'Montserrat-Bold'
    },
    propertyPrice: {
        color: "#ff5a5f",
        fontFamily: 'Montserrat-Bold',
    },
    propertyLocation: {
        color: 'grey',
        fontFamily: 'Montserrat-Medium'
    },
    stayImage: {
        height: 130,
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    CarouselImage: {
        width: '100%',
        height: width - 10,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    propertyCardContainer: {
        width: "95%",
        height: 200,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 7,
        backgroundColor: '#fff',
        alignSelf: 'center',
    },

    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: 'grey',
    },
    inactiveDot: {
        backgroundColor: '#ccc',
    },
    

   


    //PropertyDetails Screen
    propertyTitle: {
        alignItems: 'center',
    }, 
    ContainerWithUnderline: {
        margin: 20,
        paddingBottom: 10,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    
    sectionContainer: {
        margin: 20,
    },
    selectedsectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        borderColor: '#D3D3D3'
    },
    date: {
        fontFamily: 'Montserrat-Medium',
    },
    descContainer: {
        margin: 20,
        paddingBottom: 10,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    
    backButtonContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
      },
      
    backButton: {
    backgroundColor: 'rgba(205, 192, 192, 0.5)',
    padding: 8,
    borderRadius: 20,
    },

    bottomContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    innerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookButton: {
        height: 35,
        backgroundColor: '#FF385C',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },
    buttonText: {
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'Montserrat-Regular',

    },
    output: {
        height: 400,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
      },

});
