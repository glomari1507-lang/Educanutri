export const quizQuestions = [
  // ======================== BEBIDAS E ALIMENTOS ========================
  {
    id: 1,
    category: "Bebidas",
    emoji: "🥤",
    difficulty: "Fácil",
    question: "Qual bebida costuma conter mais açúcar por porção?",
    options: [
      { id: "a", text: "Suco de laranja natural" },
      { id: "b", text: "Refrigerante comum" },
      { id: "c", text: "Água de coco" },
      { id: "d", text: "Leite integral" },
    ],
    correct: "b",
    explanation: "Uma lata de refrigerante pode conter cerca de 35 a 40 g de açúcar, o equivalente a aproximadamente 9 a 10 colheres de chá.",
  },
  {
    id: 2,
    category: "Alimentos",
    emoji: "🍅",
    difficulty: "Médio",
    question: "Qual alimento pode conter açúcar adicionado mesmo sem ter sabor doce?",
    options: [
      { id: "a", text: "Pão de forma industrializado" },
      { id: "b", text: "Ketchup" },
      { id: "c", text: "Queijo minas" },
      { id: "d", text: "Aveia em flocos" },
    ],
    correct: "b",
    explanation: "O ketchup costuma receber açúcar durante sua fabricação para equilibrar a acidez do tomate e realçar o sabor.",
  },
  {
    id: 4,
    category: "Alimentos",
    emoji: "🥛",
    difficulty: "Fácil",
    question: "Qual destas opções costuma ter MENOS açúcar adicionado?",
    options: [
      { id: "a", text: "Iogurte natural" },
      { id: "b", text: "Iogurte sabor morango" },
      { id: "c", text: "Bebida láctea sabor chocolate" },
      { id: "d", text: "Achocolatado pronto" },
    ],
    correct: "a",
    explanation: "O iogurte natural geralmente não recebe açúcar adicionado, ao contrário das versões saborizadas.",
  },
  {
    id: 7,
    category: "Alimentos",
    emoji: "🍪",
    difficulty: "Fácil",
    question: "Qual alimento costuma ser ultraprocessado?",
    options: [
      { id: "a", text: "Milho cozido" },
      { id: "b", text: "Biscoito recheado" },
      { id: "c", text: "Ovo cozido" },
      { id: "d", text: "Batata-doce assada" },
    ],
    correct: "b",
    explanation: "Biscoitos recheados passam por diversas etapas industriais e contêm ingredientes como açúcares, gorduras e aditivos.",
  },
  {
    id: 13,
    category: "Nutrição",
    emoji: "⚡",
    difficulty: "Médio",
    question: "Qual é a principal função do açúcar no organismo?",
    options: [
      { id: "a", text: "Fornecer energia" },
      { id: "b", text: "Fortalecer os ossos" },
      { id: "c", text: "Produzir vitaminas" },
      { id: "d", text: "Melhorar a digestão" },
    ],
    correct: "a",
    explanation: "O açúcar é um carboidrato que serve como fonte de energia para as células. O problema está no consumo em excesso, principalmente de açúcares adicionados.",
  },

  // ======================== RÓTULOS E INGREDIENTES ========================
  {
    id: 3,
    category: "Rótulos",
    emoji: "📋",
    difficulty: "Médio",
    question: "Ao comparar dois produtos semelhantes, qual informação ajuda mais a identificar o mais saudável?",
    options: [
      { id: "a", text: "A cor da embalagem" },
      { id: "b", text: "A lista de ingredientes e a tabela nutricional" },
      { id: "c", text: "O preço" },
      { id: "d", text: "O tamanho da embalagem" },
    ],
    correct: "b",
    explanation: "A lista de ingredientes mostra o que compõe o alimento, enquanto a tabela nutricional informa a quantidade de nutrientes, incluindo açúcares.",
  },
  {
    id: 5,
    category: "Rótulos",
    emoji: "🔍",
    difficulty: "Difícil",
    question: "O açúcar pode aparecer no rótulo com qual outro nome?",
    options: [
      { id: "a", text: "Maltodextrina" },
      { id: "b", text: "Sacarose" },
      { id: "c", text: "Caseína" },
      { id: "d", text: "Lecitina" },
    ],
    correct: "b",
    explanation: "Sacarose é o nome químico do açúcar de mesa e um dos termos mais comuns encontrados nos rótulos.",
  },
  {
    id: 6,
    category: "Rótulos",
    emoji: "📊",
    difficulty: "Médio",
    question: "O que significa um ingrediente aparecer em primeiro lugar na lista?",
    options: [
      { id: "a", text: "É o ingrediente mais caro." },
      { id: "b", text: "É o ingrediente presente em maior quantidade." },
      { id: "c", text: "Foi adicionado por último." },
      { id: "d", text: "É o ingrediente mais saudável." },
    ],
    correct: "b",
    explanation: "Os ingredientes são listados em ordem decrescente de quantidade. O primeiro é o que está presente em maior proporção.",
  },
  {
    id: 10,
    category: "Rótulos",
    emoji: "🏷️",
    difficulty: "Difícil",
    question: 'Um produto com a frase "sem adição de açúcar" significa que:',
    options: [
      { id: "a", text: "Não contém açúcar." },
      { id: "b", text: "Não recebeu açúcar durante a fabricação, mas pode conter açúcares naturais." },
      { id: "c", text: "Tem menos calorias." },
      { id: "d", text: "Pode ser consumido sem limites." },
    ],
    correct: "b",
    explanation: "Frutas e leite, por exemplo, possuem açúcares naturais, mesmo quando não há açúcar adicionado.",
  },
  {
    id: 17,
    category: "Rótulos",
    emoji: "🏷️",
    difficulty: "Difícil",
    question: 'Um alimento com a indicação "diet" é sempre livre de açúcar?',
    options: [
      { id: "a", text: "Sim, todo alimento diet não contém açúcar." },
      { id: "b", text: "Não, um alimento diet pode ser isento de outro nutriente, como sódio ou gordura." },
      { id: "c", text: "Sim, mas apenas quando é uma bebida." },
      { id: "d", text: "Não, porque alimentos diet sempre contêm mais açúcar." },
    ],
    correct: "b",
    explanation: 'O termo "diet" indica que o produto teve a retirada ou redução significativa de um nutriente específico, que pode ser o açúcar, mas também pode ser o sódio, a gordura ou outro componente.',
  },

  // ======================== SAÚDE E CORPO ========================
  {
    id: 11,
    category: "Saúde",
    emoji: "🦷",
    difficulty: "Fácil",
    question: "O consumo frequente de alimentos ricos em açúcar aumenta o risco de:",
    options: [
      { id: "a", text: "Anemia" },
      { id: "b", text: "Cárie dentária" },
      { id: "c", text: "Miopia" },
      { id: "d", text: "Alergia alimentar" },
    ],
    correct: "b",
    explanation: "As bactérias presentes na boca utilizam o açúcar como fonte de energia e produzem ácidos que desgastam o esmalte dos dentes. Quando o consumo de açúcar é frequente e a higiene bucal é inadequada, o risco de desenvolver cáries aumenta significativamente.",
  },
  {
    id: 12,
    category: "Saúde",
    emoji: "⚖️",
    difficulty: "Médio",
    question: "O consumo frequente de bebidas açucaradas está associado principalmente a:",
    options: [
      { id: "a", text: "Redução do risco de diabetes." },
      { id: "b", text: "Maior risco de obesidade e diabetes tipo 2." },
      { id: "c", text: "Melhora da memória." },
      { id: "d", text: "Fortalecimento dos ossos." },
    ],
    correct: "b",
    explanation: "O consumo excessivo de bebidas açucaradas aumenta a ingestão de calorias e está relacionado ao maior risco de obesidade, diabetes tipo 2 e outras doenças crônicas.",
  },
  {
    id: 14,
    category: "Saúde",
    emoji: "🩸",
    difficulty: "Médio",
    question: "Após consumir um alimento rico em açúcar, o que costuma acontecer com a glicemia?",
    options: [
      { id: "a", text: "Diminui imediatamente." },
      { id: "b", text: "Aumenta rapidamente." },
      { id: "c", text: "Permanece igual." },
      { id: "d", text: "Desaparece do sangue." },
    ],
    correct: "b",
    explanation: "O açúcar é absorvido rapidamente, elevando a glicose no sangue e estimulando a liberação de insulina.",
  },
  {
    id: 15,
    category: "Saúde",
    emoji: "🧬",
    difficulty: "Difícil",
    question: "Qual hormônio ajuda a controlar a quantidade de açúcar no sangue?",
    options: [
      { id: "a", text: "Adrenalina." },
      { id: "b", text: "Insulina." },
      { id: "c", text: "Melatonina." },
      { id: "d", text: "Serotonina." },
    ],
    correct: "b",
    explanation: "A insulina permite que a glicose entre nas células para ser utilizada como fonte de energia, ajudando a controlar os níveis de açúcar no sangue.",
  },
  {
    id: 16,
    category: "Saúde",
    emoji: "⚠️",
    difficulty: "Médio",
    question: "Qual destas situações pode indicar excesso de açúcar na alimentação?",
    options: [
      { id: "a", text: "Sentir muita sede e vontade frequente de consumir doces." },
      { id: "b", text: "Melhorar a visão." },
      { id: "c", text: "Dormir menos e nunca sentir fome." },
      { id: "d", text: "Aumentar a altura." },
    ],
    correct: "a",
    explanation: "O consumo elevado de açúcar pode favorecer alterações na glicemia, aumentando a sede e a vontade de consumir alimentos doces.",
  },

  // ======================== NUTRIÇÃO E HÁBITOS ========================
  {
    id: 8,
    category: "Nutrição",
    emoji: "🍏",
    difficulty: "Fácil",
    question: "Qual lanche tende a proporcionar maior saciedade?",
    options: [
      { id: "a", text: "Barra de chocolate" },
      { id: "b", text: "Maçã com castanhas" },
      { id: "c", text: "Bala de goma" },
      { id: "d", text: "Refrigerante zero" },
    ],
    correct: "b",
    explanation: "A combinação de fibras e gorduras boas ajuda a prolongar a sensação de saciedade.",
  },
  {
    id: 9,
    category: "Nutrição",
    emoji: "🥛",
    difficulty: "Fácil",
    question: "A lactose é:",
    options: [
      { id: "a", text: "Um tipo de gordura." },
      { id: "b", text: "O açúcar natural do leite." },
      { id: "c", text: "Um adoçante artificial." },
      { id: "d", text: "Uma vitamina." },
    ],
    correct: "b",
    explanation: "A lactose é um carboidrato naturalmente presente no leite e em seus derivados.",
  },
  {
    id: 18,
    category: "Nutrição",
    emoji: "🌾",
    difficulty: "Médio",
    question: "Por que consumir fibras junto com alimentos que contêm açúcar pode ser benéfico?",
    options: [
      { id: "a", text: "Porque ajudam a absorver a glicose mais lentamente." },
      { id: "b", text: "Porque aumentam o açúcar no sangue." },
      { id: "c", text: "Porque eliminam totalmente o açúcar do alimento." },
      { id: "d", text: "Porque substituem a água." },
    ],
    correct: "a",
    explanation: "As fibras retardam a absorção da glicose, ajudando no controle da glicemia e promovendo maior saciedade.",
  },
  {
    id: 19,
    category: "Nutrição",
    emoji: "🍎",
    difficulty: "Médio",
    question: "Qual destas refeições tende a provocar um aumento mais lento da glicose no sangue?",
    options: [
      { id: "a", text: "Refrigerante e bala." },
      { id: "b", text: "Maçã com aveia." },
      { id: "c", text: "Pirulito." },
      { id: "d", text: "Biscoito recheado com refrigerante." },
    ],
    correct: "b",
    explanation: "A aveia é rica em fibras, que diminuem a velocidade de absorção dos açúcares da refeição, evitando picos rápidos de glicemia.",
  },
  {
    id: 20,
    category: "Hábitos",
    emoji: "🧠",
    difficulty: "Difícil",
    question: "Qual destes hábitos pode ajudar a reduzir a vontade de consumir doces?",
    options: [
      { id: "a", text: "Fazer refeições equilibradas ao longo do dia." },
      { id: "b", text: "Ficar muitas horas sem comer." },
      { id: "c", text: "Substituir água por refrigerante." },
      { id: "d", text: "Comer doces sempre que sentir fome." },
    ],
    correct: "a",
    explanation: "Fazer refeições equilibradas ajuda a manter os níveis de glicose mais estáveis, reduzindo a fome excessiva e a vontade de consumir alimentos ricos em açúcar.",
  },
];

// Mantenha as outras exportações (sugarFoods, sugarTypes, myths, healthyTips)
// Elas não foram alteradas, mas você pode mantê-las ou substituir depois.
export const sugarFoods = [
  // ... (mantenha o que já existe ou me avise se quiser atualizar)
];

export const sugarTypes = [
  // ...
];

export const myths = [
  // ...
];

export const healthyTips = [
  // ...
];
