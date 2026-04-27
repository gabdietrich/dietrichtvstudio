# Textos do site Dietrich.tv — por página

Documento gerado a partir do código-fonte (`src/locales/pt.json`, `src/locales/en.json`) e textos fixos em componentes.  
Rotas com locale: `/pt/...` e `/en/...` (ex.: `/pt/contact`, `/en/grand-soir-by-maison-francis-kurkdjian`).

---

## Elementos globais (todas as páginas)

### Navegação

| Contexto | PT | EN |
|----------|----|----|
| Link principal | Contato | Contact |
| Alt do logo | dietrich.tv studio | dietrich.tv studio |
| Idiomas (botões) | EN \| PT | EN \| PT |

### Textos comuns (`common`)

| Chave | PT | EN |
|-------|----|----|
| contact | Contato | Contact |
| home | Início | Home |
| work | Trabalhos | Work |
| loading | Carregando... | Loading... |
| viewWork | Ver nossos trabalhos | View our work |
| viewOurWork | Ver nossos trabalhos → | View our work → |
| nextProject | Próximo projeto | Next project |
| otherProjects | Outros projetos | Other projects |
| giveUsABuzz | Fale com a gente | Give us a buzz |
| projectNotFound | Projeto não encontrado | Project not found |
| by | por | by |
| ourWork | Nossos trabalhos | Our work |
| seeProject | Ver Projeto | See Project |
| project | Projeto | Project |

---

## Página inicial / Portfólio (`work`)

**URL:** `/pt/` ou `/en/` (e equivalente com slug no histórico).

### Introdução

| PT | EN |
|----|-----|
| Somos uma produtora multimídia com sede em São Paulo, atuando na interseção entre design, produção e pós-produção de filmes. | We are a mixed-media production company based in São Paulo, Brazil — working at the intersection of design, film production and post-production. |

### Filtros de categoria (`homepage.categories`)

| Chave | PT | EN |
|-------|----|-----|
| all | Todos | All |
| commercial | Comercial | Commercial |
| ai | I.A. | A.I. |
| beauty | Beleza | Beauty |
| documentary | Documentário | Documentary |
| musicVideo | Videoclipe | Music Video |

### Rodapé na home (`Footer`)

O rodapé usa texto embutido em `Footer.tsx` (espelha `contact.footer` nas traduções).

**PT**

- Tagline: Transformamos ideias em imagens que atravessam culturas.
- Estatísticas: 15+ / 5 / 1 com os mesmos rótulos que em `contact.footer.stats` (pt.json).
- Link “Sobre →”; CTA: Fale com a gente para criarmos seu próximo projeto.
- Colunas: ESCRITÓRIO, REDES, CONTATO.

**EN**

- Tagline: We transform ideas into images that resonate across cultures.
- Stats labels como em `contact.footer.stats` (en.json).
- About →; CTA: Connect with us to create your next project.
- Columns: OFFICE, SOCIAL, CONTACT.

Email e telefone (rodapé): contact@dietrich.tv — +55 11 98805-9492

---

## Página Contato (`contact`)

**URL:** `/pt/contact`, `/en/contact`

### Cabeçalho e texto principal

**PT — `contact.mainHeading`**  
Prazer em conhecer :)

**EN — `contact.mainHeading`**  
Nice to meet you :)

**Parágrafos (`contact.description`)** — texto completo no **Anexo A** (secção *Página Contato — parágrafos da descrição*).

### O que fazemos (`contact.whatWeDo`)

| PT | EN |
|----|-----|
| O que fazemos | What we do |

#### FILME & IMAGEM / FILM & IMAGE

**PT:** Comerciais, Documentários, Projetos de Arte, Videoclipes  
**EN:** Commercials, Documentaries, Art Projects, Music Videos

#### INOVAÇÃO / INNOVATION

**PT:** Uso de novas tecnologias, Pós-produção criativa, Ferramentas Generativas, Suportes múltiplos  
**EN:** Use of new technologies, Creative post-production, Generative Tools, Multiple formats

#### DESIGN & PESQUISA / DESIGN & RESEARCH

**PT:** Direção de Arte, Cenografia, Pesquisa Criativa, Desenvolvimento de Conceitos  
**EN:** Art Direction, Set Design, Creative Research, Concept Development

#### ESTRATÉGIA / STRATEGY

**PT:** Estratégia de Marca, Direção Criativa, Desenvolvimento de Campanhas, Visão de Futuro  
**EN:** Brand Strategy, Creative Direction, Campaign Development, Future Vision

