# :checkered_flag: AvaliAe

Plataforma voltada para estudantes, permitindo consultar informações sobre professores e disciplinas, realizar avaliações com base em suas experiências acadêmicas e compartilhar materiais relacionados às disciplinas, como provas, trabalhos, atividades e listas de exercícios.

## :technologist: Membros da equipe

Matrícula: 565288
Nome: Narciso Roberto de Souza
Curso: Sistemas de informação

Matrícula: [informar]
Nome: [informar]
Curso: Sistemas de informação

## :bulb: Objetivo Geral

Desenvolver uma plataforma que permita aos estudantes consultar professores e disciplinas, compartilhar materiais acadêmicos e registrar avaliações sobre suas experiências com professores em disciplinas específicas, facilitando o acesso a informações e recursos úteis para a comunidade acadêmica.

## :eyes: Público-Alvo

O público-alvo principal da aplicação são estudantes, que poderão consultar professores, disciplinas, avaliações e materiais acadêmicos disponíveis na plataforma, além de contribuir com novos conteúdos e avaliações.

Também fazem parte do contexto da aplicação os professores, que poderão estar cadastrados na plataforma e ser associados às disciplinas e avaliações realizadas pelos estudantes.

## :star2: Impacto Esperado

Espera-se que a plataforma facilite o acesso dos estudantes a informações sobre professores e disciplinas, permitindo que eles consultem experiências de outros estudantes antes de tomar decisões relacionadas à sua vida acadêmica.

Além disso, espera-se centralizar materiais acadêmicos disponibilizados pelos próprios estudantes, facilitando o acesso a provas, trabalhos, atividades, exercícios e listas de exercícios relacionados às disciplinas.

Dessa forma, a aplicação poderá contribuir para o compartilhamento de conhecimento entre estudantes e para uma melhor organização das informações e materiais utilizados no ambiente acadêmico.

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

👑 Usuário Administrador (ADM)

Tipo de usuário com o nível mais elevado de permissões na plataforma. Não será um usuário que utilizará o sistema de forma convencional, mas será responsável por sua administração e moderação.

Sua interface será direcionada ao gerenciamento de contas de usuários, documentos e avaliações, permitindo, quando necessário, a exclusão desses registros e a manutenção da plataforma.

👨‍🏫 Usuário Professor

Tipo de usuário predominantemente passivo. O professor poderá criar e gerenciar sua própria conta e terá acesso às avaliações realizadas pelos estudantes, incluindo as notas atribuídas ao seu desempenho.

Além disso, terá acesso a endpoints de estatísticas, que fornecerão informações e indicadores capazes de gerar insights sobre seu desempenho nas disciplinas avaliadas.

👨‍🎓 Usuário Aluno

Tipo de usuário mais ativo da plataforma. O aluno poderá avaliar professores, atribuindo notas e comentários com base em suas experiências acadêmicas, além de realizar o upload de documentos acadêmicos relacionados às disciplinas.

Também poderá consultar os documentos disponibilizados por outros usuários e visualizar a nota geral dos professores cadastrados na plataforma, utilizando essas informações como referência para suas consultas acadêmicas.

## :triangular_flag_on_post: Principais funcionalidades da aplicação

Funcionalidades:

👑 Usuário Administrador (ADM)

Possui o nível máximo de permissão na plataforma, podendo:

Gerenciar as contas dos usuários;
Excluir contas de usuários;
Gerenciar os documentos cadastrados na plataforma;
Excluir documentos cadastrados pelos usuários.

👨‍🏫 Usuário Professor

Pode realizar as seguintes ações:

Criar uma conta na plataforma;
Atualizar os dados da própria conta;
Consultar suas notas nas diferentes disciplinas;
Consultar as avaliações realizadas pelos alunos sobre seu desempenho.

👨‍🎓 Usuário Aluno

Pode realizar as seguintes ações:

Criar uma conta na plataforma;
Atualizar os dados da própria conta;
Realizar avaliações de professores em disciplinas específicas;
Realizar o upload de documentos acadêmicos associados a uma disciplina e a um professor;
Remover os próprios documentos cadastrados;
Realizar o download de documentos cadastrados por outros usuários.

## :spiral_calendar: Entidades ou tabelas do sistema

Estudante: Representa o usuário que utiliza a plataforma para consultar infor-
mações sobre professores e disciplinas, além de realizar avaliações com base em
suas experiências acadêmicas.
– Atributos:
∗ ID
∗ Nome
∗ E-mail
∗ Senha
∗ Curso
∗ Data de cadastro

• Professor: Representa o docente cadastrado na plataforma. O professor poderá
ser consultado pelos estudantes e possuir avaliações relacionadas às disciplinas
ministradas.
– Atributos:
∗ ID
∗ Nome
∗ E-mail
∗ Data de cadastro
∗ Senha

• Disciplina: Representa uma disciplina acadêmica cadastrada na plataforma.
Uma disciplina pode estar relacionada a diferentes professores e possuir avaliações
realizadas pelos estudantes.
– Atributos:
4
∗ ID
∗ Nome
∗ Carga horária

• Avaliação: Representa uma avaliação realizada por um estudante sobre um
determinado professor em uma disciplina específica. A avaliação permite registrar
a experiência do estudante por meio de notas e comentários.
– Atributos:
∗ ID
∗ ID do estudante
∗ ID do professor
∗ ID da disciplina
∗ Nota geral
∗ Nota de didática
∗ Nota de metodologia
∗ Nota de disponibilidade
∗ Comentário
∗ Data da avaliação

• Documento: Representa um material acadêmico disponibilizado por um usu-
ario na plataforma. Os documentos podem corresponder a provas, trabalhos,
atividades, exercícios, listas de exercícios ou outros materiais relacionados a uma
determinada disciplina.
– Atributos:
∗ ID
∗ ID do usuario
∗ ID da disciplina
∗ Título
∗ Descrição
∗ Tipo
∗ BLOB arquivo
∗ Data de publicação
