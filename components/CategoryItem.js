import React from 'react';
import {View,StyleSheet,Text,ImageBackground,Dimensions,TouchableOpacity} from 'react-native';

const CategoryItem = (props) => {
    return(
        <TouchableOpacity onPress={props.onSelect}>
            {
                props.enlarge && <ImageBackground style={styles.enlargeImage} source={{uri: props.imageUrl}}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                    </ImageBackground>
            }
            {
                !props.enlarge && <ImageBackground style={styles.image} source={{uri: props.imageUrl}}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                    </ImageBackground>
            }
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('screen').width * 0.45,
        height: Dimensions.get('screen').height * 0.25,
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'flex-end',
    },
    enlargeImage: {
        width: Dimensions.get('screen').width * 0.6,
        height: Dimensions.get('screen').height * 0.3,
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10
    },
    titleContainer: {
        backgroundColor: 'grey',
        opacity: 0.8,
        marginBottom: 15,
        marginHorizontal: 20,
        borderRadius: 10,
        height: 30
    },
    title: {
        fontFamily: 'roboto',
        fontSize:  17,
        textAlign: 'center'
    }
});

export default CategoryItem;