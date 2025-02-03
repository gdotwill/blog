import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://blog-backend-seven-rust.vercel.app/api' : 'http://localhost:3000/api';

export default axios.create({
    baseURL,
});
