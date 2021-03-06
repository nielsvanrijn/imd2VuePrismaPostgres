<template>
    <div id="container">
        <img alt="Vue logo" src="../assets/logo.png" />
        <div class="left">
            <code>
                <pre>{{user.email}}</pre>
            </code>
            <Input v-model="user.email" label="Class API 😃" />
        </div>
        <div class="right">
            <code>
                <pre>{{user.pass}}</pre>
            </code>
            <TextInput v-model="user.pass" label="Composition API 🤮" />
        </div>
        
        <button @click="log()">
            test
        </button>
    </div>
</template>

<script lang="ts">
import Input from '@/components/Input.vue';
import TextInput from '@/components/TextInput.vue';
import { Options, Vue } from 'vue-class-component';
// import { Watch } from 'vue-decorator';

@Options({
    components: {
        Input,
        TextInput,
    },
})
export default class Login extends Vue {
    private user: { email: string; pass: string } = {
        email: 'Class',
        pass: 'Compositoin',
    }

    log() {
        console.log(this.user);
    }
}
</script>

<style lang="scss" scoped>
#container {
    text-align: center;
    img {
        display: block;
        margin: 0 auto;
    }
    > div {
        padding: 1rem;
        border-radius: 6px;
        width: 30rem;
        display: inline-block;
    }
    .left {
        background: rgb(228, 245, 228);
        border: 1px solid lightgreen;
    }
    .right {
        background: rgb(255, 235, 227);
        border: 1px solid lightsalmon;
    }
    button {
        display: block;
        margin: 2rem auto 0 auto;
    }
}
</style>
