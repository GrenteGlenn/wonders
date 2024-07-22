import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import ResponseKindInterface from '../src/interfaces/ResponseKindInterface';

interface ResponseKindCreationAttributes extends Optional<ResponseKindInterface, 'id'> { }

class ResponseKind extends Model<ResponseKindInterface, ResponseKindCreationAttributes> implements ResponseKindInterface {
    declare id: number;
    declare type: string;
    declare readonly created_at?: Date;
    declare readonly updated_at?: Date;
}

ResponseKind.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: connection,
    underscored: true,
    modelName: 'ResponseKind',
    timestamps: false
});

export default ResponseKind;