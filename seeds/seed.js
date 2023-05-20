const sequelize = require('../config/connection');
const { Blog } = require('../models/Blog');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: false });

    for (const blog of blogData) {
        await Blog.create({
            ...blog,
        });
    }

    process.exit(0);
};

seedDatabase();
