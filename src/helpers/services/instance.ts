const getFetchInstanse = ({ endpoint }) => ({
  endpoint: `${process.env.REACT_APP_API_BASE_URL}${endpoint}`,
});

export { getFetchInstanse };
