import Sequelize from "sequelize";
import sequelizeConnection from "../config/sequelize";

const User = sequelizeConnection.define('user', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

export default User;