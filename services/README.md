# Meu Diário Fit 💪

Este é um projeto de aplicativo mobile desenvolvido como parte da disciplina de Programação Mobile, do curso técnico de Desenvolvimento de Sistemas, lecionada pelo Professor Artur Scolari. O objetivo do projeto é criar um diário pessoal para registrar e acompanhar métricas diárias, com dados salvos de forma persistente.

## Sobre o Projeto 📝

O **Meu Diário Fit** é um aplicativo para acompanhamento de saúde e bem-estar. Ele permite que o usuário registre diariamente a quantidade de água consumida, os minutos de exercício praticados e as calorias ingeridas. O app também oferece funcionalidades de ordenação dos registros e visualização gráfica da evolução.

### Funcionalidades

- **Registro diário**: O usuário pode registrar dados sobre água consumida, exercício físico e calorias ingeridas.
- **Visualização gráfica**: Gráficos de linha para monitoramento da evolução dos dados.
- **Armazenamento local**: Dados persistem no dispositivo do usuário, utilizando armazenamento local.
- **Ordenação e filtragem**: O app permite ordenar os dados por data ou valor de consumo.
- **Validação**: Garantia de dados válidos com checagem contra valores negativos.

## Tecnologias Utilizadas 🚀

* **React Native**: Framework para desenvolvimento de apps mobile.
* **Expo**: Plataforma e conjunto de ferramentas para facilitar o desenvolvimento com React Native.
* **JavaScript**: Linguagem de programação principal.
* **AsyncStorage**: Para persistência de dados localmente no dispositivo.
* **React Native Chart Kit**: Para a visualização de dados em gráficos.

## Funcionalidades Principais ✨

- [x] Criação, Edição e Exclusão de registros diários (CRUD completo).
- [x] Armazenamento local e persistente dos dados.
- [x] Validação para não permitir a entrada de dados negativos.
- [x] Ordenação dos registros por data ou por valor.
- [x] Visualização da evolução de um dos dados em um gráfico de linha.

## Como Executar o Projeto 🚀

### Pré-requisitos

1. **Instalar Node.js**: Acesse [Node.js](https://nodejs.org) e instale a versão mais recente.
2. **Instalar Expo CLI**: No terminal, rode o comando:
   ```bash
   npm install -g expo-cli
