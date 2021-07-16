<template>
  <div class="title">
    <p class="title__message">{{ message }}</p>
    <p class="title__task">
      We've got
      <span class="title__task-total">{{ taskTotal }}</span> Suggestions.
    </p>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      message: "Hello,",
      taskTotal: 5
    };
  }
};
</script>