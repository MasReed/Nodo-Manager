import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

// Credit to Zurfyx:
// https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })

    return () => {
      unlisten()
    }
  }, [history])

  return (null)
}

export default withRouter(ScrollToTop)
