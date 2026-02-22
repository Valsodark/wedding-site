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
    CustomerSupport, Gallery, IntroVideo
} from "./components";
import {useState} from "react";

function App() {
    const [introFinished, setIntroFinished] = useState(false);
  return (
      <>
          {!introFinished && (
              <IntroVideo onFinish={() => setIntroFinished(true)} />
          )}
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
              <Gallery />
              <Spacer />
      </>
  )
}

export default App
