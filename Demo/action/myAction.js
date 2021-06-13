export const displayData = (jsonArray, databaseName, tableName, message) => ({
  type: "DISPLAY_DATA",
  jsonArray: jsonArray,
  databaseName: databaseName,
  tableName: tableName,
  message: message,
});
