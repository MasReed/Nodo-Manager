import { useSelector } from 'react-redux'

const AlertVisWrapper = ({ children }) => {
  const modalIsVisible = useSelector((state) => state.modalOpen)

  return modalIsVisible
    ? null
    : children
}

export default AlertVisWrapper
