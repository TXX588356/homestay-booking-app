export const allProperties = {
    Beach: [
        {
            id: 'b1',
            name: 'Bidong View Resort', 
            location: 'Kuala Lumpur', 
            price: 98,
            images: [
                require('./img/beach1a.jpg'),
                require('./img/beach1b.jpg'),
                require('./img/beach1c.jpg')
              ],
            category: 'Beach',
            recommended: true,
            amenities: ['WiFi', 'Pool', 'Kitchen', 'Beach Access'],
            description: 'Enjoy this stunning beachfront villa with amazing ocean views.',


        },
    ],
    Mountain: [
        {
            id: 'm1',
            name: 'Blue Cabin', 
            location: 'Cameron Highlands', 
            price: 149,
            images: [
                require('./img/cabin1a.jpg'),
                require('./img/cabin1b.jpg'),
                require('./img/cabin1c.jpg')
              ],
            category: 'Mountain',
            recommended: true,
            amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Hiking Trails'],
            description: 'Cozy cabin in the mountains with breathtaking views.',

        },

    ],
    City: [
        {
            id: 'c1',
            name: 'KL Townhouse Villa', 
            location: 'Kuala Lumpur', 
            price: 199,
            images: [
                require('./img/villa1a.jpg'),
                require('./img/villa1b.jpg'),
                require('./img/villa1c.jpg')
              ],
            category: 'City',
            recommended: true,
            amenities: ['WiFi', 'Pool', 'Kitchen', 'Beach Access'],
            description: 'Modern townhouse located in the heart of KL, perfect for urban living.'
        },
    ],
    Camping: [
        {
            id: 'cg1',
            name: 'Gopeng Glamping Park', 
            location: 'Kuala Lumpur', 
            price: 139,
            images: [
                require('./img/camping1a.jpg'),
                require('./img/camping1b.jpg'),
                require('./img/camping1c.jpg')
              ],
            category: 'Camping',
            recommended: true,
            amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Hiking Trails'],
            description: 'Cozy camping experience with breathtaking views.',

        },
    ],
    Pool: [
        {
            id: 'p1',
            name: 'Rick Resort Teluk Intan', 
            location: 'Teluk Intan, Perak', 
            price: 60,
            images: [
                require('./img/pool1a.jpg'),
                require('./img/pool1b.jpg'),
                require('./img/pool1c.jpg'),
              ],
            category: 'Pool',
            recommended: true,
            amenities: ['WiFi', 'Pool', 'Kitchen', 'Beach Access'],
            description: 'Relax at Rick Resort Teluk Intan, a peaceful getaway featuring modern rooms, a refreshing pool, and easy beach access for the perfect family vacation.'
        },
        {
            id: 'p2',
            name: 'Villa Dracaena', 
            location: 'Bukit Katil, Malacca', 
            price: 120,
            images: [
                require('./img/pool2a.jpg'),
                require('./img/pool2b.jpg'),
                require('./img/pool2c.jpg'),
              ],
            category: 'Pool',
            recommended: false,
            amenities: ['WiFi', 'Pool', 'Kitchen', 'Free Parking', 'Air Conditioning'],
            description: 'Featuring inner courtyard views, Villa Dracaena Melaka With Swimming Pool, Hill View and 20 minutes to Town in Malacca features accommodations and a garden',
        },
    ]
    
    
    


}