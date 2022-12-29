function getVarsFor(page) {
  switch (page) {
    case 'home':
      return {
        idx: null,
        userType: 'founder',
        showFooterVisual: true,
        usePeekaboo: true,
        usePopCta: true,
        useModal: false,
      };
    default:
      return {
        idx: null,
        userType: 'founder',
        showFooterVisual: true,
        usePeekaboo: false,
        usePopCta: true,
        useModal: false,
      };
  }
}

export default getVarsFor;
