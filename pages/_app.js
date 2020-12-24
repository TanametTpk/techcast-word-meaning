import '../styles/globals.css'
import ReactGA from 'react-ga'

const trackingId = "UA-150820819-2"
ReactGA.initialize(trackingId, { debug: true })

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
