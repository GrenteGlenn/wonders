import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import ResponseKindInterface from '../interfaces/ResponseKindInterface';

interface ResponseKindCreationAttributes extends Optional<ResponseKindInterface, 'id'> { }

class ResponseKind extends Model<ResponseKindInterface, ResponseKindCreationAttributes> implements ResponseKindInterface {
    declare id: number;
    declare name: string;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

ResponseKind.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
    modelName: 'ResponseKind',
    timestamps: true
});