import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import ResultActivityInterface from '../interfaces/ResultActivityInterface';

interface ResultActivityCreationAttributes extends Optional<ResultActivityInterface, 'id'> { }

class ResultActivity extends Model<ResultActivityInterface, ResultActivityCreationAttributes> implements ResultActivityInterface {
    declare step: number;
    declare id: number;
    declare activityId: number;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

ResultActivity.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    step: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: connection,
    underscored: false,
    modelName: 'ResultActivity',
    timestamps: true
});