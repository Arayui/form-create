import {defineComponent, ref, resolveComponent, toRef, watch} from 'vue';
import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcCheckbox';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        formCreateInject: Object,
        modelValue: {
            type: Array,
            default: () => []
        },
        type: String,
    },
    emits: ['update:modelValue', 'fc.el'],
    setup(props, _) {
        const options = toRef(props.formCreateInject, 'options', []);
        const value = toRef(props, 'modelValue');
        const _options = () => {
            return Array.isArray(options.value) ? options.value : []
        }
        return {
            options: _options,
            value,
            onInput(n) {
                _.emit('update:modelValue', n);
            }
        }
    },
    render() {
        const name = this.type === 'button' ? 'ElCheckboxButton' : 'ElCheckbox';
        const Type = resolveComponent(name);
        return <ElCheckboxGroup {...this.$attrs} modelValue={this.value} v-slots={getSlot(this.$slots, ['default'])}
            onUpdate:modelValue={this.onInput} ref="el">{this.options().map((opt, index) => {
                const props = {...opt};
                const value = props.value;
                const label = props.label;
                delete props.value;
                delete props.label;
                return <Type {...props} label={label} value={value}
                    key={name + index + '-' + value}>{label || value || ''}</Type>
            })}{this.$slots.default?.()}</ElCheckboxGroup>
    },
    mounted(){
        this.$emit('fc.el',this.$refs.el);
    }
});
