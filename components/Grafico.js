// components/Grafico.js

import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Grafico({ registros }) {
  // O gráfico só será exibido se houver 2 ou mais registros
  if (registros.length < 2) {
    return (
      <View style={styles.containerVazio}>
        <Text style={styles.textoVazio}>
          Adicione pelo menos 2 rolês para ver sua evolução!
        </Text>
      </View>
    );
  }

  // Prepara os dados para o gráfico
  const data = {
    // Eixo X: Pega a data de cada registro, mostrando dia/mês
    labels: registros.map(reg => new Date(reg.id).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })).reverse(),
    datasets: [
      {
        // Eixo Y: Pega o valor de 'horasSkate' de cada registro
        data: registros.map(reg => reg.horasSkate).reverse(),
      },
    ],
  };

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Evolução (Horas de Rolê)</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 40} // Largura da tela - margens
        height={220}
        yAxisSuffix="h" // Adiciona um "h" depois do número no eixo Y
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#e67e22',
          backgroundGradientFrom: '#e67e22',
          backgroundGradientTo: '#f39c12',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier // Deixa as linhas curvas
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 10,
        marginHorizontal: 15,
        marginBottom: 20,
        elevation: 3,
        alignItems: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5,
    },
    containerVazio: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 20,
        marginHorizontal: 15,
        marginBottom: 20,
        alignItems: 'center',
    },
    textoVazio: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
    },
});