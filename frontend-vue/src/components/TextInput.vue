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
                @input="emitValue"
            />
            <span v-if="hasSlot('icon-right')" class="icon right" @click="$emit('iconRightClick', $event)">
                <slot name="icon-right"/>
            </span>
        </div>
    </div>
</template>

<script type="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        type: {
            type: String,
            default: 'text',
            required: true,
            validator(value) {
                return ['text', 'number', 'email', 'password', 'file'].indexOf(value) !== -1;
            },
        },
        label: {
            type: String,
        },
        formRequired: {
            type: Boolean,
            default: false,
        },
        modelValue: String,
    },
    emits: ['update:modelValue', 'iconRightClick'],
    methods: {
        emitValue(e) {
            const value = e.target.value;
            this.$emit('update:modelValue', value);
        },
        hasSlot(slot) {
            return !!this.$slots[slot];
        },
    },
    setup() {
        //
    },
});
</script>
