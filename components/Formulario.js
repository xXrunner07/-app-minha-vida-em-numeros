// components/Formulario.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Formulario({ onSave, onCancel, registroEmEdicao }) {
  // AÇÃO 1 e 2: Novos estados para o tema Skate
  const [novosTruques, setNovosTruques] = useState('');
  const [horasSkate, setHorasSkate] = useState('');
  const [quedas, setQuedas] = useState('');

  useEffect(() => {
    if (registroEmEdicao) {
      // Preenche o formulário com os dados existentes para edição
      setNovosTruques(String(registroEmEdicao.novosTruques));
      setHorasSkate(String(registroEmEdicao.horasSkate));
      setQuedas(String(registroEmEdicao.quedas));
    } else {
      // Limpa o formulário quando não está em modo de edição
      setNovosTruques('');
      setHorasSkate('');
      setQuedas('');
    }
  }, [registroEmEdicao]);

  const handleSaveClick = () => {
    // AÇÃO 2 (Parte 2.2): Envia os três novos valores para o App.js
    onSave(novosTruques, horasSkate, quedas);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>
        {registroEmEdicao ? 'Editando o Rolê (Update)' : 'Novo Rolê (Create)'}
      </Text>

      {/* AÇÃO 3: Novos TextInputs com placeholders do tema Skate */}
      <TextInput style={styles.input} placeholder="Truques novos aprendidos" keyboardType="numeric" value={novosTruques} onChangeText={setNovosTruques} />
      <TextInput style={styles.input} placeholder="Horas de rolê" keyboardType="numeric" value={horasSkate} onChangeText={setHorasSkate} />
      <TextInput style={styles.input} placeholder="Número de quedas" keyboardType="numeric" value={quedas} onChangeText={setQuedas} />

      <TouchableOpacity style={styles.botao} onPress={handleSaveClick}>
        <Text style={styles.botaoTexto}>
          {registroEmEdicao ? 'Atualizar Rolê' : 'Salvar Rolê'}
        </Text>
      </TouchableOpacity>

      {registroEmEdicao && (
        <TouchableOpacity style={styles.botaoCancelar} onPress={onCancel}>
          <Text style={styles.botaoTexto}>Cancelar Edição</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// PASSO 3: Novas cores para o tema Skate
const styles = StyleSheet.create({
    card: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
    subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
    input: { borderWidth: 1, borderColor: '#bdc3c7', borderRadius: 5, padding: 12, fontSize: 16, marginBottom: 10 },
    botao: { backgroundColor: '#e67e22', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 5 },
    botaoTexto: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    botaoCancelar: { backgroundColor: '#95a5a6', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
});