const express = require('express');
const helmet = require('helmet');
const path = require('path');

const cors = require('cors');

const SignupCollection = require('./mongo');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config(); 
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' })); // Adjust origin as needed

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://127.0.0.1:8000"], // Allow connections to the backend
    },
}));
  


const PORT = process.env.PORT;

const API_KEY_ALLTIME = process.env.ALPHA_VANTAGE_API_KEY_ALLTIME;

const API_KEY_YEAR = process.env.ALPHA_VANTAGE_API_KEY_YEAR;

const API_KEY_MONTH = process.env.ALPHA_VANTAGE_API_KEY_MONTH;

const API_KEY_WEEK = process.env.ALPHA_VANTAGE_API_KEY_WEEK;

const API_KEY_DAY = process.env.ALPHA_VANTAGE_API_KEY_DAY;

const API_KEY_OVERVIEW = process.env.ALPHA_VANTAGE_API_KEY_OVERVIEW;

const API_KEY_LIVEPRICE = process.env.ALPHA_VANTAGE_API_KEY_LIVEPRICE;

const API_KEY_ANALYTICS = process.env.ALPHA_VANTAGE_API_KEY_ANALYTICS;

const API_KEY_FUNDAMENTALS = process.env.ALPHA_VANTAGE_API_KEY_FUNDAMENTALS;

const API_KEY_BASICS = process.env.ALPHA_VANTAGE_API_KEY_BASICS;


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.post('/Signup', async (req, res) => {
    const { email, password, fname, lname } = req.body;
    const data = {
        email: email,
        password: password,
        fname: fname,
        lname: lname
    };

    try {
        const check = await SignupCollection.findOne({ email: email });
        if (check) {
            return res.json("User already exists");
        } else {
            await SignupCollection.create(data);
            return res.json("Signup success");
        }
    } catch (e) {
        console.error(e);
        return res.json("Error occurred");
    }
});

app.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await SignupCollection.findOne({ email: email });

        if (user) {
            if (user.password === password) {
                return res.json("Login success");
            } else {
                return res.json("Invalid password");
            }
        } else {
            return res.json("User not found");
        }
    } catch (e) {
        console.error(e);
        return res.json("Error occurred");
    }
});



//for all time
app.get('/api/stock-data/alltime', async (req, res) => {
    const { symbol } = req.query;
    const FUNCTION = 'TIME_SERIES_MONTHLY';

    if (!symbol) {
        return res.status(400).send("Symbol is required");
    }
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: FUNCTION,
                symbol,
                apikey: API_KEY_ALLTIME,
            },
        });

        

        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(500).send("No data received from Alpha Vantage");
        }

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching stock data");
    }
});


//For year 
app.get('/api/stock-data/year', async (req, res) => {
    const { symbol } = req.query;
    const FUNCTION = 'TIME_SERIES_DAILY';

    if (!symbol) {
        return res.status(400).send("Symbol is required");
    }
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: FUNCTION,
                symbol,
                apikey: API_KEY_YEAR,
            },
        });
    
        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(500).send("No data received from Alpha Vantage");
        }
    
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching stock data");
    }
    
});


//For month 
app.get('/api/stock-data/month', async (req, res) => {
    const { symbol } = req.query;
    const FUNCTION = 'TIME_SERIES_DAILY';

    if (!symbol) {
        return res.status(400).send("Symbol is required");
    }
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: FUNCTION,
                symbol,
                apikey: API_KEY_MONTH,
            },
        });
    
        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(500).send("No data received from Alpha Vantage");
        }
    
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching stock data");
    }
    
});


//For week
app.get('/api/stock-data/week', async (req, res) => {
    const { symbol } = req.query;
    const FUNCTION = 'TIME_SERIES_INTRADAY';
    const interval='30min';
    if (!symbol) {
        return res.status(400).send("Symbol is required");
    }
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: FUNCTION,
                symbol,
                apikey: API_KEY_WEEK,
                interval:interval,
            },
        });
    
        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(500).send("No data received from Alpha Vantage");
        }
    
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching stock data");
    }
    
});

//For day
app.get('/api/stock-data/day', async (req, res) => {
    const { symbol } = req.query;
    const FUNCTION = 'TIME_SERIES_INTRADAY';
    const interval='5min';
    if (!symbol) {
        return res.status(400).send("Symbol is required");
    }
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: FUNCTION,
                symbol,
                apikey: API_KEY_DAY,
                interval:interval,
            },
        });
    
        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(500).send("No data received from Alpha Vantage");
        }
    
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching stock data");
    }
    
});

//For overview 
app.get('/api/stock-data/overview', async (req, res) => {
    const { symbol } = req.query;
    const FUNCTION = 'OVERVIEW';

    if (!symbol) {
        return res.status(400).send("Symbol is required");
    }
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: FUNCTION,
                symbol,
                apikey: API_KEY_OVERVIEW,
            },
        });
    
        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(500).send("No data received from Alpha Vantage");
        }
    
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching stock data");
    }
    
});


//For liveprice 
app.get('/api/stock-data/liveprice', async (req, res) => {
    const { symbol } = req.query;
    const FUNCTION = 'GLOBAL_QUOTE';

    if (!symbol) {
        return res.status(400).send("Symbol is required");
    }
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: FUNCTION,
                symbol,
                apikey: API_KEY_LIVEPRICE,
            },
        });
    
        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(500).send("No data received from Alpha Vantage");
        }
    
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching stock data");
    }
    
});


//For analytics 
app.get('/api/stock-data/analytics', async (req, res) => {
    const { symbol } = req.query;
    const FUNCTION = 'OVERVIEW';

    if (!symbol) {
        return res.status(400).send("Symbol is required");
    }
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: FUNCTION,
                symbol,
                apikey: API_KEY_ANALYTICS,
            },
        });
    
        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(500).send("No data received from Alpha Vantage");
        }
    
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching stock data");
    }
    
});



//For fundamentals 
app.get('/api/stock-data/fundamentals', async (req, res) => {
    const { symbol } = req.query;
    const FUNCTION = 'OVERVIEW';

    if (!symbol) {
        return res.status(400).send("Symbol is required");
    }
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: FUNCTION,
                symbol,
                apikey: API_KEY_FUNDAMENTALS,
            },
        });
    
        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(500).send("No data received from Alpha Vantage");
        }
    
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching stock data");
    }
    
});



//For BASIC DETAILS 
app.get('/api/stock-data/basics', async (req, res) => {
    const { symbol } = req.query;
    const FUNCTION = 'GLOBAL_QUOTE';

    if (!symbol) {
        return res.status(400).send("Symbol is required");
    }
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: FUNCTION,
                symbol,
                apikey: API_KEY_BASICS,
            },
        });
    
        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(500).send("No data received from Alpha Vantage");
        }
    
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching stock data");
    }
    
});


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
    });
}


app.listen(PORT, () => {
    console.log('Server is running on port 8000');
});
