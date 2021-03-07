<template>
  <q-item :inset-level="InsetLevel">
    <q-item-section avatar>
      <q-icon :name="Icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ Label }}</q-item-label>
      <q-item-label caption>
        <slot />
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn dense :icon="ActionIcon" :color="ActionColor" @click="$emit('click')" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "CbComponentItem",

  props: {
    InsetLevel: {
      type: Number,
      default: 0
    },
    Icon: {
      type: String,
      default: undefined
    },
    ActionIcon: {
      type: String,
      default: undefined
    },
    ActionColor: {
      type: String,
      default: 'primary'
    },
    Label: {
      type: String,
      default: undefined
    }
  },
}
</script>
