import Sequelize from "sequelize";
import sequelizeConnection from "../config/sequelize";

const Spin = sequelizeConnection.define('spin', {
    spin: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    result:{
        type:Sequelize.STRING,
        allowNull:false
    },
    creditsWon:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    cheatApplied:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  export default Spin;