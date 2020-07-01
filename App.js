import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { value: goalTitle, id: Math.random().toString() },
    ]);
    setIsAddMode(false);
  };

  const deleteGoalHandler = goalID => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goalID !== goal.id);
    });
  };

  const cancelGoalEditHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        onAddGoal={addGoalHandler}
        visible={isAddMode}
        onCancel={cancelGoalEditHandler}
      />
      <FlatList
        keyExtractor={item => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            title={itemData.item.value}
            id={itemData.item.id}
            onDelete={deleteGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
