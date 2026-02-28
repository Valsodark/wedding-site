import { useState } from 'react';
import './App.css';
import {
    Navbar, Hero, Card, Timeline, Spacer, Cooldown,
    Location, Information, DressCode, Form,
    CustomerSupport, Carousel, Footer
} from "./components";

// ... (Your image imports) ...
import image1 from "./assets/NataliaZhivko_0049.jpg";
import image2 from "./assets/NataliaZhivko_0045.jpg";
import image3 from "./assets/NataliaZhivko_0009.jpg";
import image4 from "./assets/NataliaZhivko_0154.jpg";
import image5 from "./assets/NataliaZhivko_0103.jpg";
import image6 from "./assets/NataliaZhivko_0126.jpg";
import image7 from "./assets/NataliaZhivko_140.jpg";

const images = [image1, image3, image2, image4, image5, image6, image7];

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            {/* --- INTERACTIVE LETTER OVERLAY --- */}
            <div className={`letter-overlay ${isOpen ? 'open' : ''}`}>

                <div className="letter-flap top"></div>

                <button className="wax-seal-button" onClick={handleOpen} aria-label="Open Invitation">
                    <div className="wax-seal-visual"></div>

                    {/* --- STATIONARY CIRCULAR TEXT --- */}
                    <div className="circular-text-wrapper">
                        <svg viewBox="0 0 200 200" className="circular-text-svg">

                            {/* Path Logic (Center 100,100 | Radius 75):
            1. Top Path: Starts Left (25,100), Arches UP, Ends Right (175,100).
            2. Bottom Path: Starts Left (25,100), Arches DOWN, Ends Right (175,100).

            Both paths go Left-to-Right, so text is never reversed.
        */}

                            <path id="textPathTop" d="M 25,100 A 75,75 0 1,1 175,100" fill="none" />
                            <path id="textPathBottom" d="M 25,100 A 75,75 0 0,0 175,100" fill="none" />

                            <text className="circle-text">
                                {/* Top Text: Pushed UP slightly (dy="-5") to sit above the line */}
                                <textPath href="#textPathTop" startOffset="50%" textAnchor="middle" dy="-5">
                                    Натисни тук
                                </textPath>
                            </text>

                            <text className="circle-text">
                                <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle" dy="1800">
                                    Покана за теб
                                </textPath>
                            </text>
                        </svg>
                    </div>

                </button>

                <div className="letter-flap bottom"></div>

            </div>

            {/* --- MAIN CONTENT --- */}
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
    );
}

export default App;