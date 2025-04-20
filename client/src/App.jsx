import { useForm } from "react-hook-form";
import { useState } from "react";

import bgMainDesktop from './assets/images/bg-main-desktop.png';
import bgMainMobile from './assets/images/bg-main-mobile.png';
import cardFront from './assets/images/bg-card-front.png';
import cardBack from './assets/images/bg-card-back.png';
import cardLogo from './assets/images/card-logo.svg';
import iconComplete from './assets/images/icon-complete.svg';


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { 
    register, 
    handleSubmit, 
    setValue,
    watch,
    formState: { errors } 
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
  }

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")        // Elimina todo lo que no sea número
      .slice(0, 16)         // Limita a 16 dígitos
      .replace(/(.{4})/g, "$1 ") // Inserta espacio cada 4 números
      .trim();                   // Elimina espacio al final
  };

  return (
    <div className='sm:flex min-h-screen'>
      
      {/* Imagenes */}
      <div className='relative sm:w-1/2 overflow-hidden'>
        <img src={bgMainMobile} className='block absolute sm:hidden w-full h-[300px] object-cover'/>
        <img src={bgMainDesktop} className='absolute inset-0 h-full object-cover hidden sm:block'/>


        {/* Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 relative">

          {/* Imagen trasera */}
          <div className="relative top-[15%] left-[26%] sm:top-[170%] sm:left-[55%]">
            <img src={cardBack} className="w-[65%] sm:w-full" />

            <div className="absolute top-[43%] left-[51%] sm:top-[44%] sm:left-[79%] text-white text-[3vw] sm:text-[0.95vw]">
              {watch("cvc") || "000"}
            </div>
          </div>

          {/* Imagen delantera */}
          <div className="relative top-[-28.5%] right-[-10%] sm:top-[50%] sm:right-[65%] w-[65%] sm:w-full">
            <img src={cardFront} className='w-full h-auto'/>

            {/* Logo */}
            <div className='absolute top-[12%] left-[4%] sm:left-[6%] w-[20%]'>
              <img src={cardLogo} className='w-full h-auto'/>
            </div>

            <div className="absolute top-[57%] sm:top-[60%] left-[6%] sm:left-[10%] text-white text-[4.6vw] sm:text-[1.75vw] whitespace-nowrap">
              {watch("cardNumber") || "0000 0000 0000 0000"}
            </div>

            <div className="absolute top-[79%] sm:top-[83%] left-[6%] sm:left-[10%] text-white text-[2.4vw] sm:text-[0.85vw]">
              {watch("cardholderName") || "CARDHOLDER NAME"}
            </div>

            <div className="absolute top-[79%] sm:top-[83%] left-[53%] sm:left-[80%] text-white text-[2.4vw] sm:text-[0.85vw]">
              {watch("expMonth") || "00"}/{watch("expYear") || "00"}
            </div>

          </div>
        </div>
      </div> 

      {/* Formulario */}
      <div className='sm:w-1/2 flex items-center justify-center sm:justify-start py-10 px-4'>
        <div className="w-full max-w-lg">

          {!isSubmitted ? (
          <form 
            className="w-full space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >

            <div className="flex flex-col">
              {/* CARDHOLDER NAME */}
              <label className='tracking-wider mb-2'>CARDHOLDER NAME</label>
              <input 
                type="text"
                {...register("cardholderName", { required: "Name is required" })}
                placeholder="e.g. Jane Doe"
                className={`text-lg ${errors.cardholderName ? 'border-red-500' : 'border-gray-300'}`}
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
                className={`text-lg ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
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
          ) : (
            <div className="flex flex-col items-center text-center p-10 scale-125">
              <img src={iconComplete} className="w-20 mb-8" />
              <h2 className="text-4xl tracking-widest mb-4">THANK YOU!</h2>
              <p className="text-gray-500 text-lg mb-8">We’ve added your card details</p>
              <button 
                onClick={() => setIsSubmitted(false)} 
                className='bg-[#21092f] text-white rounded-md p-3 w-2/3'
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    
  )
}


export default App
