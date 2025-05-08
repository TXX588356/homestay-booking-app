const config = {
    // Change the IPs accordingly
    settings: {
      livechatServerPath: 'http://10.0.2.2:5000', // used in websocket for live chat
      bookingServerPath: 'http://10.0.2.2:5001', // used in interacting with database for bookings via fetch API
      wishlistServerPath: 'http://10.0.2.2:5002', // used in interacting with database for wishlist via fetch API
    }
  };
  
export default config;
