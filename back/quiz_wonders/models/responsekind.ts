import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import ResponseKindInterface from '../interfaces/ResponseKindInterface';

interface ResponseKindCreationAttributes extends Optional<ResponseKindInterface, 'id'> { }

class ResponseKind extends Model<ResponseKindInterface, ResponseKindCreationAttributes> implements ResponseKindInterface {
    declare id: number;
    declare type: string;
    declare readonly created_at?: Date;
    declare readonly updated_at?: Date;

    toJSON() {
        const values = Object.assign({}, this.get());
        delete values.created_at;
        delete values.updated_at;
        return values;
      }
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
    tableName: 'response_kinds',
    timestamps: false
});

export default ResponseKind;