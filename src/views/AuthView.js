import Vue from 'vue';
import {AmplifyEventBus} from 'aws-amplify-vue';

export default class AuthView extends Vue {
    constructor() {
        super();

        this._registerListeners();
    }

    _registerListeners() {
        AmplifyEventBus.$on('authState', info => {
            const event = info.charAt(0).toUpperCase() + info.slice(1);

            const handler = `handle${event}`;

            if (this[handler]) {
                this[handler]();
            }
        });
    }
}
