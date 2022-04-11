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

</style>