### Carrossel de clientes (`ClientsCarousel.tsx`)

Texto **na interface** (não usa `contact.trustedBy` do JSON):

| PT | EN |
|----|-----|
| Nossos clientes | Trusted by |

_Notas:_ Em `pt.json`/`en.json` existe `contact.trustedBy` (“Marcas que confiam em nós” / “Brands that trust us”), mas o componente atual usa as strings acima.

### Escritório e contato (bloco inferior)

- Títulos: ESCRITÓRIO / OFFICE; REDES / SOCIAL (rodapé contact); CONTATO / GET IN TOUCH  
- Endereço (PT): Rua Lira, 151 - Sala 12 - Vila Madalena; São Paulo - Brasil; 05443-060  
- Endereço (EN): Rua Lira, 151 - Room 12 - Vila Madalena; São Paulo - Brazil; 05443-060  

Redes (rótulos fixos no JSX): Instagram, Behance, LinkedIn  

Logo grande no fim da página: **dietrich.tv studio**

### Alt da imagem do escritório (fixo no código)

`Dietrich.tv Studio office`

---

## Página Fornecedores (`fornecedores`)

**URL:** `/pt/fornecedores`, `/en/fornecedores`  
_Textos fixos em português em `FornecedoresPage.tsx` (não passam por i18n)._

- Título: **Fornecedores**
- Subtítulo: Complete com atenção o formulário com as informações do trabalho executado.
- Título do iframe (acessibilidade): Formulário de Cadastro de Fornecedores
- **Informações Importantes**
  - **Processo de Seleção:** Todos os fornecedores passam por um processo de análise para garantir a qualidade e adequação aos nossos projetos.
  - **Contato:** Após o envio do formulário, entraremos em contato em até 5 dias úteis com informações sobre o processo.

### Meta específica (`MetaUpdater.tsx`)

- Título: `Fornecedores | Dietrich.tv Studio`
- Descrição: Cadastre-se como fornecedor e faça parte da nossa rede de parceiros. Dietrich.tv Studio - produtora especializada em filmmaking com I.A. de São Paulo, Brasil.

---

## Página de projeto (`project`)

**URL:** `/pt/{slug}`, `/en/{slug}` (ex.: `grand-soir-by-maison-francis-kurkdjian`)

### Textos de UI (`project.*`)

| Chave | PT | EN |
|-------|----|-----|
| videoLoading | Carregando vídeo... | Loading video... |
| noVideo | Sem vídeo | No video |
| noVideoAvailable | Nenhum vídeo disponível | No video available |
| projectDetails | Detalhes do projeto | Project details |
| client | Cliente | Client |
| type | Tipo | Category |
| credits | Créditos | Credits |
| contact | Contato | Contact |
| studioName | dietrich.tv studio | dietrich.tv studio |
| projectNotFound | Projeto não encontrado | Project not found |
| otherProjects | Outros projetos | Other projects |
| nextProjectArrow | Próximo projeto → | Next project → |

### Conteúdo por projeto (`projects.*`)

Os textos abaixo são os que aparecem na página de detalhe e nos cartões quando o idioma está ativo.

---

#### Grand Soir (`grandSoir`)

| Campo | PT | EN |
|-------|----|-----|
| title | Grand Soir, por Maison Francis Kurkdjian | Grand Soir, by Maison Francis Kurkdjian |
| description | Grand Soir, por Maison Francis Kurkdjian. Um filme de Spec criado inteiramente com inteligência artificial. 100% feito em I.A. | Grand Soir, by Maison Francis Kurkdjian. A spec film created entirely with artificial intelligence. 100% made in A.I. |
| client | Maison Francis Kurkdjian | Maison Francis Kurkdjian |
| projectType | Estudo de Case | Case Study |
| credits | Direção: Dietrich. 100% feito em I.A. | Directed by Dietrich. 100% made in A.I. |

Texto longo: **Anexo A**, secção `grandSoir`.

---

#### Ernesto Neto (`ernestoNeto`)

| Campo | PT | EN |
|-------|----|-----|
| title | Ernesto Neto para Le Bon Marché Rive Gauche | Ernesto Neto for Le Bon Marché Rive Gauche |
| description | Capturando o artista antes e depois da exposição. Onde marca e arte se encontram através do cinema. | Capturing the artist before and after the exhibition. Where brand and art meet through cinema. |
| client | Le Bon Marché Rive Gauche | Le Bon Marché Rive Gauche |
| projectType | Estudo de Case | Case Study |
| credits | Direção: Dietrich. Filmado no Rio de Janeiro para o Le Bon Marché Rive Gauche. | Directed by Dietrich. Filmed in Rio de Janeiro for Le Bon Marché Rive Gauche. |

