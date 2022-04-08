<template>
  <draggableContainer class="home">
    <draggableChild
      v-for="item in initialChildren"
      :key="item.id"
      :id="item.id"
      :width="item.width"
      :height="item.height"
      :default-position="item.position">
      <div
        class="item"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'move',
          boxSizing: 'border-box',
          background: item.background,
        }">
        <span>size: {{ item.size }}</span>
        <span>drag me</span>
      </div>
    </draggableChild>
  </draggableContainer>
</template>
<script>
import draggableContainer from '../package/DraggableContainer';
import draggableChild from '../package/DraggableChild';
export default {
    components: {
        draggableContainer,
        draggableChild
    },
    data() {
        return {
            initialChildren: [
                { id: 1, background: '#8ce8df', width: 100, height: 100, position: { x: 100, y: 10 } },
                { id: 2, background: '#8ce8df', width: 100, height: 100, position: { x: 400, y: 106 } },
                { id: 3, background: '#d2aff6', width: 100, height: 100, position: { x: 100, y: 316 } },
                { id: 4, background: '#fee493', width: 100, height: 100, position: { x: 480, y: 376 } },
            ]
        };
    },
    methods: {
        handleClick() {
            alert(1);
        }
    }
};
</script>
<style>
.draggable {
  box-sizing: border-box;
}
.home .vdr {
  border: none;
}
.home {
  height: 100vh;
  width: 100%;
  cursor: move;
  border: 1px solid red;
  position: relative;
}
.home .item {
  width: 100%;
  height: 100%;
}
.home .active {
  border: 1px dashed #999;
}
.active-item {
  opacity: 0.5;
}
</style>