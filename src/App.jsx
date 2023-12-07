import React, { useEffect, useRef, useState } from 'react';
import { ScreenCapture } from 'react-screen-capture';
import './App.scss'
import PopUp from './Component/popup';
import Image1 from '../src/assets/Images/image6.jpg'
import Image2 from '../src/assets/Images/image7.jpg'
import Image3 from '../src/assets/Images/image8.jpg'
import Image4 from '../src/assets/Images/image9.jpg'
import Image5 from '../src/assets/Images/image10.jpg'
import Image6 from '../src/assets/Images/image11.jpg'

const DomainData = [
  { img: Image1, about: "Digital Marketing Consulting", tittle: "Digital Marketing is continuously evolving and can be very confusing. It is critical to have a crisp, sorted-out, business-aligned strategy to get the maximum return on your investments.We put gether the right strategy, baseline, metrics, knowledge, techniques, and insights suitable to your business and industry." },
  { img: Image2, about: "Integrated Digital Marketing", tittle: "The whole is greater than the sum of its parts – Aristotle In the digital parlance, this is most relevant for integrated digital marketing. You need an end-to-end strategy using the suitable tools in the right order and quantity to get the best outcome for your business. Let us help you with this digital mix!" },
  { img: Image3, about: "Search Engine Optimization", tittle: "Search Engine Optimization (SEO) is about getting the right and optimized website structure, user-centric design, quality links, and citations. It needs multi-disciplinary skills to get-it-done, and we are right on top of the game." },
  { img: Image4, about: "Social Media Marketing", tittle: "Social media is an effective and efficient medium to interactively engage targeted users, and get your brand and marketing message across them. It needs careful planning, messaging and use of technology. We make it happen for you." },
  { img: Image5, about: "App Store Optimization", tittle: "It is critical to have a good App to be successful. However, it is important to do App Store Optimisation (ASO) across iTunes and Google Play Store to ensure that you get your due rankings. We help you get your rightful position in the app store rankings." },
  { img: Image6, about: "PPC Management", tittle: "We work tirelessly to squeeze out the best return on investment from paid search advertising for you through a holistic approach encompassing: keyword and competitive research landing page optimisation / conversion rate optimisation (CRO) appealing creatives" },

]


const App = () => {
  const openRef = useRef(null);
  const [screenCapture, setScreenCapture] = useState('');

  const HandleOpen = () => {
    openRef.current.open();
  }
  useEffect(() => {
    if (screenCapture) {
      HandleOpen()
    }
  }, [screenCapture])


  const closePopup = () => {
    openRef.current.close();
  }

  const handleScreenCapture = (capturedScreen) => {
    setScreenCapture(capturedScreen);
  };

  const handleSave = () => {
    const downloadLink = document.createElement('a');
    const fileName = 'capture.png';

    downloadLink.href = screenCapture;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <>
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (
          <div className='Screen_shot_container'>
            <button onClick={onStartCapture} className='capture'>Capture</button>
            <div className="card_container">
              {
                DomainData.map((item, key) => {
                  return (
                    <div className="card_Services" data-aos="slide-up" key={key}>
                      <figure className='Image_wrap'>
                        <img src={item.img} alt="" />
                      </figure>
                      <h2 className="tittle_heading">{item.about}</h2>
                      <p className="tittle_para">{item.tittle}</p>

                    </div>

                  )
                })
              }
            </div>

          </div>
        )}
      </ScreenCapture>
      <PopUp openpopup={openRef} handleSave={handleSave} onclose={closePopup} img={screenCapture} />
    </>
  );
};

export default App;
