<template>
    <div class="input-container">
        <label>
            {{ label }}
            <span v-if="formRequired">
                *
            </span>
        </label>
        <div class="input-wrapper">
            <span>
                <slot name="icon-left"/>
            </span>
            <input
                :value="modelValue"
                :type="type"
                @input="update($event.target.value)"
            />
            <span v-if="hasSlot('icon-right')" class="icon right" @click="$emit('iconRightClick', $event)">
                <slot name="icon-right"/>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Emit } from 'vue-decorator';

@Options({
    emits: ['update:modelValue'],
})
export default class Input extends Vue {
    @Prop({
        default: 'text',
        required: true,
        validator(value: string): boolean {
            return ['text', 'number', 'email', 'password', 'file'].indexOf(value) !== -1;
        },
    }) private type!: string;
    @Prop({ default: '' }) private label?: string;
    @Prop({ default: false }) private formRequired?: boolean;
    @Prop({ default: '' }) private modelValue!: string;

    hasSlot(slotName: string): boolean {
        return !!this.$slots[slotName];
    }

    @Emit('update:modelValue')
    update(newValue: string) {
        return newValue;
    }
}
</script>

<style scoped lang="scss">
</style>
