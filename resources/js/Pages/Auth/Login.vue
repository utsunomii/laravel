<script setup>
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-yellow-100 to-red-100 font-sans">
        <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg text-center">
            <Head title="Log in" />

            <h2 class="text-xl font-semibold text-gray-900 mb-4">ログイン</h2>

            <div v-if="status" class="mb-4 text-sm text-green-600 text-center">
                {{ status }}
            </div>

            <BForm @submit.prevent="submit" class="space-y-4">
                <BFormGroup label="Eメール" label-for="email">
                    <BFormInput
                        id="email"
                        type="email"
                        v-model="form.email"
                        required
                        autofocus
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
                        autocomplete="current-password"
                        class="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </BFormGroup>

                <div class="flex justify-between items-center text-sm">
                    <Link v-if="canResetPassword" :href="route('password.request')" class="text-blue-600 hover:underline">
                        パスワードをお忘れですか？
                    </Link>
                </div>

                <BButton
                    type="submit"
                    variant="primary"
                    :disabled="form.processing"
                    class="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all shadow-md"
                    style="background: linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853); background-size: 400% 400%; animation: gradient 3s infinite alternate;"
                >
                    ログイン
                </BButton>
            </BForm>

            <div class="mt-6 text-sm text-gray-600">
                アカウントをお持ちでないですか？
                <Link :href="route('register')" class="text-blue-600 hover:underline">新規登録</Link>
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