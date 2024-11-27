import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import TagInterface from '../src/interfaces/TagInterface';

interface TagCreationAttributes extends Optional<TagInterface, 'id'> {}

class Tag extends Model<TagInterface, TagCreationAttributes> implements TagInterface {
  declare id: number;
  declare name: string;
  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.created_at;
    delete values.updated_at;
    return values;
  }
}

Tag.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Tag',
    timestamps: false
  }
);

export default Tag;
