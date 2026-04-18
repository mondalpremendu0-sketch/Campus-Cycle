import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Context from '../components/Context';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  return (
    <>
      <Navbar />
      <main className="home-main">
        <Hero />
        <Context />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}

export default Home;
