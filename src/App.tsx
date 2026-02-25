import './App.css'
import {
    Navbar,
    Hero,
    Card,
    Timeline,
    Spacer,
    Cooldown,
    Location,
    Information,
    DressCode,
    Form,
     CustomerSupport, Carousel, Footer
} from "./components";
import image1 from "./assets/NataliaZhivko_0049.jpg";
import image2 from "./assets/NataliaZhivko_0045.jpg";
import image3 from "./assets/NataliaZhivko_0009.jpg";
import image4 from "./assets/NataliaZhivko_0154.jpg";
import image5 from "./assets/NataliaZhivko_0103.jpg";
import image6 from "./assets/NataliaZhivko_0126.jpg";
import image7 from "./assets/NataliaZhivko_140.jpg";
const images = [
    image1,
    image3,
    image2,
    image4,
    image5,
    image6,
    image7,
];

function App() {
  return (
      <>
              <Navbar />
              <Hero />
              <Card />
              <Spacer />
              <CustomerSupport />
              <Spacer />
              <Timeline />
              <Spacer />
              <Cooldown />
              <Spacer />
              <Location />
              <Spacer />
              <Information />
              <Spacer />
              <DressCode />
              <Spacer />
              <Form />
              <Spacer />
              <Carousel slides={images} />
              <Spacer />
              <Footer />
      </>
  )
}

export default App
