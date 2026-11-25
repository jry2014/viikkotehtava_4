import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { styles } from './App.styles';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const STORAGE_KEY = '@todos-list/tasks';

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false;
  const todo = value as Record<string, unknown>;
  return (
    typeof todo.id === 'string' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean'
  );
}
function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown error';
}

function TodoRow({
  todo,
  onPress,
}: {
  todo: Todo;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.todoRow}>
      <Text style={styles.checkbox}>{todo.completed ? '✓' : '○'}</Text>
      <Text style={[styles.todoText, todo.completed && styles.completedText]}>
        {todo.title}
      </Text>
    </Pressable>
  );
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadTodos() {
      try {
        const savedTodos = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed: unknown = savedTodos ? JSON.parse(savedTodos) : [];

        if (!Array.isArray(parsed) || !parsed.every(isTodo)) {
          throw new Error('Saved tasks have an invalid format.');
        }

        if (active) {
          setTodos(parsed);
          setLoadError('');
          setLoading(false);
        }
      } catch (error) {
        if (active) {
          setLoadError(`Unable to load tasks: ${getErrorMessage(error)}`);
          setLoading(false);
        }
      }
    }

    loadTodos();
    return () => {
      active = false;
    };
  }, [retryCount]);

  useEffect(() => {
    if (loading || loadError) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
      .then(() => setSaveError(''))
      .catch((error: unknown) => {
        setSaveError(`Unable to save tasks: ${getErrorMessage(error)}`);
      });
  }, [todos, loading, loadError]);

  function addTodo() {
    const title = newTodo.trim();
    if (!title) return;

    setTodos((currentTodos) => [
      { id: `${Date.now()}-${Math.random()}`, title, completed: false },
      ...currentTodos,
    ]);
    setNewTodo('');
  }

  function toggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function retryLoading() {
    setLoading(true);
    setLoadError('');
    setRetryCount((count) => count + 1);
  }

  if (loading || loadError) {
    return (
      <View style={styles.center}>
        <StatusBar style="dark" />
        <Text style={styles.message}>
          {loading ? 'Loading tasks...' : loadError}
        </Text>
        {!loading && (
          <Pressable onPress={retryLoading}>
            <Text style={styles.retry}>Try again</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.heading}>My tasks</Text>

      <View style={styles.addRow}>
        <TextInput
          accessibilityLabel="New task"
          onChangeText={setNewTodo}
          onSubmitEditing={addTodo}
          placeholder="Add a task"
          returnKeyType="done"
          style={styles.input}
          value={newTodo}
        />
        <Pressable
          accessibilityRole="button"
          disabled={!newTodo.trim()}
          onPress={addTodo}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      {!!saveError && <Text style={styles.error}>{saveError}</Text>}

      <FlatList
        data={todos}
        keyExtractor={(todo) => todo.id}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No tasks yet. Add one above.</Text>
        }
        renderItem={({ item }) => (
          <TodoRow todo={item} onPress={() => toggleTodo(item.id)} />
        )}
      />
    </View>
  );
}
