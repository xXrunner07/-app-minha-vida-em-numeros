// components/ListaRegistros.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Recebemos a nova prop 'onEdit'
export default function ListaRegistros({ registros, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>Histórico de Rolês</Text>
      {registros.length > 0 ? (
        // O array já vem ordenado do App.js, então não precisamos mais do .reverse() aqui
        registros.map(reg => (
          <View key={reg.id} style={styles.itemHistorico}>
            <Text style={styles.itemTexto}>
              <Text style={{ fontWeight: 'bold' }}>{reg.data}</Text> - Truques: {reg.novosTruques}, Rolê: {reg.horasSkate}h, Quedas: {reg.quedas}
            </Text>
            <View style={styles.botoesAcao}>
              {/* DESAFIO FINAL: Adicionando o botão de Editar */}
              <TouchableOpacity style={styles.botaoEditar} onPress={() => onEdit(reg)}>
                <Text style={styles.botaoTextoAcao}>✎</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoDelete} onPress={() => onDelete(reg.id)}>
                <Text style={styles.botaoTextoAcao}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.itemTexto}>Nenhum rolê registrado ainda.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
    subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
    itemHistorico: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ecf0f1' },
    itemTexto: { fontSize: 16, color: '#34495e', flex: 1, marginRight: 10 },
    botoesAcao: { flexDirection: 'row' },
    // Estilo para o novo botão de editar
    botaoEditar: { backgroundColor: '#3498db', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    botaoDelete: { backgroundColor: '#e74c3c', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
    botaoTextoAcao: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});