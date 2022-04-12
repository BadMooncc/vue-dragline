// import { createCoreData } from '../utils/utils'
export default {
    name: 'draggable-child',
    props: {
        active: {
            type: Boolean,
            default: false
        },
        defaultPosition: {
            type: Object,
            default: () => ({ x: 0, y: 0 })
        },
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        },
        // onStart: {
        //     type: Function,
        //     default: () => {}
        // },
        // onDrag: {
        //     type: Function,
        //     default: () => {}
        // },
        // onStop: {
        //     type: Function,
        //     default: () => {}
        // },
        _start: {
            type: Function,
            default: () => {}
        },
        _drag: {
            type: Function,
            default: () => {}
        },
        _stop: {
            type: Function,
            default: () => {}
        },
    },
    data() {
        return {
            x: 0,
            y: 0,
            w: this.width,
            h: this.height,
            // lastY: 0,
            // lastX: 0
        };
    },
    mounted() {
        this.x = this.defaultPosition.x;
        this.y = this.defaultPosition.y;
    },
    methods: {
        onResize(left, top, width, height, children) {
            this.w = width;
            this.h = height;
            this._start();
            this.$emit('resize',{ x: left, y: top, width, height });
        },
        handleStop() {
            this._stop();
            this.$refs[`drag${this.id}`].style.transform = `translate(${this.x}px, ${this.y}px)`;
            this.$emit('stop', { x: this.x, y: this.y, width: this.w, height: this.h });
        },
        handleStart() {
            this._start();
            this.$emit('start', { x: this.x, y: this.y, width: this.w, height: this.h });
        },
        handleDrag(xx, yy) {
            const { x, y } = this._drag(xx, yy);
            this.x = x;
            this.y = y;
            this.$refs[`drag${this.id}`].style.transform = `translate(${this.x}px, ${this.y}px)`;
            this.$emit('drag',{ x: this.x, y: this.y, width: this.w, height: this.h });
        }
    },
    render() {
        const children = this.$slots.default[0];
        // console.log(children);
        return (
            <vue-draggable
                onActivated={this.handleStart}
                x={this.x}
                y={this.y}
                data-x={this.x}
                data-y={this.y}
                ref={`drag${this.id}`}
                name={this.key}
                w={this.width}
                h={this.height}
                onResizing={(left, top, width, height) => this.onResize(left, top, width, height, children)}
                onDragstop = {() => this.handleStop()}
                onDragging={this.handleDrag}>
                <div class={children.data.staticClass} style={children.data.style}>
                    {
                        children.children
                    }
                </div>
            </vue-draggable>
        );
    }
};