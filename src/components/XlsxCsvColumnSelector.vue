<template>
  <div class="xlsx-csv-column-selector-outer card">
    <div class="card-header">
      Drag and choose the column order
    </div>
    <div class="card-body xlsx-csv-column-selector-inner">
      <Draggable v-model="myArray">
        <template v-for="(element, index) in myArray">
          <div
            class="card column-card-outer"
            :class="{
              'bg-warning': index === 0,
              'bg-yellowgreen': index > 0
            }"
            :key="`elem_${index}`"
          >
            <div class="column-card-inner">
              {{element.name}}
            </div>
          </div>
        </template>
      </Draggable>
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
      myArray: [
        {
          name: 'Column1'
        },
        {
          name: 'Column2'
        },
        {
          name: 'Column3'
        }
      ]
    };
  },
  computed: {},
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
</style>