import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import CountryInterface from '../src/interfaces/CountryInterface';
import City from './city';

interface CountryCreationAttributes extends Optional<CountryInterface, 'id'> { }

class Country extends Model<CountryInterface, CountryCreationAttributes> implements CountryInterface {
  declare id: number;
  declare name: string;
  declare code: string;
  declare image: string;
  declare description?: Text | undefined;
  declare updated_at_description?: Date | undefined;
  declare readonly created_at?: Date | undefined;
  declare updated_at?: Date | undefined;

  get getDescription(): Text | null {
    const value = this.getDataValue('description');
    return value as Text;
  }

  set setDescription(value: Text) {
    if (value.length > 3000) {
      throw new Error('Description is too long');
    }
    this.setDataValue('description', value);
  }
}

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      get() {
        const value = this.getDataValue('id');
        return value ? value : null;
      },
      set(value: number) {
        this.setDataValue('id', value);
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        const value = this.getDataValue('name');
        return value ? value : null;
      },
      set(value: string) {
        this.setDataValue('name', value);
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        const value = this.getDataValue('code');
        return value ? value : null;
      },
      set(value: string) {
        this.setDataValue('code', value);
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      get() {
        const value = this.getDataValue('image');
        return value ? value : null;
      },
      set(value: string) {
        this.setDataValue('image', value);
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
      get() {
        const value = this.getDataValue('description');
        return value ? value : null;
      },
      set(value: Text) {
        this.setDataValue('description', value);
      }
    },
    updated_at_description: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const value = this.getDataValue('updated_at_description');
        return value ? value : null;
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const value = this.getDataValue('created_at');
        return value ? value : null;
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const value = this.getDataValue('updated_at');
        return value ? value : null;
      }
    }
  },
  {
    sequelize: connection,
    underscored: true,
    timestamps: false,
    modelName: 'country'
  }
);

Country.hasMany(City, {
  foreignKey: 'country',
  as: 'ctry'
});

City.belongsTo(Country, {
  foreignKey: 'country',
  as: 'ctry'
});

export default Country;
