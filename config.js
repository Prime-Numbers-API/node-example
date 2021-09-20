module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    apiKey: process.env.apiKey || '',
    CLIENT_ORIGIN: '*',
    PGSSLMODE: "require",
    api_base_url: "http://localhost:8000"
}