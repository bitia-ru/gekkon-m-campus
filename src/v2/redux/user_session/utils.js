export const currentUser = (state) => {
  if (state.userSessionV2?.user_id === null) {
    return null;
  }

  return state.userSessionV2?.user_id
    ? state.usersStoreV2.store[state.userSessionV2?.user_id]
    : undefined;
};

export const currentUser2 = (state) => {
  if (state.userSession.user_id === null) {
    return null;
  }

  return state.userSession.user_id
    ? state.usersStore.store[state.userSession.user_id]
    : undefined;
};
