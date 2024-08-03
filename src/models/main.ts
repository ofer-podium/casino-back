import sequelizeConnection from "../config/sequelize";
// import User from "./user"; // Future implementation
import Session from "./session";
import Spin from "./spin";
import { Model, ModelStatic } from 'sequelize';


interface DB {
    // User: ModelStatic<Model>; // Future implementation
    Session: ModelStatic<Model>;
    Spin: ModelStatic<Model>;
}

sequelizeConnection
  .authenticate()
  .then(() => {
    console.log('RDS Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database', err);
  });

const db: DB = {
    // User, // Future implementation
    Session,
    Spin
};

// Session <> Spin One:Many
db.Session.hasMany(db.Spin, { foreignKey: { allowNull: false } });
db.Spin.belongsTo(db.Session, { foreignKey: { allowNull: false } });


export default db;