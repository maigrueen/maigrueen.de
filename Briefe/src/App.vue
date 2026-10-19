<script setup>
import ThemeToggle from "./components/ThemeToggle.vue";
</script>

<template>
  <div>
    <header>
      <img src="./assets/logo.png" alt="Logo" />
      <ThemeToggle />
    </header>
    <nav>
      <router-link to="/">Briefe</router-link>
      <router-link to="/mann">Fritz</router-link>
      <router-link to="/frau">Erna</router-link>
      <router-link to="/karte">Karte</router-link>
    </nav>
    <main><router-view /></main>
  </div>
</template>

<style>
@import "./assets/base.css";

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5%;
  margin-bottom: 2%;
}
header img { max-height: 80px; }
nav { display: flex; flex-wrap: wrap; gap: 2rem; margin-bottom: 3rem; }
nav a.router-link-exact-active { font-weight: 600; }
.meta { font-size: 1.3rem; opacity: 0.8; margin: 0; }
.karte { border: 1px solid var(--btn-color-border); background: var(--background-timeline); padding: 1.5rem; margin-bottom: 2rem; }
</style>
