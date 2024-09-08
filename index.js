const axios = require('axios');
const dotenv = require('dotenv');
const prompt = require('prompt-sync')();

dotenv.config();

// Configurações de ambiente
const PROTOCOL = process.env.PROTOCOL;
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

// Função para obter coordenadas a partir do nome da cidade
async function getCoordinates(cityName) {
  try {
    const url = `${PROTOCOL}://${BASE_URL}?q=${cityName}&appid=${API_KEY}`;
    const response = await axios.get(url);

    // Verifica se há resultados
    if (response.data.length === 0) {
      throw new Error('Cidade não encontrada.');
    }

    // Exibe todas as opções encontradas
    console.log(`\nResultados para "${cityName}":`);
    response.data.forEach((location, index) => {
      console.log(`\nOpção ${index + 1}:`);
      console.log(`Nome: ${location.name}`);
      console.log(`País: ${location.country}`);
      console.log(`Estado: ${location.state || 'Não especificado'}`);
      console.log(`Latitude: ${location.lat}, Longitude: ${location.lon}`);
    });

    // Seleciona o primeiro resultado por padrão
    const { lat, lon } = response.data[0];
    console.log(`\nCoordenadas selecionadas de ${cityName}: Latitude ${lat}, Longitude ${lon}`);
    return { lat, lon };
  } catch (error) {
    console.error('Erro ao obter coordenadas:', error.message);
  }
}

async function getConditions(lat, lon) {
  
}

// Captura o nome da cidade do usuário
const cityName = prompt('Digite o nome da cidade: ');

// Chama a função para obter as coordenadas
getCoordinates(cityName);
