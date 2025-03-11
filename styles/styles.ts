import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        gap:10
    },
    titleWrapper:{
        paddingBlock:20
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
    mainView:{
        paddingInline:20
    },
    defaultTitle:{
        fontSize:25,
        fontWeight:800,
        textAlign:'center'
    },
    button:{
        backgroundColor:'#000',
        paddingInline:20,
        paddingBlock:20,
        borderRadius:10,
        
    },
    buttonTitle:{
        color:'#fff',
        textTransform:'uppercase',
        letterSpacing:5,
        textAlign:'center'
    }
})

export default styles;