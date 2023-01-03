<template>
  <div class="xlsx-csv-column-selector-outer card">
    <div class="card-header">
      Drag and choose the column order
    </div>
    <div
      v-if="columnOrder.length > 0"
      class="card-body xlsx-csv-column-selector-inner"
    >
      <Draggable v-model="columnOrder">
        <template v-for="(column, index) in columnOrder">
          <div
            class="card column-card-outer"
            :class="{
              'bg-warning': index === 0,
              'bg-yellowgreen': index > 0
            }"
            :key="`elem_${index}`"
          >
            <div class="column-card-inner">
              <span class="font-weight-bold">
                Column{{ column }}
              </span>
            </div>
          </div>
        </template>
      </Draggable>
    </div>
    <div
      v-else
      class="area-placeholder"
    >
      Click "Stage" to add column to here.
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
  components: {
    Draggable
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    columnOrder: {
      get () {
        return this.value;
      },
      set (order) {
        this.$emit('input', order);
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.xlsx-csv-column-selector-outer {
  margin-right: 5px;
  height: 100%;
}
.xlsx-csv-column-selector-inner {
  height: 200px;
  overflow: auto;
}
.column-card-outer {
  display: table;
  width: 100%;
  margin-bottom: 5px;
  cursor: move;
  height: 40px;
}
.column-card-inner {
  display: table-cell;
  vertical-align: middle;
}
.bg-yellowgreen {
  background-color: yellowgreen;
}
.area-placeholder {
  margin: auto;
}
</style>