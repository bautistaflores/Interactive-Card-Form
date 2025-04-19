import { useForm } from "react-hook-form";

import bgMainDesktop from './assets/images/bg-main-desktop.png';
import bgMainMobile from './assets/images/bg-main-mobile.png';
import cardFront from './assets/images/bg-card-front.png';
import cardBack from './assets/images/bg-card-back.png';
import cardLogo from './assets/images/card-logo.svg';
import favicon from './assets/images/favicon-32x32.png';
import iconComplete from './assets/images/icon-complete.svg';


function App() {

  const { 
    register, 
    handleSubmit, 
    setValue,
    watch,
    formState: { errors } 
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")        // Elimina todo lo que no sea número
      .slice(0, 16)         // Limita a 16 dígitos
      .replace(/(.{4})/g, "$1 ") // Inserta espacio cada 4 números
      .trim();                   // Elimina espacio al final
  };

  return (

    <div className='flex h-screen'>
      
      {/* Imagenes */}
      <div className='relative w-1/2 overflow-hidden'>
        <img src={bgMainDesktop} className='absolute inset-0 h-full object-cover'/>

        {/* Tarjetas */}
        <div className='relative h-full flex flex-col justify-center items-start px-16 gap-6'>

          {/* Imagen trasera */}
          <div className='relative top-25 left-50 z-0'>
            <img src={cardBack} className='w-[450px]'/>

            <div className="absolute top-27 left-90 text-white text-lg">
              {watch("cvc") || "000"}
            </div>
          </div>

          {/* Imagen delantera */}
          <div className='absolute top-37 left-40 z-10'>
            <img src={cardFront} className='w-[450px]'/>

            <div className="absolute top-39 left-12 text-white text-3xl">
              {watch("cardNumber") || "0000 0000 0000 0000"}
            </div>

            <div className="absolute top-51 left-12 text-white text-md">
              {watch("cardholderName") || "CARDHOLDER NAME"}
            </div>

            <div className="absolute top-51 left-90 text-white text-md">
              {watch("expMonth") || "00"}/{watch("expYear") || "00"}
            </div>

          </div>

          {/* Logo */}
          <div className='absolute top-45 left-49 z-20'>
            <img src={cardLogo} className='w-[90px]'/>
          </div>
        </div>
      </div> 

      {/* Formulario */}
      <div className='w-1/2 flex items-center'>
        <form 
          className="w-full max-w-md" 
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="flex flex-col">
            {/* CARDHOLDER NAME */}
            <label className='tracking-wider mb-2'>CARDHOLDER NAME</label>
            <input 
              type="text"
              {...register("cardholderName", { required: "Name is required" })}
              className={`text-lg; ${errors.cardholderName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.cardholderName && <span className="text-red-500 mt-2">{errors.cardholderName.message}</span>}


            {/* CARD NUMBER */}
            <label className='tracking-wider mt-6 mb-2'>CARD NUMBER</label>
            <input 
              type="text" 
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              {...register("cardNumber", { 
                required: "Card number is required", 
                pattern: {
                  value: /^(\d{4} ){3}\d{4}$/,
                  message: "Invalid format"
                } 
              })}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                setValue("cardNumber", formatted); // Actualiza el valor en el form
              }}
              className={`text-lg tracking-{3} ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.cardNumber && <span className="text-red-500 mt-2">{errors.cardNumber.message}</span>}


            {/* MONTH AND CVC */}
            <div className="flex gap-4 mt-6">
              <div className="flex-1">
                <label className="block mb-2 tracking-wider">EXP. DATE (MM/YY)</label>
                <div className='flex gap-2'>
                  <input 
                    type="text" 
                    {...register("expMonth", {
                      required: "Month is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])$/,
                        message: "Invalid month"
                      }
                    })}
                    onChange={(e) => {
                      const formatted = e.target.value.replace(/\D/g, "").slice(0, 2);
                      setValue("expMonth", formatted); // Actualiza el valor en el form
                    }}
                    className='w-full text-lg' 
                    placeholder='MM'
                  />

                  <input 
                    type="text" 
                    {...register("expYear", {
                      required: "Year is required",
                      pattern: {
                        value: /^(2[5-9]|[3-9][0-9])$/ ,
                        message: "Invalid year"
                      }
                    })}
                    onChange={(e) => {
                      const formatted = e.target.value.replace(/\D/g, "").slice(0, 2);
                      setValue("expYear", formatted); // Actualiza el valor en el form
                    }}
                    className='w-full text-lg' 
                    placeholder='YY'
                  />
                </div>
                  {errors.expMonth && <span className="text-red-500 mt-2 block">{errors.expMonth.message}</span>}
                  {errors.expYear && <span className="text-red-500 mt-2">{errors.expYear.message}</span>}
                  
              </div>

              <div className="flex-1">
                <label className="block mb-2 tracking-wider">CVC</label>
                <input 
                  type="text" 
                    {...register("cvc", {
                      required: "CVC is required",
                      pattern: {
                        value: /^\d{3}$/,
                        message: "Invalid CVC"
                      }
                    })}
                  onChange={(e) => {
                    const formatted = e.target.value.replace(/\D/g, "").slice(0, 3);
                    setValue("cvc", formatted); // Actualiza el valor en el form
                  }}
                  className='w-full text-lg' 
                  placeholder='e.g 123'
                />
                {errors.cvc && <span className="text-red-500 mt-2 block">{errors.cvc.message}</span>}
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
