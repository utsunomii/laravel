<script setup>
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-yellow-100 to-red-100 font-sans">
        <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg text-center">
            <Head title="Register" />

            <h2 class="text-xl font-semibold text-gray-900 mb-4">新規登録</h2>

            <BForm @submit.prevent="submit" class="space-y-4">
                <BFormGroup label="名前" label-for="name">
                    <BFormInput
                        id="name"
                        type="text"
                        v-model="form.name"
                        required
                        autofocus
                        autocomplete="name"
                        class="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </BFormGroup>

                <BFormGroup label="Eメール" label-for="email">
                    <BFormInput
                        id="email"
                        type="email"
                        v-model="form.email"
                        required
                        autocomplete="username"
                        class="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </BFormGroup>

                <BFormGroup label="パスワード" label-for="password">
                    <BFormInput
                        id="password"
                        type="password"
                        v-model="form.password"
                        required
                        autocomplete="new-password"
                        class="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </BFormGroup>

                <BFormGroup label="パスワード確認" label-for="password_confirmation">
                    <BFormInput
                        id="password_confirmation"
                        type="password"
                        v-model="form.password_confirmation"
                        required
                        autocomplete="new-password"
                        class="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </BFormGroup>

                <BButton
                    type="submit"
                    variant="primary"
                    :disabled="form.processing"
                    class="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all shadow-md"
                    style="background: linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853); background-size: 400% 400%; animation: gradient 3s infinite alternate;"
                >
                    登録
                </BButton>
            </BForm>

            <div class="mt-6 text-sm text-gray-600">
                すでに登録済みですか？
                <Link :href="route('login')" class="text-blue-600 hover:underline">ログイン</Link>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes gradient {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}
</style>