Texto longo: **Anexo A**, secção `ernestoNeto`.

---

#### Three Short Films (`threeShortFilms`)

| Campo | PT | EN |
|-------|----|-----|
| title | Three Short Films | Three Short Films |
| description | Três curtas com Manu Gavassi, unindo moda, música e cinema. Uma trilogia que explora a imagem como performance e persona. | Three short films with Manu Gavassi, blending fashion, music and cinema. A trilogy exploring image as performance and persona. |
| client | Manu Gavassi | Manu Gavassi |
| projectType | Trilogia | Trilogy |
| credits | Direção: Dietrich em colaboração com Manu Gavassi. | Directed by Dietrich in collaboration with Manu Gavassi. |

Texto longo: **Anexo A**, secção `threeShortFilms`.

---

#### Elsa Schiaparelli (`elsaSchiaparelli`)

| Campo | PT | EN |
|-------|----|-----|
| title | Private Album de Elsa Schiaparelli | Elsa Schiaparelli's Private Album |
| description | Elsa Schiaparelli lembrada em um curta animado. Um diálogo entre moda, memória e cosmos. | Elsa Schiaparelli remembered through an animated short. A dialogue between fashion, memory and the cosmos. |
| client | Biblioteca Mário de Andrade | Biblioteca Mário de Andrade |
| projectType | Documentário Animado | Animated Documentary |
| credits | Direção: Dietrich. Narração: Marisa Berenson. | Directed by Dietrich. Narrated by Marisa Berenson. |

Texto longo: **Anexo A**, secção `elsaSchiaparelli`.

---

#### Gisele & Cauã (`giseleCaua`)

| Campo | PT | EN |
|-------|----|-----|
| title | Gisele Bündchen e Cauã Reymond | Gisele Bündchen and Cauã Reymond |
| description | Um lançamento cinematográfico embalado pelo clássico Lá Vem Ela, de Jorge Ben Jor. | A cinematic launch set to Jorge Ben Jor's classic *Lá Vem Ela*. |
| client | Democrata | Democrata |
| projectType | Filme de Lançamento | Launch Film |
| credits | Direção: Dietrich. Com Gisele Bündchen e Cauã Reymond. | Directed by Dietrich. Featuring Gisele Bündchen and Cauã Reymond. |

Texto longo: **Anexo A**, secção `giseleCaua`.

---

#### Dia das Mães '25 (`mothersDay25`)

| Campo | PT | EN |
|-------|----|-----|
| title | Dia das Mães '25 | Mother's Day '25 |
| description | Sasha, Bruna Marquezine, Xuxa e Neide — um tributo às mães e às histórias que atravessam gerações. | Sasha, Bruna Marquezine, Xuxa and Neide — a tribute to mothers and the stories that cross generations. |
| client | Hering | Hering |
| projectType | Campanha | Campaign |
| credits | Direção: Dietrich. Com Sasha, Bruna Marquezine, Xuxa e Neide. | Directed by Dietrich. Featuring Sasha, Bruna Marquezine, Xuxa and Neide. |

Texto longo: **Anexo A**, secção `mothersDay25`.

---

#### Il Neige (`ilNeige`)

| Campo | PT | EN |
|-------|----|-----|
| title | Il Neige Rive Gauche | Il Neige Rive Gauche |
| description | Uma animação lúdica para o Le Bon Marché, onde bolas de neve despertam o inverno em Paris. | A playful animation for Le Bon Marché, where snowballs awaken winter in Paris. |
| client | Le Bon Marché Rive Gauche | Le Bon Marché Rive Gauche |
| projectType | Filme Animado | Animated Film |
| credits | Direção: Dietrich. Comissionado pelo Le Bon Marché Rive Gauche. | Directed by Dietrich. Commissioned by Le Bon Marché Rive Gauche. |

Texto longo: **Anexo A**, secção `ilNeige`.

---

#### Desejo (`desejo`)

| Campo | PT | EN |
|-------|----|-----|
| title | Desejo | Desejo |
| description | Um filme sensorial onde intimidade, fragrância e memória se entrelaçam. | A sensorial film where intimacy, fragrance and memory intertwine. |
| client | Natura | Natura |
| projectType | Campanha | Campaign |
| credits | Direção: Dietrich em colaboração com O2 Filmes. | Directed by Dietrich in collaboration with O2 Filmes. |

