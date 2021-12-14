import {computed, defineComponent, inject, toRef, toRefs} from 'vue';
import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcSelect';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        type: String,
    },
    emits: ['update:modelValue'],
    setup(props) {
        const {options} = toRefs(inject('formCreateInject'));
        const value = toRef(props, 'modelValue');
        const _options = () => {
            return Array.isArray(options.value) ? options.value : []
        }
        return {
            options: _options,
            value
        }
    },
    render() {
        return <ElSelect {...this.$attrs} modelValue={this.value}
            onUpdate:modelValue={(v) => this.$emit('update:modelValue', v)}
            v-slots={getSlot(this.$slots, ['default'])}>{this.options().map((props, index) => {
                return <ElOption {...props} key={'' + index + props.value}/>
            })}{this.$slots.default?.()}</ElSelect>;
    }
});
