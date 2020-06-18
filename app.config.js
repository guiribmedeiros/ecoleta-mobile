import dotenv from 'dotenv';

dotenv.config();

export default {
    // All values in extra will be passed to the app.
    extra: {
        apiHost: process.env.REACT_NATIVE_API_HOST || 'http://localhost:8000',
    },
};
