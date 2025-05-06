
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  // Mock blog post data - in a real app this would come from an API or CMS
  const blogPosts = {
    'queda-capilar-causas-e-solucoes': {
      title: 'Queda Capilar: Causas e Soluções',
      date: '10 de abril de 2023',
      author: 'Dr. Ricardo Mendes',
      heroImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70',
      content: `
        <p class="mb-4">A queda de cabelo, ou alopecia, é uma condição comum que afeta milhões de homens em todo o mundo. Embora seja frequentemente associada ao envelhecimento, existem diversos fatores que podem contribuir para a queda capilar em qualquer idade.</p>
        
        <h2 class="text-xl font-semibold text-bravo-blue mt-6 mb-3">Principais Causas da Queda Capilar</h2>
        
        <p class="mb-4">A causa mais comum da calvície masculina é a alopecia androgenética, uma condição genética que afeta até 70% dos homens ao longo da vida. Nesta condição, os folículos capilares são sensíveis à di-hidrotestosterona (DHT), uma forma de testosterona que contribui para o encurtamento da fase de crescimento do cabelo.</p>
        
        <p class="mb-4">Outras causas comuns incluem:</p>
        
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Estresse físico ou emocional</li>
          <li>Deficiências nutricionais</li>
          <li>Medicamentos e tratamentos médicos</li>
          <li>Doenças autoimunes</li>
          <li>Alterações hormonais</li>
          <li>Infecções do couro cabeludo</li>
        </ul>
        
        <h2 class="text-xl font-semibold text-bravo-blue mt-6 mb-3">Soluções Eficazes e Baseadas em Evidências</h2>
        
        <p class="mb-4">Felizmente, existem tratamentos eficazes e cientificamente comprovados para combater a queda capilar. Os dois medicamentos mais estudados e com melhores resultados são:</p>
        
        <h3 class="text-lg font-medium text-bravo-blue mt-4 mb-2">Minoxidil</h3>
        <p class="mb-4">O minoxidil é um vasodilatador de uso tópico que estimula o folículo capilar, prolonga a fase de crescimento do cabelo e aumenta o fluxo sanguíneo para o couro cabeludo. Estudos demonstraram que o uso regular de minoxidil pode reduzir significativamente a queda e promover o crescimento de novos fios em até 60% dos usuários.</p>
        
        <h3 class="text-lg font-medium text-bravo-blue mt-4 mb-2">Finasterida</h3>
        <p class="mb-4">A finasterida é um medicamento oral que atua bloqueando a conversão de testosterona em DHT, reduzindo assim os níveis desta hormona no couro cabeludo. Ensaios clínicos mostraram que a finasterida pode diminuir a queda capilar em até 90% dos homens e estimular novo crescimento em aproximadamente 65% dos casos.</p>
        
        <h2 class="text-xl font-semibold text-bravo-blue mt-6 mb-3">A Importância do Tratamento Personalizado</h2>
        
        <p class="mb-4">Cada homem é único, assim como o padrão de sua queda capilar. Um tratamento eficaz deve considerar fatores como idade, histórico médico, padrão de calvície, estilo de vida e objetivos pessoais.</p>
        
        <h2 class="text-xl font-semibold text-bravo-blue mt-6 mb-3">Conclusão</h2>
        
        <p class="mb-4">A queda capilar é um problema tratável na grande maioria dos casos. Quanto mais cedo o tratamento for iniciado, melhores serão os resultados. Se você está enfrentando problemas de queda capilar, saiba que não está sozinho e que existem soluções eficazes à sua disposição.</p>
      `,
      relatedPosts: ['disfuncao-eretil-desmistificando-tabus', 'estresse-e-queda-capilar']
    },
    'disfuncao-eretil-desmistificando-tabus': {
      title: 'Disfunção Erétil: Desmistificando Tabus',
      date: '22 de março de 2023',
      author: 'Dr. André Costa',
      heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
      content: `
        <p class="mb-4">A disfunção erétil (DE) é uma condição que afeta milhões de homens em todo o mundo, mas ainda é cercada por tabus e desinformação. Neste artigo, conversamos com especialistas para desmistificar este problema comum e discutir as abordagens de tratamento mais eficazes disponíveis atualmente.</p>
        
        <h2 class="text-xl font-semibold text-bravo-blue mt-6 mb-3">Entendendo a Disfunção Erétil</h2>
        
        <p class="mb-4">A disfunção erétil é definida como a incapacidade persistente de obter ou manter uma ereção suficiente para um desempenho sexual satisfatório. É importante entender que episódios ocasionais de dificuldade erétil são normais e não indicam necessariamente um problema médico. No entanto, quando o problema se torna recorrente, pode ter causas físicas, psicológicas ou uma combinação de ambas.</p>
        
        <h2 class="text-xl font-semibold text-bravo-blue mt-6 mb-3">Causas Comuns</h2>
        
        <p class="mb-4">A DE pode ser causada por diversos fatores:</p>
        
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Fatores físicos:</strong> Doenças cardiovasculares, diabetes, obesidade, hipertensão, colesterol alto, problemas hormonais e efeitos colaterais de medicamentos.</li>
          <li><strong>Fatores psicológicos:</strong> Ansiedade de desempenho, estresse, depressão, problemas relacionais e traumas passados.</li>
          <li><strong>Fatores de estilo de vida:</strong> Tabagismo, consumo excessivo de álcool, uso de drogas recreativas, sedentarismo e distúrbios do sono.</li>
        </ul>
        
        <h2 class="text-xl font-semibold text-bravo-blue mt-6 mb-3">Tratamentos Eficazes</h2>
        
        <p class="mb-4">Felizmente, existem tratamentos seguros e eficazes para a grande maioria dos homens com disfunção erétil:</p>
        
        <h3 class="text-lg font-medium text-bravo-blue mt-4 mb-2">Medicamentos Orais</h3>
        <p class="mb-4">Os medicamentos como sildenafila, tadalafila e vardenafila são a primeira linha de tratamento para a DE. Eles funcionam aumentando o fluxo sanguíneo para o pênis, facilitando e mantendo a ereção.</p>
      `,
      relatedPosts: ['queda-capilar-causas-e-solucoes', 'saude-masculina-check-ups-importantes']
    },
    'saude-masculina-check-ups-importantes': {
      title: 'Saúde Masculina: Check-ups Importantes',
      date: '15 de fevereiro de 2023',
      author: 'Dra. Carla Ribeiro',
      heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118',
      content: '<p>Conteúdo do artigo sobre check-ups importantes para a saúde masculina...</p>',
      relatedPosts: ['queda-capilar-causas-e-solucoes', 'disfuncao-eretil-desmistificando-tabus']
    },
    'estresse-e-queda-capilar': {
      title: 'A Relação Entre Estresse e Queda Capilar',
      date: '5 de janeiro de 2023',
      author: 'Dr. Paulo Menezes',
      heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136',
      content: '<p>Conteúdo do artigo sobre estresse e queda capilar...</p>',
      relatedPosts: ['queda-capilar-causas-e-solucoes', 'saude-masculina-check-ups-importantes']
    }
  };
  
  // Get the post data or show a fallback
  const post = slug && slug in blogPosts 
    ? blogPosts[slug as keyof typeof blogPosts] 
    : {
        title: 'Artigo não encontrado',
        date: '',
        author: '',
        heroImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
        content: '<p>O artigo que você está procurando não foi encontrado.</p>',
        relatedPosts: []
      };

  // Get related posts
  const related = post.relatedPosts?.map(slug => 
    blogPosts[slug as keyof typeof blogPosts]
      ? {
          slug,
          title: blogPosts[slug as keyof typeof blogPosts].title,
          excerpt: blogPosts[slug as keyof typeof blogPosts].content.substring(0, 120) + '...'
        }
      : null
  ).filter(Boolean) || [];

  return (
    <PublicLayout>
      <article className="max-w-3xl mx-auto px-4 py-6 md:py-12">
        {/* Back button */}
        <Link to="/blog" className="inline-flex items-center text-bravo-blue mb-6">
          <ArrowLeft size={16} className="mr-1" />
          <span>Voltar para o blog</span>
        </Link>
        
        {/* Post header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-bravo-blue mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>{post.date}</span>
            {post.author && (
              <>
                <span className="mx-2">•</span>
                <span>Por {post.author}</span>
              </>
            )}
          </div>
        </header>
        
        {/* Featured image */}
        <div 
          className="h-64 md:h-80 bg-cover bg-center rounded-lg mb-8"
          style={{ backgroundImage: `url(${post.heroImage})` }}
        />
        
        {/* Post content */}
        <div 
          className="prose max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* CTA section */}
        <div className="bg-bravo-beige p-6 rounded-lg mb-12">
          <h3 className="text-xl font-semibold text-bravo-blue mb-3">
            Quer começar seu tratamento personalizado?
          </h3>
          <p className="text-gray-700 mb-4">
            Responda algumas perguntas simples e receba um plano de tratamento desenvolvido especificamente para você.
          </p>
          <Link to="/anamnese/queda-capilar">
            <Button>
              Começar avaliação <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
        
        {/* Related posts */}
        {related.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-bravo-blue mb-4">
              Artigos Relacionados
            </h3>
            <div className="space-y-4">
              {related.map((relPost, index) => (
                <div key={index} className="p-4 border border-gray-100 rounded-lg">
                  <h4 className="text-lg font-medium text-bravo-blue mb-2">
                    {relPost.title}
                  </h4>
                  <div className="mb-3 text-gray-600 text-sm">
                    {relPost.excerpt}
                  </div>
                  <Link 
                    to={`/blog/${relPost.slug}`} 
                    className="text-bravo-blue font-medium hover:underline inline-flex items-center"
                  >
                    Ler artigo
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </PublicLayout>
  );
};

export default BlogPostPage;
