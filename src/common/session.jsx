export const storeInSession = (key, value) => {
  return sessionStorage.setItem(key, JSON.stringify(value));
};

export const lookInSession = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

export const removeFromSession = (key) => {
  return sessionStorage.removeItem(key);
};

export const flashSession = () => {
  sessionStorage.clear();
};
