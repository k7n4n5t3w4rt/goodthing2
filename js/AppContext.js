//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { h, render, createContext } from "preact";
import { useReducer, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import Router from "preact-router";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import globalReducer from "./globalReducer.js";

// A context for the state global management
const AppContext = createContext([{}, () => {}]);

/**
 * @typedef {Object} Props
 * @property {import('preact').ComponentChildren} children
 */

/**
 * @param {Props} props
 */
const AppProvider = (props) => {
  const fullGlobalStateArray = {};
  const [state, dispatch] = useReducer(globalReducer, fullGlobalStateArray);

  useEffect(() => {
    const updateComponentState = () => {};
    updateComponentState();
  }, []);

  return html`
      <${AppContext.Provider} value=${[state, dispatch]}>
				${props.children}
      </${AppContext.Provider}>
  `;
};

export { AppContext, AppProvider };
