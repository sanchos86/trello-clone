export default (store) => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('board', JSON.stringify(state.board));
  });
};
