import { DataSourceModel } from "../models/dataSourceModel";

/**
 * Adds a new data source.
 * @param {string} name Name of the data source.
 * @param {string} url URL of the data source.
 * @param {string} type Type of the data source.
 * @returns {Promise<void>}
 */
const addDataSource = async (
  name: string,
  url: string,
  type: string
): Promise<void> => {
  try {
    const dataSource = new DataSourceModel({ name, url, type });
    await dataSource.save();
    console.log(`Data source ${name} added successfully.`);
  } catch (error) {
    console.error(`Error adding data source ${name}:`, error);
    throw error;
  }
};

/**
 * Updates a data source.
 * @param {string} name Name of the data source.
 * @param {string} url URL of the data source.
 * @returns {Promise<void>}
 */
const updateDataSource = async (name: string, url: string): Promise<void> => {
  try {
    const result = await DataSourceModel.updateOne({ name }, { $set: { url } });
    if (result.modifiedCount === 0) {
      throw new Error(`Data source ${name} not found for update.`);
    }
    console.log(`Data source ${name} updated successfully.`);
  } catch (error) {
    console.error(`Error updating data source ${name}:`, error);
    throw error;
  }
};

/**
 * Deletes a data source.
 * @param {string} name Name of the data source.
 * @returns {Promise<void>}
 */
const deleteDataSource = async (name: string): Promise<void> => {
  try {
    const result = await DataSourceModel.deleteOne({ name });
    if (result.deletedCount === 0) {
      throw new Error(`Data source ${name} not found for deletion.`);
    }
    console.log(`Data source ${name} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting data source ${name}:`, error);
    throw error;
  }
};

export { addDataSource, updateDataSource, deleteDataSource };
