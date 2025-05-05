import { View, Text } from 'react-native'
import React, { createContext, useContext, useState } from 'react';


type Property = {
    id: string;
    name: string;
    location: string;
    price: string;
    images: any;
    category: string;
};

type WishlistContextType = {
    wishlist: Property[];
    addToWishlist: (property: Property) => void;
    removeFromWishlist: (propertyId: string) => void;
};

const WishlistContext = createContext<WishlistContextType>({
    wishlist: [],
    addToWishlist: () => {},
    removeFromWishlist: () => {},
});

export const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState<Property[]>([]);

    const addToWishlist = (property: Property) => {
        setWishlist(prev => [...prev, property]);
    }

    const removeFromWishlist = (propertyId: string) => {
        setWishlist(prev => prev.filter(item => item.id !== propertyId));
    }

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
        {children}
      </WishlistContext.Provider>
    )
   
}


export const useWishlist = () => useContext(WishlistContext)