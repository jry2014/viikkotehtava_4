import { Pressable, Text } from 'react-native';
import { styles } from './TodoRow.styles';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoRowProps = {
  todo: Todo;
  onPress: () => void;
};

export function TodoRow({ todo, onPress }: TodoRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.todoRow}>
      <Text style={styles.checkbox}>{todo.completed ? '✓' : '○'}</Text>
      <Text style={[styles.todoText, todo.completed && styles.completedText]}>
        {todo.title}
      </Text>
    </Pressable>
  );
}
