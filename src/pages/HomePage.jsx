import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Hero from '../sections/Hero';
import Method from '../sections/Method';
import ProductReel from '../sections/ProductReel';
import ResultStrip from '../sections/ResultStrip';
import Work from '../sections/Work';

export default function HomePage() {
  return <><Header/><main><Hero/><ResultStrip/><ProductReel/><Work/><Method/><About/><Contact/></main><Footer/></>;
}
