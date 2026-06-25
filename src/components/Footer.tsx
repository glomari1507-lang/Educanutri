import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="mt-12 border-t-2 border-purple-100 bg-white pb-6 pt-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6 grid gap-6 sm:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center gap-2 font-['Fredoka_One'] text-xl text-purple-700">
              <span>🍎</span> EducaNutri
            </div>
            <p className="font-['Nunito'] text-xs font-semibold text-gray-500">
              Educação nutricional de forma divertida para crianças e adolescentes.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-['Fredoka_One'] text-base text-gray-700">Explore</h4>
            <ul className="space-y-1">
              {[
                { label: "Início", path: "/" },
                { label: "Sobre o Açúcar", path: "/sobre" },
                { label: "Nos Alimentos", path: "/alimentos" },
                { label: "Mitos & Verdades", path: "/mitos" },
                { label: "Quiz", path: "/quiz" },
              ].map((l) => (
                <li key={l.path}>
                  <button
                    onClick={() => navigate(l.path)}
                    className="font-['Nunito'] text-xs font-semibold text-gray-500 hover:text-purple-600"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-['Fredoka_One'] text-base text-gray-700">Saiba Mais</h4>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Nunito'] text-xs font-semibold text-gray-400 hover:text-purple-600 hover:underline"
                >
                  🌍 OMS – Organização Mundial da Saúde
                </a>
              </li>
              <li>
                <a
                  href="https://www.gov.br/saude"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Nunito'] text-xs font-semibold text-gray-400 hover:text-purple-600 hover:underline"
                >
                  🇧🇷 Ministério da Saúde do Brasil
                </a>
              </li>
              <li>
                <a
                  href="https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Nunito'] text-xs font-semibold text-gray-400 hover:text-purple-600 hover:underline"
                >
                  📚 Guia Alimentar Brasileiro
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 text-center">
          <p className="font-['Nunito'] text-xs font-semibold text-gray-400">
            🍎 EducaNutri – Feito com ❤️ para educar crianças e adolescentes sobre alimentação saudável.
          </p>
        </div>
      </div>
    </footer>
  );
}
