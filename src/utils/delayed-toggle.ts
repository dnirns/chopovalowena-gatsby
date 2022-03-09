export const handleToggleModal = (toggleFunction: {
  toggleFunction: (boolean) => void
}): void => {
  setTimeout(() => {
    toggleFunction(!modalOpen)
  }, 10)
}
