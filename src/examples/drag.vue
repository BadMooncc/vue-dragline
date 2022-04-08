<template>
  <div class="hello">
    <div style="height: 100vh; width: 100%;position: relative;">
      <vue-draggable
        :w="100"
        :h="100"
        :x="x"
        :y="y"
        @activated="onActivated"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="true">
        <div style="wdith: 100%;height:100%;background:red;"></div>
      </vue-draggable>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            x: 100,
            y: 100,
        };
    },
    methods: {
        onActivated() {
            // console.log(x, y)
        },
        onDrag() {
            // console.log(x, y)
        },
        onResize() {

        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app .handle {
    width: 7px;
    height: 7px;
    background: #000;
    border: 1px solid #333;
    border-radius: 50%;
}
#app .handle-tl {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}
#app .handle-tm {
  top: -5px;
  left: 50%;
  margin-left: -5px;
  cursor: n-resize;
}
#app .handle-tr {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}
#app .handle-ml, .handle-mr {
    top: 50%;
    margin-top: -5px;
}
#app .handle-ml {
    left: -5px;
    cursor: w-resize;
}
#app .handle-bl {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
}
#app .handle-mr {
    right: -5px;
    cursor: e-resize;
}
#app .handle-bm {
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    cursor: s-resize;
}
#app .handle-br {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}
</style>
