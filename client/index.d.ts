import Vue from 'vue'
import { Toast } from '~/plugins/iziToast'

declare module '*.vue' {
    export default Vue
}

declare global {
    let defineProps: function
    let defineEmits: function
    let defineExpose: function
    let withDefaults: function
}

declare module 'vue/types/vue' {
    interface Vue {
        $apollo: any
        $iziToast: Toast
    }
}

declare module '@nuxt/types' {
    interface Context {
        $iziToast: Toast
    }

    interface NuxtAppOptions {
        $iziToast: Toast
    }
}

declare module 'vue/types/options' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ComponentOptions<V extends Vue> {
        apollo?: any
    }
}
