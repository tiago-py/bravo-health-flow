import { Link } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
const BlogPage = () => {
  const blogPosts = [{
    id: 1,
    slug: 'queda-capilar-causas-e-solucoes',
    title: 'Queda Capilar: Causas e Soluções',
    excerpt: 'Entenda as causas da queda de cabelo em homens e quais os tratamentos mais eficazes disponíveis atualmente.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70',
    date: '10 de abril de 2023'
  }, {
    id: 2,
    slug: 'disfuncao-eretil-desmistificando-tabus',
    title: 'Disfunção Erétil: Desmistificando Tabus',
    excerpt: 'Conversamos com especialistas sobre este problema comum que afeta milhões de homens e como tratá-lo adequadamente.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
    date: '22 de março de 2023'
  }, {
    id: 3,
    slug: 'saude-masculina-check-ups-importantes',
    title: 'Saúde Masculina: Check-ups Importantes',
    excerpt: 'Exames e consultas periódicas que todo homem deve realizar para manter a saúde em dia e prevenir problemas futuros.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118',
    date: '15 de fevereiro de 2023'
  }, {
    id: 4,
    slug: 'estresse-e-queda-capilar',
    title: 'A Relação Entre Estresse e Queda Capilar',
    excerpt: 'Como o estresse do dia a dia pode afetar a saúde dos seus cabelos e quais estratégias adotar para minimizar seus efeitos.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136',
    date: '5 de janeiro de 2023'
  }];
  return <PublicLayout>
      <section className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-bravo-blue mb-4">Blog Bravo</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Artigos e dicas sobre saúde masculina, autocuidado e bem-estar escritos por especialistas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogPosts.map(post => <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{
            backgroundImage: `url(${post.image})`
          }} />
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <h2 className="text-xl font-semibold text-bravo-blue mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-4">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline" className="btn-outline">
                    Ler artigo <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>
            </div>)}
        </div>
      </section>

      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-bravo-blue mb-4">
              Quer começar seu tratamento personalizado?
            </h2>
            <p className="text-gray-700 mb-6">
              Responda algumas perguntas simples e receba um plano de tratamento desenvolvido especificamente para você.
            </p>
            <Link to="/anamnese/queda-capilar">
              <Button>
                Começar avaliação <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>;
};
export default BlogPage;