const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
const sampleProducts = [
    {
        name: 'iPhone 13',
        description: 'Apple smartphone with A15 Bionic chip.',
        price: 999,
        image: 'https://www.imagineonline.store/cdn/shop/files/iPhone_13_ProductRED_PDP_Image_Position-1A__GBEN.jpg?v=1692413003',
    },
    {
        name: 'Samsung Galaxy S22',
        description: 'Samsung flagship with AMOLED display.',
        price: 899,
        image: 'https://images-cdn.ubuy.co.in/65f86daa7668484b9e00fd9c-open-box-samsung-galaxy-s22-5g-s901u.jpg',
    },
    {
        name: 'OnePlus 10 Pro',
        description: 'Powerful phone with Snapdragon 8 Gen 1.',
        price: 749,
        image: 'https://cdnmedia.placewellretail.com/pub/media/catalog/product/cache/d2f155c8ae3423b25125c336aa39579e/o/n/oneplus-10-pro-smartphones-492849810-i-1-1200wx1200h.webp',
    },
    {
        name: 'MacBook Pro',
        description: 'Apple laptop with M2 chip.',
        price: 1999,
        image: 'https://findmyapple.in/wp-content/uploads/2023/08/mbp-spacegray-select-202206.jpg',
    },
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Product.deleteMany();
        const created = await Product.insertMany(sampleProducts);

        console.log(`Seeded ${created.length} products`);
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedProducts();
