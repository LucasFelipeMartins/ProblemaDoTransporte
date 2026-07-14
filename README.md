# Otimização de Fluxo em Redes: Problema do Transporte

Uma aplicação web interativa desenvolvida para resolver o clássico **Problema do Transporte**, estudado na disciplina de **Teoria Dos Grafos**.

O sistema permite calcular a **Solução Básica Factível (SBF)** inicial para minimizar custos logísticos entre fornecedores (oferta) e consumidores (demanda), utilizando três dos principais métodos acadêmicos da área.

---

## Sobre o Projeto

Este projeto foi desenvolvido para auxiliar estudantes e profissionais na visualização e resolução de problemas de transporte.

A aplicação possui uma interface simples e responsiva, permitindo que o usuário:

- Defina o número de fornecedores e consumidores;
- Informe ofertas e demandas;
- Insira a matriz de custos de transporte;
- Escolha o algoritmo desejado;
- Visualize a matriz de alocação e o custo total da solução.

---

## Funcionalidades

- ✔️ Geração dinâmica da matriz
- ✔️ Inserção de ofertas e demandas
- ✔️ Inserção da matriz de custos
- ✔️ Cálculo automático da Solução Básica Factível
- ✔️ Exibição da matriz de alocação
- ✔️ Cálculo do custo total da operação
- ✔️ Interface responsiva
- ✔️ Execução totalmente no navegador (sem necessidade de servidor)

---

## Algoritmos Implementados

### Método do Canto Noroeste

O método mais simples e rápido para obtenção da solução inicial.

A alocação começa na célula superior esquerda da matriz e segue em formato de "escada", desconsiderando os custos das rotas.

Ideal como ponto de partida para comparação entre algoritmos.

---

### Método do Custo Mínimo

Método guloso que sempre escolhe a rota de menor custo disponível.

Normalmente produz uma solução inicial melhor que o Método do Canto Noroeste.

---

### Método de Aproximação de Vogel (VAM)

O método mais eficiente entre os três implementados.

Calcula penalidades para linhas e colunas utilizando a diferença entre os dois menores custos, buscando reduzir o custo total da solução inicial.

Em muitos casos, encontra uma solução muito próxima da solução ótima.

---

## Como Utilizar

### 1. Clone o repositório

```bash
git clone https://github.com/LucasFelipeMartins/Otimiza-o-de-Fluxo-em-Redes-Problema-do-Transporte.git
```

ou faça o download do projeto em formato ZIP.

---

### 2. Abra o projeto

Abra o arquivo:

```
index.html
```

em qualquer navegador moderno.

Não é necessário instalar dependências.

---

### 3. Escolha um algoritmo

Selecione um dos métodos disponíveis:

- Canto Noroeste
- Custo Mínimo
- Aproximação de Vogel

---

### 4. Configure o problema

Informe:

- Número de fornecedores
- Número de consumidores
- Oferta de cada fornecedor
- Demanda de cada consumidor
- Custos de transporte

---

### 5. Execute

Clique em:

```
Calcular Matriz de Alocação
```

O sistema exibirá:

- Matriz de alocação;
- Distribuição das cargas;
- Custo total da operação (Z).

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- Tailwind CSS
- JavaScript

---

## Base Teórica

Este projeto foi desenvolvido com base em conteúdos de **Teoria Dos Grafos** e **Fluxo em Redes**, contemplando:

- Problema do Transporte;
- Solução Básica Factível;
- Método do Canto Noroeste;
- Método do Custo Mínimo;
- Método de Aproximação de Vogel;
- Validação de problemas balanceados (`Σ Oferta = Σ Demanda`);
- Tratamento de degeneração em matrizes.

---

## Estrutura do Projeto

```text
projeto
 ├── index.html
 ├── css/style.css
 ├── js/script.js
 ├── README.md
```

---

## Melhorias Futuras

- Implementação do método Stepping Stone;
- Implementação do Método MODI (Multiplicadores);
- Exportação dos resultados em PDF;
- Geração automática da solução ótima;
- Histórico de cálculos;
- Salvamento de problemas.

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos.

Sinta-se à vontade para utilizá-lo como material de estudo.

---
