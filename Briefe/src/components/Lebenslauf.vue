<script setup>
defineProps({ eintraege: { type: Array, default: () => [] } });
</script>

<template>
  <ul class="lebenslauf">
    <li v-for="e in eintraege" :key="e.zeit + e.titel">
      <time>{{ e.zeit }}</time>
      <em>{{ e.titel }}</em>
      <span v-if="e.text">: {{ e.text }}</span>
    </li>
  </ul>
</template>

<style scoped>
.lebenslauf { list-style: none; border-left: 6px solid var(--timeline); padding-left: 2rem; }
.lebenslauf li { background: var(--background-timeline); padding: 1.5rem; margin-bottom: 1.5rem; }
time { display: block; font-size: 1.2rem; font-weight: bold; margin-bottom: 0.5rem; }
</style>
