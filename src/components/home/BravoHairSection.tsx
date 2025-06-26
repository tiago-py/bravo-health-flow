
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


// /lovable-uploads/d33e3010-a4d3-4b53-a946-47d98363f585.png
const BravoHairSection = () => {
  return (
    <section className="container flex items-start font-sans ">
      <div className='w-4/5 flex flex-col items-center justify-between p-14 bg-bravo-beige rounded-xl'>
        <div className='text-center'>
          <h1 className='text-bravo-blue text-6xl font-semibold'>Bravo Hair</h1>
          <h3 className='text-xl font-semibold mt-2'>Tratamento completo contra queda de cabelo</h3>
        </div>
        <div>
          <img src="/lovable-uploads/d33e3010-a4d3-4b53-a946-47d98363f585.png" alt="" />
        </div>
        <div>
          <h4 className='text-xl font-semibold my-3'>Cabelo ralo, entradas aumentado ou calvície avançado ?</h4>
          <div className='flex md:flex-nowrap flex-wrap items-end md:justify-between justify-center'>
            <h5 className='font-light text-lg'>O bravo hair é um tratamento completo, aprovada por médicos, com
              fórmulas personalizadas para fortalecer o couro cabeludo, estimular o
              crescimento e previnir queda.
            </h5>
            <Button className='bg-bravo-blue md:mt-0 mt-3 hover:bg-bravo-dark px-10 py-7 rounded-2xl'>Quero recuperar meu cabelo</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BravoHairSection;
