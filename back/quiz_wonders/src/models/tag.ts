import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import TagInterface from '../interfaces/TagInterface' ;
import QuizLine from './quizline';

interface TagCreationAttributes extends Optional<TagInterface, 'id'> { }

class Tag extends Model<TagInterface, TagCreationAttributes> implements Tag {
    declare id: number;
    declare name: string;
    declare readonly created_at?: Date;
    declare readonly updated_at?: Date;
}

Tag.init({
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
    underscored: false,
    modelName: 'Tag',
    timestamps: true,
});

// Tag.hasMany(QuizLine, {
//     foreignKey: 'tag',
//     sourceKey: 'tag',
//     as: 'quiz_lines'
//   });

export default Tag;