import bgMainDesktop from './assets/images/bg-main-desktop.png';
import bgMainMobile from './assets/images/bg-main-mobile.png';
import cardFront from './assets/images/bg-card-front.png';
import cardBack from './assets/images/bg-card-back.png';
import cardLogo from './assets/images/card-logo.svg';
import favicon from './assets/images/favicon-32x32.png';
import iconComplete from './assets/images/icon-complete.svg';

function App() {

  return (

    <div className='flex h-screen'>
      
      <div className='relative w-1/2 overflow-hidden'>
        <img src={bgMainDesktop} className='absolute inset-0 h-full object-cover'/>

        {/* Tarjetas */}
        <div className='relative h-full flex flex-col justify-center items-start px-16 gap-6'>

          {/* Imagen trasera */}
          <div className='relative top-25 left-50 z-0'>
            <img src={cardBack} className='w-[450px]'/>
          </div>

          {/* Imagen delantera */}
          <div className='absolute top-37 left-40 z-10'>
            <img src={cardFront} className='w-[450px]'/>
          </div>

          {/* Logo */}
          <div className='absolute top-45 left-49 z-20'>
            <img src={cardLogo} className='w-[90px]'/>
          </div>
        </div>
      </div> 

      <div className='w-1/2 flex items-center'>
        <form className="w-full max-w-md">
          <div className="flex flex-col">

            <label className='tracking-wider mb-2'>CARDHOLDER NAME</label>
            <input type="text" className="mb-6 text-lg"/>

            <label className='tracking-wider mb-2'>CARD NUMBER</label>
            <input type="text" className="mb-6 text-lg"/>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 tracking-wider">EXP. DATE (MM/YY)</label>
                <div className='flex gap-2'>
                  <input type="text" className='w-full text-lg' placeholder='MM'/>
                  <input type="text" className='w-full text-lg' placeholder='YY'/>
                </div>
              </div>

              <div className="flex-1">
                <label className="block mb-2 tracking-wider">CVC</label>
                <input type="text" className='w-full text-lg' placeholder='e.g 123'/>
              </div>
            </div>

            <button className='bg-[#21092f] text-white rounded-md p-3 mt-5 cursor-pointer'>Confirm</button>
          </div>

        </form>
      </div>

    </div>
    
  )
}

export default App
