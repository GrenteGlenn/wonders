import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import CountryInterface from '../src/interfaces/CountryInterface';
import City from './city';
import Language from './language';

interface CountryCreationAttributes extends Optional<CountryInterface, 'id'> { }

class Country extends Model<CountryInterface, CountryCreationAttributes> implements CountryInterface {
  declare id: number;
  declare name: string;
  declare code: string;
  declare image: string;
  declare description?: string;
  declare language: number;
  declare longitude: number;
  declare latitude: number;
  declare updated_at_description?: Date | undefined;
  declare readonly created_at?: Date | undefined;
  declare updated_at?: Date | undefined;

  get getDescription(): string | null {
    const value = this.getDataValue('description');
    return value ?? null;
  }

  set setDescription(value: string) {
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
      set(value: string) {
        this.setDataValue('description', value);
      }
    },    
    language: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      get() {
        const value = this.getDataValue('language');
        return value ? value : null;
      },
      set(value: number) {
        this.setDataValue('language', value);
      }
    },
    longitude: {
      type: DataTypes.DOUBLE,
      get() {
        const value = this.getDataValue('longitude');
        return value ? value : null;
      },
      set(value: number) {
        this.setDataValue('longitude', value);
      }
    },
    latitude: {
      type: DataTypes.DOUBLE,
      get() {
        const value = this.getDataValue('latitude');
        return value ? value : null;
      },
      set(value: number) {
        this.setDataValue('latitude', value);
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

Country.belongsTo(Language, {
  foreignKey: 'language',
  as: 'lang'
});

Country.hasMany(City, {
  foreignKey: 'country_id',
  as: 'country'
});

City.belongsTo(Country, {
  foreignKey: 'country_id',
  as: 'country'
});

export default Country;
