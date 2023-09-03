export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('myAppData', serializedState);
    } catch (err) {
      console.error(err);
    }
  };
  
  export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('myAppData');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };