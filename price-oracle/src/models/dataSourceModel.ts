import mongoose from "mongoose";

interface DataSource {
  name: string;
  url: string;
  type: string;
}

const dataSourceSchema = new mongoose.Schema<DataSource>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const DataSourceModel = mongoose.model<DataSource>(
  "DataSource",
  dataSourceSchema
);

export { DataSourceModel };
