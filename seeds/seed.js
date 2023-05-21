const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const blogData = require('./blogData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const user = await User.bulkCreate(userData, {
        individualHooks: true, 
        returning: true
    })
    const blog = await Blog.bulkCreate(blogData)
    process.exit(0);
};

seedDatabase();