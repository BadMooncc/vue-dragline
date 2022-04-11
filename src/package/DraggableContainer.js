import { unique, checkArrayWithPush, getMaxDistance } from '../utils/utils';
export default {
    name: 'draggable-container',
    props: {
        Container: 'div',
        styles: Object,
        directions: {
            type: Array,
            default: () => ['tt', 'bb', 'll', 'rr', 'tb', 'lr' ]
        },
        threshold: {
            type: Number,
            default: 5
        },
        className: {
            type: String,
            default: ''
        },
        limit: {
            type: Boolean,
            default: true,
        },
        lineStyle: {
            type: Object,
            default: () => ({})
        },
    },
    data() {
        return {
            $: null,
            indices: [],
            vLines: [],
            hLines: [],
            children: []
        };
    },
    mounted() {
        this.$ = this.$refs.container;
    // console.log(this.$, 'this.$')
    },
    methods: {
        initialize() {
            this.children = this.$children.map((child, i) => {
                const $ = child.$el;
                const x = Number($.getAttribute('data-x'));
                const y = Number($.getAttribute('data-y'));
                const w = $.clientWidth;
                const h = $.clientHeight;
                return {
                    $,
                    i,
                    x,
                    y,
                    w,
                    h,
                    l: x,
                    r: x + w,
                    t: y,
                    b: y + h,
                    lr: x + w / 2,
                    tb: y + h / 2,
                };
            });
        },
        reset() {
            this.vLines = [];
            this.hLines = [];
            this.indices = [];
        },
        // 拖动中计算是否吸附/显示辅助线
        calc(index) {
            return (x, y) => {
                const target = this.children[index];
                const compares = this.children.filter((_, i) => i !== index);
                // console.log(compares, target, 'target')
                // 是否允许拖拽出边界
                if (this.limit) {
                    const { limitX, limitY } = this.checkDragOut({ x, y }, target);
                    x = limitX;
                    y = limitY;
                }
                if (compares.length === 0) {
                    return { x, y };
                }
                // console.log(compares, 'target')
                return this.calcAndDrawLines({ x, y }, target, compares);
            };
        },
        /**
   * @param {Object} values xy坐标
   * @param {Object} target 拖拽目标
   * @param {Array} compares 对照组
   */
        calcAndDrawLines(values, target, compares) {
            const { v: x, indices: indices_x, lines: vLines } = this.calcPosValues(values, target, compares, 'x');
            const { v: y, indices: indices_y, lines: hLines } = this.calcPosValues(values, target, compares, 'y');
            // console.log(compares, 'vLines')
            const indices = unique(indices_x.concat(indices_y));
            // https://github.com/zcued/react-dragline/issues/9
            if (vLines.length && hLines.length) {
                vLines.forEach(line => {
                    const compare = compares.find(({ i }) => i === line.i);
                    const { length, origin } = this.calcLineValues({ x, y }, target, compare, 'x');
                    line.length = length;
                    line.origin = origin;
                });
                hLines.forEach(line => {
                    const compare = compares.find(({ i }) => i === line.i);
                    const { length, origin } = this.calcLineValues({ x, y }, target, compare, 'y');
                    line.length = length;
                    line.origin = origin;
                });
            }
            this.vLines = vLines;
            this.hLines = hLines;
            this.indices = indices;
            // console.log(x, y, 'this.hLines')
            return { x, y };
        },
        calcLineValues(values, target, compare, key) {
            const { x, y } = values;
            const { h: H, w: W } = target;
            const { l, r, t, b } = compare;
            const
                T = y,
                B = y + H,
                L = x,
                R = x + W;
            const direValues = {
                x: [t, b, T, B],
                y: [l, r, L, R],
            };
            const length = getMaxDistance(direValues[key]);
            const origin = Math.min(...direValues[key]);
            return { length, origin };
        },
        calcPosValues(values, target, compares, key) {
            const results = {};
            const directions = {
                x: ['ll', 'rr', 'lr'],
                y: ['tt', 'bb', 'tb'],
            };
            // filter unnecessary directions
            const validDirections = directions[key].filter(dire => this.directions.includes(dire));
            compares.forEach((compare) => {
                validDirections.forEach(dire => {
                    const { near, dist, value, origin, length } = this.calcPosValuesSingle(values, dire, target, compare, key);
                    if (near) {
                        checkArrayWithPush(results, dist, { i: compare.i, $: compare.$ , value, origin, length });
                    }
                });
            });
            const resultArray = Object.entries(results);
            if (resultArray.length) {
                const [minDistance, activeCompares] = resultArray.sort(([dist1], [dist2]) => Math.abs(dist1) - Math.abs(dist2))[0];
                const dist = parseInt(minDistance);
                // console.log(values[key] - dist, 'resultArray')
                return {
                    v: values[key] - dist,
                    dist: dist,
                    lines: activeCompares,
                    indices: activeCompares.map(({ i }) => i),
                };
            }
            return {
                v: values[key],
                dist: 0,
                lines: [],
                indices: [],
            };
        },
        calcPosValuesSingle(values, dire, target, compare, key) {
            // console.log(values, dire, target, compare, key)
            const { x, y } = values;
            const W = target.w;
            const H = target.h;
            const { l, r, t, b, lr, tb } = compare;
            const { origin, length } = this.calcLineValues({ x, y }, target, compare, key);
            const result = {
                // 距离是否达到吸附阈值
                near: false,
                // 距离差
                dist: Number.MAX_SAFE_INTEGER,
                // 辅助线坐标
                value: 0,
                // 辅助线长度
                length,
                // 辅助线起始坐标（对应绝对定位的top/left）
                origin,
            };
            switch (dire) {
            case 'lr':
                result.dist = x + W / 2 - lr;
                result.value = lr;
                break;
            case 'll':
                result.dist = x - l;
                result.value = l;
                break;
            case 'rr':
                result.dist = x + W - r;
                result.value = r;
                break;
            case 'tt':
                result.dist = y - t;
                result.value = t;
                break;
            case 'bb':
                result.dist = y + H - b;
                result.value = b;
                break;
            case 'tb':
                result.dist = y + H / 2 - tb;
                result.value = tb;
                break;
            }
            // console.log(Math.abs(result.dist), this.threshold + 1, 'xxxxx')
            if (Math.abs(result.dist) < this.threshold + 1) {
                result.near = true;
                // console.log(result, 'near')
            }
  
            return result;
        },
        // 检查是否拖出容器
        checkDragOut({ x, y }, target) {
            const maxLeft = this.$.clientWidth - target.w;
            const maxTop = this.$.clientHeight - target.h;
      
            let limitX = x;
            let limitY = y;

            if (x < 0) {
                limitX = 0;
            } else if (x > maxLeft) {
                limitX = maxLeft;
            }
            if (y < 0) {
                limitY = 0;
            } if (y > maxTop) {
                limitY = maxTop;
            }
            return { limitX, limitY };
        },
        _renderGuideLine() {
            // const { vLines, hLines } = this.state
            // const { lineStyle } = this.props

            const commonStyle = {
                position: 'absolute',
                backgroundColor: '#FF00CC',
                ...this.lineStyle,
            };
            // // console.log(this.vLines, this.hLines, 'this.vLines')
            // support react 15
            // const Container = React.Fragment || 'div'

            return (
                <div>
                    {this.vLines.map(({ length, value, origin }, i) => (
                        <span
                            className="v-line"
                            key={`v-${i}`}
                            style={{ left: `${value}px`, top: `${origin}px`, height: `${length}px`, width: '1px', ...commonStyle }}
                        />
                    ))}
                    {this.hLines.map(({ length, value, origin }, i) => (
                        <span
                            className="h-line"
                            key={`h-${i}`}
                            style={{ top: `${value}px`, left: `${origin}px`, width: `${length}px`, height: '1px', ...commonStyle }}
                        />
                    ))}
                </div>
            );
        },
        _renderChildren() {
            this.$slots.default[0].className = '123';
            return (
                this.$slots.default.map((item, index) => {
                    if(item.elm) {
                        item.elm.className = 'draggable resizable vdr item';
                        this.indices.includes(item.key - 1) && (item.elm.className = this.$slots.default[0].elm.className + ' active-item');
                    }
                    item.componentOptions.propsData = {
                        ...item.componentOptions.propsData,
                        _start: this.initialize,
                        _drag: this.calc(index),
                        _stop: this.reset,
                    };
                    return item;
                })
            );
        }
    },
    render(h) {
        return (
            <div class="dragable-container" style={this.styles} ref="container">
                {this._renderChildren()}
                {this._renderGuideLine()}
            </div>
        );
    }
};