Texto longo: **Anexo A**, secção `desejo`.

---

#### Brilho Lamelar (`tresemmeBrilho`)

| Campo | PT | EN |
|-------|----|-----|
| title | Brilho Lamelar | Brilho Lamelar |
| description | Um filme onde tecnologia e moda se encontram, e o cabelo se transforma em luz. | A film where technology and fashion meet, and hair becomes light. |
| client | TRESemmé | TRESemmé |
| projectType | Campanha | Campaign |
| credits | Direção: Dietrich. Com Sabrina Sato. | Directed by Dietrich. Featuring Sabrina Sato. |

Texto longo: **Anexo A**, secção `tresemmeBrilho`.

---

#### Gracinha (`gracinha`)

| Campo | PT | EN |
|-------|----|-----|
| title | Gracinha | Gracinha |
| description | Um álbum visual para o Disney+, co-dirigido com Manu Gavassi. Uma jornada pop, poética e cheia de camadas. | A visual album for Disney+, co-directed with Manu Gavassi. A pop, poetic and layered journey. |
| client | Disney+ Brasil | Disney+ Brazil |
| projectType | Álbum Visual | Visual Album |
| credits | Direção: Dietrich (co-direção com Manu Gavassi). | Directed by Dietrich (co-direction with Manu Gavassi). |

Texto longo: **Anexo A**, secção `gracinha`.

---

#### Dia Das Mães Fernandas (`heringFernandas`)

| Campo | PT | EN |
|-------|----|-----|
| title | Dia Das Mães Fernandas | Mother's Day Fernandas |
| description | Fernanda Montenegro e Fernanda Torres em um retrato afetivo para o Dia das Mães. | Fernanda Montenegro and Fernanda Torres in an intimate portrait for Mother's Day. |
| client | Hering | Hering |
| projectType | Campanha | Campaign |
| credits | Direção: Dietrich. Com Fernanda Montenegro e Fernanda Torres. | Directed by Dietrich. Featuring Fernanda Montenegro and Fernanda Torres. |

Texto longo: **Anexo A**, secção `heringFernandas`.

---

## Meta, SEO e redes sociais (`meta`)

### Página inicial / trabalhos

| Campo | PT | EN |
|-------|----|-----|
| title | Dietrich.tv Studio – Produção Criativa Premiada com I.A. | Dietrich.tv Studio – Award-winning A.I. Creative Production |
| description | Ver **Anexo A** (`meta.description`). | Idem |
| keywords | Ver **Anexo A** (`meta.keywords`). | Idem |
| ogDescription | Estúdio de produção premiado expandindo criatividade com I.A. 🇧🇷 Veja nossos trabalhos para Disney+, Natura, Hering e mais. | Award-winning production studio pushing creative boundaries with A.I. 🇧🇷 See our work with Disney+, Natura, Hering & more. |
| imageAlt | Dietrich.tv Studio – Produção criativa com I.A. | Dietrich.tv Studio – Creative production with A.I. |

### Página de contato (título/descrição em `meta.contact`)

| Campo | PT | EN |
|-------|----|-----|
| title | Nice to Meet You | Nice to Meet You |
| description | Ver **Anexo A** (`meta.contact.description`). | Idem |

### Página de projeto (dinâmico no `MetaUpdater`)

- Título: `{título do projeto} | Dietrich.tv Studio`
- Descrição: descrição curta do projeto + sufixo fixo em inglês: “Watch this award-winning project by Dietrich.tv Studio, a production company specializing in A.I.-powered filmmaking from São Paulo, Brazil.”

---

## Ficheiros estáticos (fora do i18n)

### `index.html` (valores iniciais antes do React)

- title: Dietrich TV Studio - Award-winning Production Studio  
- meta description: Dietrich TV is an award-winning production studio pushing creativity with A.I. Based in São Paulo, Brazil.  
- og:title / twitter:title: Dietrich TV Studio - See Our Work  
- og:description: Dietrich TV is an award-winning production studio pushing creativity with A.I. 🇧🇷  
- og:image:alt: Dietrich TV Studio - Creative production with A.I.  
- og:site_name: Dietrich TV Studio  

### `public/manifest.json`

- name: Dietrich TV Studio  
- short_name: Dietrich TV  
- description: Award-winning production studio pushing creativity with A.I.  

