<template>
  <q-page>
    <div class="flex column">
      <h5 class="q-my-sm">New Build 1</h5>
      <span class="text-grey-6">created 1 day ago</span>
    </div>

    <q-separator class="q-my-lg" />

    <div class="flex row">
      <div class="flex column">

      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Build',

  data() {
    return {
      parts: {
        case: null,
        motherboard: null,
        cpu: null,
        ram: null,
        gpu: null
      }
    }
  },
}
</script>
