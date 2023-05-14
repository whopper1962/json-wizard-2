<template>
  <div class="xlsx-csv-column-selector-outer card">
    <div class="card-header title">
      {{ $t("app.columnOrderSelect") }}
    </div>
    <div
      v-if="columnOrder.length > 0"
      class="card-body xlsx-csv-column-selector-inner"
    >
      <Draggable v-model="columnOrder" :move="onMoveCallback" :animation="200">
        <template v-for="(column, index) in columnOrder">
          <div
            class="card column-card-outer"
            :class="{
              'bg-warning': index === 0,
              'bg-yellowgreen': index > 0,
            }"
            :key="`elem_${index}`"
            @mouseenter="onMouseenter(column)"
            @mouseleave="onMouseenter(null)"
          >
            <div class="column-card-inner">
              <span class="font-weight-bold column-text">
                Column{{ column + 1 }}
              </span>
              <div class="xmark-icon-wrapper">
                <font-awesome-icon
                  :icon="
                    hoveredIndex === index
                      ? ['fas', 'circle-xmark']
                      : ['far', 'circle-xmark']
                  "
                  @mouseenter="hoveredIndex = index"
                  @mouseleave="hoveredIndex = null"
                  class="xmark-icon"
                  @click="remove(column)"
                />
              </div>
            </div>
          </div>
        </template>
      </Draggable>
    </div>
    <div v-else class="area-placeholder">
      Click "Add to order" to add column here.
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  components: {
    Draggable,
  },
  data() {
    return {
      isMoving: false,
      hoveredIndex: null,
    };
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    columnOrder: {
      get() {
        return this.value;
      },
      set(order) {
        this.isMoving = false;
        const isValueChanged = this.value[0] !== order[0];
        if (isValueChanged) {
          const result = confirm(
            "External file info will be discarded. You sure want to change the value column?"
          );
          if (!result) return;
        }
        this.$emit("input", {
          isValueChanged,
          order,
        });
      },
    },
  },
  methods: {
    onMoveCallback() {
      this.isMoving = true;
      setTimeout(() => {
        this.isMoving = false;
      }, 100);
    },
    reset() {
      if (this.isMoving) return;
      this.$emit("updateHighlightedColumn", null);
    },
    onMouseenter(column) {
      if (this.isMoving) return;
      this.$emit("updateHighlightedColumn", column);
    },
    remove(columnIndex) {
      if (this.value[0] === columnIndex) {
        const result = confirm(
          "External file info will be discarded. You sure want to delete the value column?"
        );
        if (!result) return;
      }
      this.$store.dispatch("removeColumnFromOrder", columnIndex);
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 12px;
}
.xlsx-csv-column-selector-outer {
  margin-bottom: 2%;
  height: 47%;
}
.xlsx-csv-column-selector-inner {
  height: 200px;
  overflow: auto;
}
.column-card-outer {
  width: 100%;
  margin-bottom: 5px;
  cursor: move;
  height: 30px;
}
.column-card-inner {
  display: flex;
  justify-content: center;
  position: relative;
}
.xmark-icon-wrapper {
  position: absolute;
  right: 0;
}
.xmark-icon {
  cursor: pointer;
  height: 1.7rem;
  margin-right: 5px;
  margin-top: 6px;
}
.column-text {
  margin-top: 7px;
  font-size: 10px;
}
.bg-yellowgreen {
  background-color: yellowgreen;
}
.area-placeholder {
  margin: auto;
}
</style>
