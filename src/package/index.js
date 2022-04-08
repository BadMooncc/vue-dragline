import DraggableChild from './DraggableChild';
import DraggableContainer from './DraggableContainer';

const components = [
    DraggableChild,
    DraggableContainer
];

const install = (_vue) => {
    if (install.installed) return;
    components.forEach((component) => {
        _vue.component(component.name, component);
    });
};

export default{
    version: '1.0.0',
    install
};