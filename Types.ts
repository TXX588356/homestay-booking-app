//for screen route definitions, ensure type safety
//when navigating between screens
export type RootStackParamList = {
  Home: undefined;
  Register: {display: string};
  Login: {display: string};
  Explore: {display: string};
  HomePage: {display: string};
  Profile: {display: string};
  Trip: {display: string};
  HomestayDetails: {display: string};
  Booking: {display: string};
  ReviewBookingScreen: {
    property: any;
    startDate: string;
    endDate: string;
    numGuests: number;
  };
  PaymentMethod: {
    property: any;
    startDate: string;
    endDate: string;
    numGuests: number;
    numOfDays: number;
    totalPrice: number;
  }
  List: {display: string};
  Authentication: {display: string},
  CategoryScreen: {catName: string},
  PropertyDetails: {data: any};
  WelcomeScreen: {display: string},
  BookingScreen: {property: any},
  Wishlist: {property: any},
  AccountSettingScreen: {info: any},

};

//define common navigation styles
export type StackOptionList = {
  HomeHeader: {
    title: string,
    headerStyle: {
      backgroundColor: string,
    },
    headerTitleAlign: string,
    headerTintColor: string,
    headerTitleStyle: {
      fontWeight: string,
    }
  },
SubHeader:{
  headerStyle: {
    backgroundColor: string,
  },
  headerTitleAlign: string,
  headerTintColor: string,
  headerTitleStyle: {
    fontWeight: string,
  }
}
};