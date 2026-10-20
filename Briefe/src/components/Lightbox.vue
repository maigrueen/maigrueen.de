<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";

// bilder: [{ src, text }], modelValue: Index des geöffneten Bildes oder null (geschlossen)
const props = defineProps({
  bilder: { type: Array, default: () => [] },
  modelValue: { type: Number, default: null },
});
const emit = defineEmits(["update:modelValue"]);

const dlg = ref(null);
const gross = ref(false);
const bild = computed(() => (props.modelValue === null ? null : props.bilder[props.modelValue] ?? null));

watch(
  () => props.modelValue,
  async (i) => {
    gross.value = false;
    document.body.style.overflow = i === null ? "" : "hidden";
    await nextTick();
    if (!dlg.value) return;
    if (i !== null && !dlg.value.open) dlg.value.showModal();
    if (i === null && dlg.value.open) dlg.value.close();
  }
);

const schliessen = () => emit("update:modelValue", null);
const weiter = (d) => emit("update:modelValue", (props.modelValue + d + props.bilder.length) % props.bilder.length);
const taste = (e) => {
  if (e.key === "ArrowRight") weiter(1);
  if (e.key === "ArrowLeft") weiter(-1);
};
onBeforeUnmount(() => (document.body.style.overflow = ""));
</script>

<template>
  <!-- Esc schließt den Dialog von selbst, @close meldet das nach außen -->
  <dialog ref="dlg" class="lb" aria-label="Bildansicht" @close="schliessen" @keydown="taste">
    <div v-if="bild" class="rahmen" @click.self="schliessen">
      <div class="buehne" :class="{ gross }">
        <img :src="bild.src" :alt="bild.text" @click="gross = !gross" />
      </div>
      <div class="leiste">
        <button v-if="bilder.length > 1" class="lb-btn" type="button" aria-label="Vorheriges Bild" @click="weiter(-1)">‹</button>
        <span>
          {{ bild.text }}<template v-if="bilder.length > 1"> · {{ modelValue + 1 }} / {{ bilder.length }}</template>
        </span>
        <button v-if="bilder.length > 1" class="lb-btn" type="button" aria-label="Nächstes Bild" @click="weiter(1)">›</button>
        <button class="lb-btn" type="button" @click="gross = !gross">{{ gross ? "Einpassen" : "Vergrößern" }}</button>
        <button class="lb-btn" type="button" @click="schliessen">Schließen</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.lb { border: 0; padding: 0; background: transparent; width: 100%; height: 100%; max-width: 100vw; max-height: 100vh; color: #fff; }
.lb::backdrop { background: rgba(0, 0, 0, 0.88); }
.rahmen { width: 100%; height: 100%; box-sizing: border-box; padding: 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.2rem; }
.buehne { max-width: 96vw; max-height: calc(100vh - 9rem); overflow: auto; }
.buehne img { display: block; max-width: 96vw; max-height: calc(100vh - 9rem); object-fit: contain; cursor: zoom-in; }
.buehne.gross img { max-width: none; max-height: none; cursor: zoom-out; }
.leiste { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 1rem; font-size: 1.4rem; }
.lb-btn { height: 38px; padding: 0 18px; color: #fff; background: rgba(0, 0, 0, 0.4); border-color: rgba(255, 255, 255, 0.6); }
.lb-btn:hover, .lb-btn:focus { color: #fff; border-color: #fff; }
</style>