---

## Anexo A — Textos longos completos (PT / EN)

### Página Contato — parágrafos da descrição

**PT — parágrafo 1**

A Dietrich.tv Studio tem sólida trajetória em comerciais de lifestyle, beleza e filmes com efeitos especiais. Com uma abordagem que une design, cinema e tecnologia, o estúdio já colaborou com marcas parceiras como Nike, Natura, Tresemmé, Hering e outras. A atuação internacional inclui projetos para o grupo LVMH em Paris e Xangai, além de ter trabalhado para a série "Meet the Artists", da ArtBasel, e do filme de lançamento da exposição de Ernesto Neto no Le Bon Marché, em Paris.

**PT — parágrafo 2**

Nosso portfólio se expande também para o universo musical e artístico, com videoclipes para nomes como Criolo, Duda Beat, Jão e Thiago Pethit, premiados no Music Video Festival (m-v-f-) com o clipe Etérea, de Criolo. Mais recentemente, o estúdio tem aprofundado sua presença no campo documental e cultural, com o filme "Elsa Schiaparelli's Private Album" e colaborações em projetos franceses, como a exposição Les Oiseaux no Jardin d'Acclimatation, em Paris. Em cada projeto, a Dietrich.tv Studio reafirma seu compromisso com a criação de imagens de forte impacto estético e cultural.

**EN — paragraph 1**

Dietrich.tv Studio has a solid trajectory in lifestyle commercials, beauty, and films with special effects. With an approach that merges design, cinema, and technology, the studio has collaborated with partner brands such as Nike, Natura, Tresemmé, Hering, among others. Its international work includes projects for the LVMH group in Paris and Shanghai, as well as contributions to ArtBasel's Meet the Artists series and the launch film for Ernesto Neto's exhibition at Le Bon Marché in Paris.

**EN — paragraph 2**

Our portfolio also expands into the musical and artistic fields, with music videos for artists such as Criolo, Duda Beat, Jão, and Thiago Pethit, including the award-winning Etérea video at the Music Video Festival (m-v-f-). More recently, the studio has deepened its presence in the documentary and cultural fields, with the film Elsa Schiaparelli's Private Album and collaborations on French projects such as the exhibition Les Oiseaux at the Jardin d'Acclimatation in Paris. In every project, Dietrich.tv Studio reaffirms its commitment to creating images with strong aesthetic and cultural impact.

### Meta geral (`meta.description`, `meta.keywords`, `meta.contact.description`)

**PT meta.description**

Descubra filmes inovadores do Dietrich.tv Studio: Estúdio de produção premiado expandindo criatividade com inteligência artificial. Trabalhos para Disney+, Natura, Hering. Sediado em São Paulo, Brasil.

**EN meta.description**

Discover groundbreaking films by Dietrich.tv Studio: Award-winning production company pushing creative boundaries with artificial intelligence. Work with global brands like Disney+, Natura, Hering. Based in São Paulo, Brazil.

**PT meta.keywords**

estúdio de produção, I.A., inteligência artificial, cinema, filme, vídeo, design, criativo, São Paulo, Brasil, comercial, videoclipe, documentário, fashion films, Disney, Natura, Hering, Maison Francis Kurkdjian

**EN meta.keywords**

production studio, A.I., artificial intelligence, cinema, film, video, design, creative, São Paulo, Brazil, commercial, music video, documentary, fashion films, Disney, Natura, Hering, Maison Francis Kurkdjian

**PT meta.contact.description**

Pronto para criar algo extraordinário? Entre em contato com Dietrich.tv Studio - estúdio de produção premiado especializado em filmmaking com I.A. Sediado em São Paulo, Brasil. Fale conosco hoje!

**EN meta.contact.description**

Ready to create something extraordinary? Contact Dietrich.tv Studio - award-winning production company specializing in A.I.-powered filmmaking. Based in São Paulo, Brazil. Get in touch today!

### Projeto `grandSoir` — fullDescription

**PT**

Perfume é uma ponte entre momentos, um lugar onde passado e futuro respiram juntos. Vivemos em uma época em que a criação se expande além das mãos, guiada também pela inteligência que imaginamos e construímos. Como o perfume, essa tecnologia dissolve fronteiras, unindo quem fomos com quem ainda seremos, transformando o invisível em emoção. Criamos este filme de Spec em I.A. para a Maison Francis Kurkdjian como uma celebração do encontro entre inovação e essência.

