const express = require('express');
const dotenv  = require('dotenv');
const cors    = require('cors');
const path    = require('path');
const connectDB = require('./config/db');
const createDefaultAdmin = require('./utils/createDefaultAdmin');

dotenv.config();
connectDB().then(() => createDefaultAdmin());

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users',    require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart',     require('./routes/cartRoutes'));
app.use('/api/orders',   require('./routes/orderRoutes'));
app.use('/api/reports',        require('./routes/reportsRoutes'));
app.use('/api/wishlist',       require('./routes/wishlistRoutes'));
app.use('/api/notifications',  require('./routes/notificationsRoutes'));
app.use('/api/site',           require('./routes/siteRoutes'));
app.use('/api/planner',        require('./routes/plannerRoutes'));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'SRI SS ELECTRICALS API is running...' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
