import Sequelize from "sequelize";
import sequelizeConnection from "../config/sequelize";

const Session = sequelizeConnection.define('session', {
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
    isActive:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

export default Session;