**EN**

Perfume is a bridge between moments, a place where past and future breathe together. We live in a time when creation expands beyond the hands, guided by the intelligence we imagine and build. Like perfume, this technology dissolves boundaries, uniting who we were with who we will become, transforming the invisible into emotion. We created this spec film in A.I. for Maison Francis Kurkdjian as a celebration of the meeting between innovation and essence.

---

### Projeto `ernestoNeto` — fullDescription

**PT**

Filmar um artista em seu ateliê é muito diferente de documentar uma exposição. É entrar no espaço onde a obra nasce, onde matéria e gesto ainda são dúvida, tentativa, descoberta. Dietrich acompanhou Ernesto Neto em seu ateliê no Rio de Janeiro, registrando o processo criativo que antecedeu e sucedeu sua exposição no Le Bon Marché em Paris. O filme não mostra apenas a obra pronta. Ele revela a respiração do artista, a intimidade do trabalho manual, a transição entre o silêncio do estúdio e a monumentalidade da montagem em um dos espaços mais icônicos do mundo. Para nós, esse projeto reafirma algo essencial: marcas podem se conectar com a arte não apenas exibindo resultados, mas abraçando processos. É aí que se constrói uma ressonância verdadeira, para além da publicidade.

**EN**

Filming an artist in the studio is very different from documenting an exhibition. It means entering the space where the work is born, where matter and gesture are still doubt, attempt, discovery. Dietrich followed Ernesto Neto in his studio in Rio de Janeiro, recording the creative process that both preceded and followed his exhibition at Le Bon Marché in Paris. The film doesn't just show the finished work. It reveals the artist's breath, the intimacy of manual labor, the transition between the silence of the studio and the monumentality of the installation in one of the world's most iconic spaces. This project reaffirms something essential: brands can connect with art not only by showing results, but by embracing process. That is where true resonance is built, beyond advertising.

---

### Projeto `threeShortFilms` — fullDescription

**PT**

Com Manu Gavassi, Dietrich dirigiu uma trilogia de curtas que borram as fronteiras entre cinema, moda e performance. Cada filme é ao mesmo tempo íntimo e teatral, explorando como a imagem pode construir e desconstruir a persona. Concebidos em diálogo com o universo artístico de Manu — irônico e delicado, pop e profundamente pessoal — os filmes ultrapassam a estética convencional de videoclipes, assumindo uma forma híbrida que pertence tanto ao cinema quanto à cultura contemporânea. Juntos, os três curtas compõem um mosaico de identidade, revelando como narrativa e estilo podem amplificar a voz de uma artista em diferentes plataformas sem perder autenticidade.

**EN**

With Manu Gavassi, Dietrich directed a trilogy of short films that blur the boundaries between cinema, fashion and performance. Each film is both intimate and theatrical, exploring how image can construct and deconstruct persona. Conceived in dialogue with Manu's own artistic universe — ironic and delicate, pop yet deeply personal — the films go beyond conventional music video aesthetics, embracing a hybrid form that belongs as much to cinema as to contemporary culture. Together, the three shorts form a mosaic of identity, revealing how narrative and style can amplify an artist's voice across different platforms while remaining authentic.

---

### Projeto `elsaSchiaparelli` — fullDescription

**PT**

Dietrich dirigiu este documentário sobre Elsa Schiaparelli, construído a partir das memórias pessoais de sua neta: a atriz, supermodelo e ícone cultural Marisa Berenson. Narrado pela própria Marisa, o curta animado revelou imagens inéditas da família Schiaparelli, em uma iniciativa criativa realizada especialmente para a Biblioteca Mário de Andrade, no contexto do centenário do Manifesto Surrealista de André Breton.

**EN**

Dietrich directed this documentary about Elsa Schiaparelli, built around the personal memories of her granddaughter: actress, supermodel and cultural icon Marisa Berenson. Narrated by Marisa herself, the animated short revealed never-before-seen images of the Schiaparelli family, in a creative initiative made especially for Brazil's most important public library, Biblioteca Mário de Andrade, in the context of the centenary of André Breton's Surrealist Manifesto.

---

### Projeto `giseleCaua` — fullDescription

**PT**

