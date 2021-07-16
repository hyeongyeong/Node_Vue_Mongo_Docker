<template>
  <div class="content">
    <TodoHeader />
    <TodoTitle />
    <TodoInput />
    <TodoController />
    <TodoList />
    <TodoFooter />
  </div>
</template>

<script>
import TodoHeader from "../components/Suggestion/TodoHeader";
import TodoTitle from "../components/Suggestion/TodoTitle";
import TodoInput from "../components/Suggestion/TodoInput";
import TodoController from "../components/Suggestion/TodoController";
import TodoList from "../components/Suggestion/TodoList";
import TodoFooter from "../components/Suggestion/TodoFooter";
 
export default {
  name: "App",
  components: {
    TodoHeader,
    TodoTitle,
    TodoInput,
    TodoController,
    TodoList,
    TodoFooter
  }
};
</script>