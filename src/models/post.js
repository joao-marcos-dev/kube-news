const Sequelize = require('sequelize');

const DB_DATABASE = process.env.DB_DATABASE || "kubenews";
const DB_USERNAME = process.env.DB_USERNAME || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "Pg123";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5435;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT
});

class Post extends Sequelize.Model {

  save() {
    console.log('Entrou');
    return super.save();
  }
}

Post.init({
  title: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false, // Use allowNull instead of require for boolean values
  },
  summary: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  publishDate: {
    type: Sequelize.DataTypes.DATEONLY,
    allowNull: false,
  },
  content: {
    type: Sequelize.DataTypes.STRING(2000),
    allowNull: false,
  },
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'Post' // We need to choose the model name
});

exports.initDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

exports.Post = Post;