O filme de lançamento da Democrata trouxe duas das figuras mais icônicas do Brasil — Gisele Bündchen e Cauã Reymond — em uma narrativa que celebra estilo, presença e ritmo. A trilha sonora, Lá Vem Ela de Jorge Ben Jor, define o tom: atemporal, magnética, inconfundivelmente brasileira. Cada cena captura o diálogo entre elegância e energia, masculino e feminino, intimidade e espetáculo. Mais do que publicidade, este filme é um encontro cultural que entrelaça moda e música, posicionando a marca no coração do imaginário brasileiro. Filmado com precisão cinematográfica, o trabalho reflete a essência da Democrata: simplesmente sofisticado, bem acabado e feito com cuidado.

**EN**

Democrata's launch film brought together two of Brazil's most iconic figures — Gisele Bündchen and Cauã Reymond — in a narrative that celebrates style, presence and rhythm. The soundtrack, *Lá Vem Ela* by Jorge Ben Jor, sets the tone: timeless, magnetic, unmistakably Brazilian. Each scene captures the dialogue between elegance and energy, masculine and feminine, intimacy and spectacle. More than advertising, this film is a cultural encounter weaving fashion and music, positioning the brand at the heart of Brazil's creative imagination. Shot with cinematic precision, the work reflects Democrata's essence: simply sophisticated, well-crafted and made with care.

---

### Projeto `mothersDay25` — fullDescription

**PT**

Na campanha de Dia das Mães da Hering, Sasha Meneghel, Bruna Marquezine, Xuxa e Neide protagonizam um filme que celebra vínculos familiares como parte essencial da identidade da marca. A proposta foi criar um retrato afetivo: mães e filhas, amizade e legado, as pequenas cenas do cotidiano que definem o amor. O filme valoriza a autenticidade, com a moda funcionando como pano de fundo para o gesto e a emoção. Mais do que campanha, é uma homenagem à maternidade como experiência vivida e compartilhada.

**EN**

In Hering's Mother's Day campaign, Sasha Meneghel, Bruna Marquezine, Xuxa and Neide star in a film that celebrates family bonds as part of the brand's identity. The intention was to create an affective portrait: mothers and daughters, friendship and legacy, the small everyday gestures that define love. The film highlights authenticity, with fashion serving as a backdrop for gesture and emotion. More than a campaign, it is a tribute to motherhood as a lived and shared experience.

---

### Projeto `ilNeige` — fullDescription

**PT**

O Le Bon Marché nos comissionou para criar *Il Neige Rive Gauche*, um filme animado que anuncia a chegada do inverno e das festas de fim de ano em Paris. Na narrativa, pequenas bolas de neve travessas provocam uma nuvem adormecida até despertá-la. Só então a neve começa a cair sobre a Rive Gauche, transformando a cidade em poesia. A estética combina humor e delicadeza, capturando o espírito lúdico da estação em uma linguagem visual que mistura design, storytelling e imaginação. Mais que uma peça sazonal, *Il Neige Rive Gauche* é um gesto onírico que lembra como uma marca pode também ser guardiã de emoções e encantamento.

**EN**

Le Bon Marché commissioned us to create *Il Neige Rive Gauche*, an animated film announcing the arrival of winter and the holiday season in Paris. In the narrative, mischievous snowballs tease a sleeping cloud until it wakes up. Only then does snow begin to fall over the Rive Gauche, turning the city into poetry. The aesthetic combines humor and delicacy, capturing the season's playful spirit in a visual language that blends design, storytelling and imagination. More than a seasonal piece, *Il Neige Rive Gauche* is a dreamlike gesture, reminding us that a brand can also be a guardian of emotion and enchantment.

---

### Projeto `desejo` — fullDescription

**PT**

Em *Desejo*, da Natura, Dietrich dirigiu (com a O2 Filmes) um filme que explora a tensão sutil entre intimidade e expressão. O desejo não é mostrado de forma direta — ele é sugerido por meio de gestos, texturas e pelo ritmo da fragrância em movimento. A narrativa se desdobra em camadas: closes que evocam o toque, enquadramentos que borram a linha entre pele e atmosfera, uma abordagem sensorial em que o perfume se torna memória e também antecipação. Em vez de ilustrar o produto, o filme cria um território emocional, no qual a linguagem de beleza da Natura ressoa como algo íntimo, poético e profundamente humano.

**EN**

In *Desejo*, by Natura, Dietrich (with O2 Filmes) directed a film exploring the subtle tension between intimacy and expression. Desire is not shown directly — it is suggested through gestures, textures and the rhythm of fragrance in motion. The narrative unfolds in layers: close-ups evoking touch, frames that blur the line between skin and atmosphere, a sensorial approach where perfume becomes both memory and anticipation. Instead of illustrating the product, the film creates an emotional territory where Natura's language of beauty resonates as something intimate, poetic and deeply human.

