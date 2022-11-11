function getVarsFor(page) {
  switch (page) {
    case 'home':
      return {
        idx: null,
        userType: 'founder',
        showFooterVisual: false,
        useModal: false,
      };
    default:
      return {
        idx: null,
        userType: 'founder',
        showFooterVisual: false,
        useModal: false,
      };
  }
}

export default getVarsFor;
