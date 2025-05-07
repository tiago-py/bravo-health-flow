
const WhoWeAreSection = () => {
  return (
    <section className="py-16 bg-bravo-beige">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src="/lovable-uploads/d044e437-47ad-4611-971a-8c24c1e6ee7d.png" 
              alt="Equipe Bravo" 
              className="w-full rounded-lg shadow-md" 
            />
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-bravo-blue">
              Quem somos
            </h2>
            <p className="text-gray-700 mb-4">
              A Bravo nasce da visão de que homens modernos merecem cuidados de saúde 
              que combinam ciência, praticidade e discrição.
            </p>
            <p className="text-gray-700 mb-4">
              Nossa equipe multidisciplinar reúne médicos especialistas, farmacêuticos 
              e profissionais de saúde dedicados a oferecer soluções eficientes para 
              problemas reais.
            </p>
            <p className="text-gray-700">
              Acreditamos que cuidar da saúde é um ato de coragem e autoconhecimento. 
              Por isso, criamos um espaço seguro, livre de julgamentos e focado em 
              resultados comprovados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
