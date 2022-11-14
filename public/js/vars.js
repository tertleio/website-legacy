function getVarsFor(page) {
  switch (page) {
    case 'home':
      return {
        idx: null,
        userType: 'founder',
        showFooterVisual: false,
        usePeekaboo: true,
        usePopCta: true,
        useModal: false,
      };
    default:
      return {
        idx: null,
        userType: 'founder',
        showFooterVisual: false,
        usePeekaboo: false,
        usePopCta: true,
        useModal: false,
      };
  }
}

export default getVarsFor;
