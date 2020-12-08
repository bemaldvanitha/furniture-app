import {Products} from '../../data/dummy-data';
import {TOGGLE_FAVORITE,ADD_PRODUCT,EDIT_PRODUCT,DELETE_PRODUCT,REDUCE_PRODUCT_QUANTITY,ADD_ORDERED_ITEM,
    SHIP_ORDER,FETCH_PRODUCTS,FETCH_FAVORITE_PRODUCTS,FETCH_ORDERED_ITEMS,FETCH_ALL} from '../actions/furnitureActions';
import ItemOrder from '../../modals/itemOrder';
import Furniture from "../../modals/furniture";

const initState = {
    products: [],
    wishListProducts: [],
    orderedProducts: [],
};

const furnitureReducer = (state = initState,action) => {
    switch(action.type) {
        case FETCH_ALL:
            const allProducts = action.payload.furniture;
            const favoriteProductIds = action.payload.favListIds;
            const wishList = [];

            favoriteProductIds.map(id => {
               const wishListProduct = allProducts.find(pro => pro.id === id);
               wishList.push(wishListProduct);
            });

            return {...state,products: allProducts,wishListProducts: wishList};
        case TOGGLE_FAVORITE:
            const index = state.wishListProducts.findIndex(pro => pro.id === action.payload);
            if(index >= 0){
                const updatedFav = [...state.wishListProducts];
                updatedFav.splice(index,1);
                return {...state,wishListProducts: updatedFav}
            }else{
                const product = state.products.find(pro => pro.id === action.payload);
                return {...state,wishListProducts: state.wishListProducts.concat(product)}
            }
        case  ADD_PRODUCT:
            const newProduct = new Furniture(action.payload.id,action.payload.uId,action.payload.catId,action.payload.title,action.payload.description,
                action.payload.price,action.payload.quantity,action.payload.imageUrl,0,action.payload.manufacturer,new Date().toISOString(),action.payload.color);
            return {...state,products: state.products.concat(newProduct)};
        case FETCH_PRODUCTS:
            return {...state,products: action.payload.furniture};
        case FETCH_FAVORITE_PRODUCTS:
            const favProductIds = action.payload.favListIds;
            const favoriteList = [];
            favProductIds.map(id => {
               const favProds = state.products.find(pro => pro.id === id);
               favoriteList.push(favProds);
            });
            return {...state,wishListProducts: favoriteList};
        case DELETE_PRODUCT:
            const delIndex = state.products.findIndex(fur => fur.id === action.payload);
            const newProducts = [...state.products];
            newProducts.splice(delIndex,1);
            return {...state,products: newProducts};
        case EDIT_PRODUCT:
            const currentProduct = state.products.find(pro => pro.id === action.payload.id);
            const currentIndex = state.products.findIndex(pro => pro.id === action.payload.id);
            const editedProduct = new Furniture(currentProduct.id,currentProduct.uId,currentProduct.catId,action.payload.title,action.payload.description,action.payload.price,
                action.payload.quantity,action.payload.imageUrl,currentProduct.rating,currentProduct.manufacturer,currentProduct.manufacturedDate,action.payload.color);
            const updatedVersion = [...state.products];
            updatedVersion.splice(currentIndex,1);
            return {...state,products: updatedVersion.concat(editedProduct)};
        case ADD_ORDERED_ITEM:
            const orderedItem = new ItemOrder(action.payload.id,action.payload.itemName,action.payload.quantity,action.payload.color,action.payload.shipAddress,
                action.payload.uId,action.payload.orderedName,action.payload.orderedDate,action.payload.shippedDate);
            return {...state,orderedProducts: state.orderedProducts.concat(orderedItem)};
        case FETCH_ORDERED_ITEMS:
            return {...state,orderedProducts: action.payload}
        case REDUCE_PRODUCT_QUANTITY:
            const reduceItem = state.products.find(pro => pro.id === action.payload.id);
            const reduceItemIndex = state.products.findIndex(pro => pro.id === action.payload.id);
            reduceItem.quantity =  action.payload.quantity;
            const newItemList = [...state.products];
            newItemList.splice(reduceItemIndex,1);
            return {...state,products: newItemList.concat(reduceItem)};
        case SHIP_ORDER:
            const orderedItemNumber = state.orderedProducts.findIndex(item => item.id === action.payload);
            const orderedItemDetail = state.orderedProducts.find(pro => pro.id === action.payload);
            orderedItemDetail.shippedDate = new Date().toISOString();
            console.log(orderedItemDetail);
            const newOrderedList = [...state.orderedProducts];
            newOrderedList.splice(orderedItemNumber,1);
            return {...state};

            default: return state;
    }
    //return state;
};

export default furnitureReducer;