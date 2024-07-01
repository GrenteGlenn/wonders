import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import ResultCityInterface from '../interfaces/ResultCityInterface';


interface ResultCityCreationAttributes extends Optional<ResultCityInterface, 'id'>  { }

class ResultCity extends Model<ResultCityInterface, ResultCityCreationAttributes> implements ResultCityInterface {
    declare id: number;
    declare step: number;
    declare startAt: Date;
    declare endAt: Date;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

ResultCity.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    step: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: connection,
    underscored: false,
    modelName: 'ResultCity',
    timestamps: true
});