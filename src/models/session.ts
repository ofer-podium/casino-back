import Sequelize from "sequelize";
import sequelizeConnection from "../config/sequelize";

const Session = sequelizeConnection.define('session', {
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    initialCredits:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    currentCredits:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    cashOutCredits:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    isActive:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

export default Session;

