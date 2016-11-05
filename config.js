var config = module.exports = {
	port : process.env.PORT || 80,
	church : {

		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		server: process.env.DB_HOST, // You can use 'localhost\\instance' to connect to named instance
		database: process.env.DB_NAME,
		port: process.env.DB_PORT
	}
};
