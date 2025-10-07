// App.js

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Alert,
  Button, // Importamos o componente Button para os filtros
} from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as Database from './services/Database';
import Formulario from './components/Formulario';
import ListaRegistros from './components/ListaRegistros';
import * as Sharing from 'expo-sharing';
import Grafico from './components/Grafico'; // DESAFIO 2: Importamos o novo componente

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  
  // DESAFIO FINAL: Estado para controlar a edição (substitui o antigo editingId)
  const [registroEmEdicao, setRegistroEmEdicao] = useState(null);

  // DESAFIO 1: Estado para controlar a ordenação
  const [ordenacao, setOrdenacao] = useState('recentes');

  useEffect(() => {
    Database.carregarDados().then(dados => {
      setRegistros(dados);
      setCarregando(false);
    });
  }, []);

  useEffect(() => {
    if (!carregando) {
      Database.salvarDados(registros);
    }
  }, [registros, carregando]);

  // DESAFIO FINAL: Função para iniciar a edição
  const handleIniciarEdicao = (registro) => {
    setRegistroEmEdicao(registro);
    Alert.alert("Modo de Edição", "Altere os dados no formulário e salve.");
  };

  // DESAFIO FINAL: Função para cancelar a edição
  const handleCancelarEdicao = () => {
    setRegistroEmEdicao(null);
  };

  // DESAFIO FINAL: handleSave agora sabe criar E atualizar
  const handleSave = (novosTruques, horasSkate, quedas) => {
    const truquesNum = parseInt(novosTruques) || 0;
    const horasNum = parseFloat(String(horasSkate).replace(',', '.')) || 0;
    const quedasNum = parseInt(quedas) || 0;

    if (truquesNum < 0 || horasNum < 0 || quedasNum < 0) {
      return Alert.alert("Dados Inválidos", "Nenhum valor pode ser negativo.");
    }

    if (registroEmEdicao) {
      // MODO UPDATE
      const registrosAtualizados = registros.map(reg =>
        reg.id === registroEmEdicao.id
          ? { ...reg, novosTruques: truquesNum, horasSkate: horasNum, quedas: quedasNum }
          : reg
      );
      setRegistros(registrosAtualizados);
      Alert.alert('Sucesso!', 'Rolê atualizado!');
    } else {
      // MODO CREATE
      const novoRegistro = {
        id: new Date().getTime(),
        data: new Date().toLocaleDateString('pt-BR'),
        novosTruques: truquesNum,
        horasSkate: horasNum,
        quedas: quedasNum,
      };
      setRegistros([...registros, novoRegistro]);
      Alert.alert('Sucesso!', 'Seu rolê foi registrado!');
    }

    setRegistroEmEdicao(null); // Limpa o modo de edição e o formulário
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão", "Tem certeza que deseja apagar este rolê?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar", style: "destructive", onPress: () => {
            setRegistros(registros.filter(reg => reg.id !== id));
            Alert.alert('Sucesso!', 'Registro do rolê deletado.');
          }
        }
      ]
    );
  };

  const exportarDados = async () => {
    const fileUri = FileSystem.documentDirectory + 'dados.json';
    if (registros.length === 0) { return Alert.alert("Aviso", "Nenhum dado para exportar."); }
    if (Platform.OS === 'web') {
        const jsonString = JSON.stringify(registros, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'dados.json'; a.click();
        URL.revokeObjectURL(url);
    } else {
        if (!(await Sharing.isAvailableAsync())) { return Alert.alert("Erro", "Compartilhamento não disponível."); }
        await Sharing.shareAsync(fileUri);
    }
  };
  
  // DESAFIO 1: Lógica de Ordenação
  let registrosExibidos = [...registros]; // Sempre trabalhe com uma cópia!
  if (ordenacao === 'maior_horas') {
    // Ordena por quem tem mais horas de skate
    registrosExibidos.sort((a, b) => b.horasSkate - a.horasSkate);
  } else {
    // Ordenação padrão por 'recentes' (ID maior = mais recente)
    registrosExibidos.sort((a, b) => b.id - a.id);
  }

  if (carregando) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#e67e22" /></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Meu Rolê Diário </Text>
        <Text style={styles.subtituloApp}>Registre e analise suas sessions</Text>
        
        {/* DESAFIO 2: Usando o componente de Gráfico */}
        <Grafico registros={registrosExibidos} />

        <Formulario
          onSave={handleSave}
          onCancel={handleCancelarEdicao}
          registroEmEdicao={registroEmEdicao}
        />

        {/* DESAFIO 1: Botões de Ordenação */}
        <View style={styles.filtrosContainer}>
            <TouchableOpacity style={ordenacao === 'recentes' ? styles.filtroBotaoAtivo : styles.filtroBotao} onPress={() => setOrdenacao('recentes')}>
                <Text style={styles.filtroTexto}>Mais Recentes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ordenacao === 'maior_horas' ? styles.filtroBotaoAtivo : styles.filtroBotao} onPress={() => setOrdenacao('maior_horas')}>
                <Text style={styles.filtroTexto}>Mais Horas de Rolê</Text>
            </TouchableOpacity>
        </View>

        <ListaRegistros
          registros={registrosExibidos} // Passa a lista já ordenada
          onEdit={handleIniciarEdicao}
          onDelete={handleDelete}
        />

        <View style={styles.card}>
            <Text style={styles.subtitulo}>Exportar "Banco de Dados"</Text>
            <TouchableOpacity style={styles.botaoExportar} onPress={exportarDados}>
                <Text style={styles.botaoTexto}>Exportar arquivo dados.json</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0, backgroundColor: '#ecf0f1' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: '#2c3e50' },
  subtituloApp: { textAlign: 'center', fontSize: 16, color: '#7f8c8d', marginBottom: 20, fontStyle: 'italic' },
  card: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, elevation: 3 },
  subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
  botaoExportar: { backgroundColor: '#27ae60', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 5 },
  botaoTexto: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  filtrosContainer: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 15, marginBottom: 10 },
  filtroBotao: { paddingVertical: 8, paddingHorizontal: 15, backgroundColor: '#bdc3c7', borderRadius: 20 },
  filtroBotaoAtivo: { paddingVertical: 8, paddingHorizontal: 15, backgroundColor: '#e67e22', borderRadius: 20 },
  filtroTexto: { color: 'white', fontWeight: 'bold' },
});