---

### Projeto `tresemmeBrilho` — fullDescription

**PT**

Para o lançamento do TRESemmé Brilho Lamelar, Dietrich dirigiu um filme que conecta o universo da moda à inovação tecnológica. Filmado em Virtual Production, o projeto mistura cenários reais e digitais, com Sabrina Sato como protagonista. A estética é precisa e sofisticada: fundos escuros, iluminação escultural, movimentos de câmera que destacam o brilho como performance. As transições mergulham nos fios de cabelo, que se tornam portais para novas cenas. O resultado traduz o lugar da TRESemmé na interseção entre beleza e tecnologia, e reafirma o uso de ferramentas digitais não apenas como recurso, mas como linguagem criativa.

**EN**

For the launch of TRESemmé Brilho Lamelar, Dietrich directed a film that connects the world of fashion with technological innovation. Shot in Virtual Production, the project blends real and digital environments, with Sabrina Sato as the protagonist. The aesthetic is sharp and sophisticated: dark backgrounds, sculptural lighting, camera movements that highlight shine as performance. Transitions dive into strands of hair, which become portals to new scenes. The result is a film that translates TRESemmé's place at the intersection of beauty and technology, reaffirming the use of digital tools not just as resources, but as creative language.

---

### Projeto `gracinha` — fullDescription

**PT**

Lançado exclusivamente no Disney+ Brasil, *Gracinha* é um álbum visual de 41 minutos idealizado e roteirizado por Manu Gavassi, co-dirigido por ela e Dietrich. Inspirado nas faixas de seu quarto álbum de estúdio, o projeto mistura performance, narrativa e estética cinematográfica. Filmado em 16 mm e Alexa Mini, é um retrato experimental e pop da persona de Manu — entre dança, humor e questionamento de identidade. Com participações de João Côrtes, Paulo Miklos, Ícaro Silva, Fábio Porchat, Titi Ewbank e outros, o filme explora temas de autoconhecimento, libertação e reinvenção, com referências que vão de coreografia a memórias de adolescência. *Gracinha* também é sobre deixar uma personagem para trás e renascer — com coragem, poeticidade e autenticidade.

**EN**

Released exclusively on Disney+ Brazil, *Gracinha* is a 41-minute visual album conceived and written by Manu Gavassi, co-directed by her and Dietrich. Inspired by the tracks of her fourth studio album, the project blends performance, narrative and cinematic aesthetics. Shot on 16mm and Alexa Mini, it is an experimental and pop portrait of Manu's persona — between dance, humor and questions of identity. Featuring João Côrtes, Paulo Miklos, Ícaro Silva, Fábio Porchat, Titi Ewbank and others, the film explores themes of self-discovery, liberation and reinvention, using references that range from choreography to adolescent memories. *Gracinha* is also about leaving a character behind and being reborn — with courage, poeticity and authenticity.

---

### Projeto `heringFernandas` — fullDescription

**PT**

No Dia das Mães, a Hering convidou Fernanda Montenegro e Fernanda Torres para estrelarem um filme que é, ao mesmo tempo, homenagem e encontro. Mãe e filha, duas das maiores atrizes do Brasil, dividem a cena em uma narrativa que valoriza gestos simples, conversas cotidianas e a cumplicidade construída ao longo de uma vida. A campanha não celebra apenas a data, mas o vínculo entre gerações — um elo que se traduz em memória, presença e afeto. Em vez de enfatizar moda ou tendência, o filme destaca aquilo que permanece: a intimidade, o cuidado e a verdade de uma relação que atravessa o tempo.

**EN**

For Mother's Day, Hering invited Fernanda Montenegro and Fernanda Torres to star in a film that is both tribute and encounter. Mother and daughter, two of Brazil's greatest actresses, share the screen in a narrative that values simple gestures, everyday conversations and the complicity built over a lifetime. The campaign does not just celebrate the date, but the bond between generations — a link translated into memory, presence and affection. Instead of emphasizing fashion or trend, the film highlights what remains: intimacy, care and the truth of a relationship that withstands time.

---


## Observação sobre dados em `WorkPage.tsx`

A lista `mockWorks` contém títulos e descrições em inglês usados para slugs, metadados internos e conteúdo técnico; o que o utilizador vê na UI segue as chaves `projects.*` em i18n (incluindo `fullDescription` na página de projeto).
