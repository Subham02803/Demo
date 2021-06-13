const InitState = {
  tableName: undefined,
  databaseName: undefined,
  message: undefined,
  jsonArray: [],
};

const displayDataReducer = (state = InitState, action, message) => {
  switch (action.type) {
    case "DISPLAY_DATA":
      return {
        ...state,
        jsonArray: action.jsonArray,
        databaseName: action.databaseName,
        tableName: action.tableName,
        message: action.message,
      };

    default:
      return state;
  }
};

export default displayDataReducer;
