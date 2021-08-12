import { useSelector } from 'react-redux'

const AlertVisWrapper = ({ children }) => {
  /*
    A wrapper component to hide or show children components if the modalOpen
    state is true or false, respectively.
  */
  const modalIsVisible = useSelector((state) => state.modalOpen)

  return modalIsVisible
    ? null
    : children
}

export default AlertVisWrapper
