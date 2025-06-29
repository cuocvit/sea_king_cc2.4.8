// import cc from './cc';

export default class MyComponent extends cc.Component {
    onClick(): void {
        // Click handling logic here
    }
}

const MyComponentDecorator = cc._decorator.ccclass;
const MyComponentProperty = cc._decorator.property;

@MyComponentDecorator
class c extends MyComponent {
    // Additional properties and methods can be added here
}