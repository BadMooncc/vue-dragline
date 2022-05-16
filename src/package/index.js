import DraggableChild from './DraggableChild';
import DraggableContainer from './DraggableContainer';
import VueDraggableResizable from 'vue-draggable-resizable';
import './common.css';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

const components = [
    DraggableChild,
    DraggableContainer
];

const install = (_vue) => {
    if (install.installed) return;
    _vue.component('vue-draggable', VueDraggableResizable);
    // _vue.component('vue-draggable', VueDraggableResizable);
    components.forEach((component) => {
        _vue.component(component.name, component);
    });
};

export default{
    version: '1.0.4',
    install
};