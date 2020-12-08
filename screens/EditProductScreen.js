import React,{useState,useCallback,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput,Platform,FlatList,TouchableOpacity,Alert,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';
import * as firebase from 'firebase';

import Colors from "../constans/Colors";
import CategoryItem from "../components/CategoryItem";
import {Categories} from '../data/dummy-data';
import {addProduct,editProduct} from '../store/actions/furnitureActions';
import ImageSelector from "../components/ImagePicker";

const EditProductScreen = (props) => {
    const id = props.navigation.getParam('id');
    const userId = useSelector(store => store.auth.userId);

    const dispatch = useDispatch();
    const firebaseStorage = firebase.storage();

    const user = useSelector(store => store.user.users).find(user => user.id === userId);
    const manufacture = user.name;
    const uId = user.id;
    const product = useSelector(store => store.furniture.products).find(product => product.id === id);

    const [title,setTitle] = useState(product ? product.title :'');
    const [description,setDescription] = useState(product ? product.description : '');
    const [price,setPrice] = useState(product ? product.price.toString() :'');
    const [quantity,setQuantity] = useState(product ? product.quantity.toString() :'');
    const [imageUrl,setImageUrl] = useState(product ? product.imageUrl :'');
    const [colors,setColors] = useState(product ? product.color : ['brown']);
    const [category,setCategory] = useState(product ? product.catId : 'c1');
    const [image,setImage] = useState();
    const [loading,setLoading] = useState(false);

    const [isTitleValid,setIsTitleValid] = useState(product ? true :false);
    const [isDescriptionValid,setIsDescriptionValid] = useState(product ? true : false);
    const [isPriceValid,setIsPriceValid] = useState(product ? true : false);
    const [isQuantityValid,setIsQuantityValid] = useState(product ? true : false);
    // const [isImageUrlValid,setIsImageUrlValid] = useState(product ? true : false);

    const availableColors = ['red','brown','gray','black','#a52a2a','#ffe4c4','#f4a460','#a0522d','#612800','#ff8229'];

    let url = '';

    const handleSubmit = useCallback( () => {
        if(!isTitleValid || !isDescriptionValid || !isPriceValid || !isQuantityValid ){
            Alert.alert('input error','your inputs have error try to fix',[
                {title: 'ok'}
            ]);
            return;
        }
        if(!product){
            if(!image){
                Alert.alert('no image picked','you must pick image to upload',[
                    {title: 'ok'}
                ]);
            }else {
                Alert.alert('are you sure','are you sure about added detail',[
                    {title: 'cancel'},
                    {title: 'ok',onPress: async () => {
                            setLoading(true);
                            await handleUpload();

                            setTimeout(() => {
                                dispatch(addProduct(uId,category,title,description,price,quantity,url,manufacture,colors));
                                setLoading(false);
                                props.navigation.goBack();
                            },6000);
                        }}
                ]);
            }
        }else{
            Alert.alert('are you sure','are you sure about editing',[
                {title: 'cancel'},
                {title: 'ok',onPress: () => {
                        setLoading(true);

                        dispatch(editProduct(id,title,description,price,quantity,colors,product.imageUrl));
                        props.navigation.goBack();
                    }}
            ]);
        }
    },[id,product,title,description,price,quantity,imageUrl,colors,category,manufacture,uId]);

    useEffect(() => {
        props.navigation.setParams({'save': handleSubmit});
    },[dispatch,handleSubmit]);

    const handleUpload = async () => {
        try{
            const imageUri = image.uri;
            const imageName = imageUri.split('/').pop();
            const response = await fetch(imageUri);
            const uploadedImage = await response.blob();

            const ref = firebaseStorage.ref().child('products').child(imageName);
            await ref.put(uploadedImage);
            const downloadUrl = await ref.getDownloadURL();

            setImageUrl(downloadUrl);
            url = downloadUrl;
            console.log(url);

        }catch (err) {
            console.log(err);
            throw err;
        }
    };

    const handleTitle = (text) => {
        if(text.trim().length > 5){
            setIsTitleValid(true);
        }else{
            setIsTitleValid(false);
        }
        setTitle(text);
    };

    const handleDescription = (text) => {
      if(text.trim().length >= 8){
          setIsDescriptionValid(true);
      }else{
          setIsDescriptionValid(false);
      }
      setDescription(text);
    };

    /*const handleImageUrl = (text) => {
        if(text.trim().length >= 8){
            setIsImageUrlValid(true);
        }else{
            setIsImageUrlValid(false);
        }
        setImageUrl(text);
    };*/

    const handlePrice = (text) => {
        if(text.trim().length !== 0 && !isNaN(text)){
            setIsPriceValid(true);
        }else{
            setIsPriceValid(false);
        }
        setPrice(text);
    };

    const handleQuantity = (text) => {
        if(text.trim().length !== 0){
            if(!isNaN(text)){
                setIsQuantityValid(true);
            }else{
                setIsQuantityValid(false);
            }
        }else{
            setIsQuantityValid(false);
        }
        setQuantity(text);
    };

    const handleImage = (image) => {
        setImage(image);
    };

    return(
        <View>
            <ScrollView>
                <View style={styles.screen}>
                    {loading && <ActivityIndicator size='large' color={Colors.primary}/>}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter product title</Text>
                        <TextInput style={styles.input} placeholder='enter product name' keyboardType='default' value={title} multiline={true} onChangeText={handleTitle}/>
                        {!isTitleValid && <Text style={styles.error}>enter valid title</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter product description</Text>
                        <TextInput style={styles.input} placeholder='enter product description' keyboardType='default' value={description} multiline={true} onChangeText={handleDescription}/>
                        {!isDescriptionValid && <Text style={styles.error}>enter valid description</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter product price</Text>
                        <TextInput style={styles.input} placeholder='enter product price' keyboardType='number-pad' value={price} onChangeText={handlePrice}/>
                        {!isPriceValid && <Text style={styles.error}>enter valid price</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter product quantity</Text>
                        <TextInput style={styles.input} placeholder='enter product quantity' keyboardType='number-pad' value={quantity} onChangeText={handleQuantity}/>
                        {!isQuantityValid && <Text style={styles.error}>enter valid quantity</Text>}
                    </View>
                    {/*<View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter product imageUrl</Text>
                        <TextInput style={styles.input} placeholder='enter imageUrl' keyboardType='default' value={imageUrl} multiline={true} onChangeText={handleImageUrl}/>
                        {!isImageUrlValid && <Text style={styles.error}>enter valid image url</Text>}
                    </View>*/}
                    {
                        !product && <ImageSelector takeImage={handleImage}/>
                    }
                    <Text style={styles.colors}>Colors</Text>
                    <ScrollView  horizontal={true}>
                        <View style={styles.row}>
                            {
                                availableColors.map((color) => {
                                    return(
                                        <MaterialCommunityIcons name="checkbox-blank-circle" size={colors.find(col => col === color) ? 60 : 42} color={color} key={color} onPress={() => {
                                            if(colors.find(col => col === color)){
                                                let removeIndex = colors.findIndex(col => col === color);
                                                const updateColor = [...colors];
                                                updateColor.splice(removeIndex,1);
                                                setColors(updateColor);
                                            }else{
                                                setColors(colors.concat(color));
                                            }
                                        }}/>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                    <Text style={styles.title}>Product Category</Text>
                    <ScrollView horizontal={true}>
                        {
                            Categories.map((cate) => {
                              return(
                                    <CategoryItem key={cate.id} id={cate.id} title={cate.title} enlarge={category === cate.id ? true :false} imageUrl={cate.imageUrl} onSelect={() => {
                                        setCategory(cate.id);
                                    }}/>
                              )
                            })
                        }
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
};

EditProductScreen.navigationOptions = navData => {
    const savePress = navData.navigation.getParam('save');
  return{
      headerTitleAlign: 'center',
      headerTitle: 'Details',
      headerRight: () => {
          return(
              <View style={{paddingTop: 15,paddingRight: 20}}>
                  <Ionicons name={Platform.OS === 'android' ? 'md-save' : 'ios-save'} size={23} color={Platform.OS === 'android' ? 'white' : Colors.accent} onPress={savePress}/>
              </View>
          )
      }
  }
};

const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 30,
        marginTop: 30
    },
    inputContainer: {
        paddingVertical: 10
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: '90%',
        height: 50,
        fontSize: 15
    },
    label: {
        textAlign: 'center',
        fontFamily: 'roboto-bold',
        fontSize: 16
    },
    error: {
        fontFamily: 'chilanka',
        fontSize: 14,
        color: 'red'
    },
    row: {
        flexDirection: 'row'
    },
    colors: {
        textAlign: 'center',
        fontFamily: 'roboto-bold',
        fontSize: 16,
        marginBottom: 20
    },
    title: {
        textAlign: 'center',
        fontFamily: 'roboto-italic',
        fontSize: 20,
        marginBottom: 20
    }
});

export default EditProductScreen;