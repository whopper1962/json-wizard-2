<template>
  <div class="xlsx-csv-column-selector-outer card">
    <div class="card-header">
      Drag and choose the column order
    </div>
    <div
      v-if="columnOrder.length > 0"
      class="card-body xlsx-csv-column-selector-inner"
    >
      <Draggable v-model="columnOrder" :move="onMoveCallback">
        <template v-for="(column, index) in columnOrder">
          <div
            class="card column-card-outer"
            :class="{
              'bg-warning': index === 0,
              'bg-yellowgreen': index > 0
            }"
            :key="`elem_${index}`"
            @mouseenter="onMouseenter(column)"
            @mouseleave="onMouseenter(null)"
          >
            <!-- @mousedown="updateHighlightedColumn(column)"
            @mouseup="updateHighlightedColumn(null)" -->
            <div class="column-card-inner">
              <span class="font-weight-bold">
                Column{{ column + 1 }}
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
  data () {
    return {
      isMoving: false
    };
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
        this.isMoving = false;
        const isValueChanged = this.value[0] !== order[0];
        if (isValueChanged) {
          const result = confirm('External file info will be discarded. You sure want to change the value column?');
          if (!result) return;
        }
        this.$emit('input', {
          isValueChanged,
          order
        });
      }
    }
  },
  methods: {
    onMoveCallback (){
      this.isMoving = true;
      setTimeout(() => {
        this.isMoving = false;
      }, 100);
    },
    reset () {
      if (this.isMoving) return;
      this.$emit('updateHighlightedColumn', null);
    },
    onMouseenter (column) {
      if (this.isMoving) return;
      this.$emit('updateHighlightedColumn', column);
    }
  }
}
</script>

<style scoped>
.xlsx-csv-column-selector-outer {
  margin-right: 5px;
  margin-bottom: 2%;
  height: 50%;
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