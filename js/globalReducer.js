/**
 * Global reducer handling simple key/value SET actions.
 * @param {Object} state
 * @param {{ type: 'SET', payload: { key: string, value: any } }} action
 * @returns {Object}
 */
const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    default:
      return state;
  }
};

export default globalReducer;
