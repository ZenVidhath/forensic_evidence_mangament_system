const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const caseRoutes = require('./routes/case');
const evidenceRoutes = require('./routes/evidence');
const custodyRoutes = require('./routes/custodyRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/custody', custodyRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('DB Error:', err));

app.get('/', (req, res) => res.send('FEMS API Running'));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
