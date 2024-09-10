const axios = require('axios');
const dotenv = require('dotenv');
const prompt = require('prompt-sync')();

dotenv.config();

// Configurações de ambiente
const PROTOCOL = process.env.PROTOCOL;
const BASE_URL = process.env.BASE_URL;
const BASE_URL2 = process.env.BASE_URL2;
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

    // Seleciona o primeiro resultado por padrão
    const { lat, lon } = response.data[0];
    console.log(`\nCoordenadas selecionadas de ${cityName}: Latitude ${lat}, Longitude ${lon}`);
    getConditions(lat,lon,cityName);
  } catch (error) {
    console.error('Erro ao obter coordenadas:', error.message);
  }
}

async function getConditions(lat, lon, cityName) {
  try {
    const url = `${PROTOCOL}://${BASE_URL2}?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_BR`;
    const response = await axios.get(url);

    const feels_like = response.data.main.feels_like;
    const description = response.data.weather[0].description;

    // Converte de Kelvin para Celsius e formata para duas casas decimais
    const feels_celsius = (feels_like - 273.15).toFixed(2);

    // Seleciona o primeiro resultado por padrão
    console.log(`\nDe acordo com as coordenadas da cidade de ${cityName}, a sensação térmica é ${feels_celsius} oC e sua descrição é ${description}\n`);
  }catch (error) {
    console.error('Erro ao obter condições:', error.message);
  }
}

// Captura o nome da cidade do usuário
const cityName = prompt('Digite o nome da cidade: ');

// Chama a função para obter as coordenadas
getCoordinates(cityName);
