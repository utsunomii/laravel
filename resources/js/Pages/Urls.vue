<script setup>
import { ref } from 'vue';
import { Head, /* Link */ } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';

import { CFormLabel, CFormInput, CButton } from '@coreui/vue';

import DefaultLayout from '@/containers/DefaultLayout.vue';
defineOptions({ layout: DefaultLayout });

const form = useForm({
    link_name: '',
    link_url: '',
});

const submit = () => {
    form.post('/urls/store', {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            console.log('登録成功');
            // 登録後に一覧ページなどに遷移させたい場合は、以下のように Inertia.visit() を使用
            // import { router } from '@inertiajs/vue3';
            // router.visit('/urls');
        },
        onError: (errors) => {
            console.error('登録エラー:', errors);
            // エラー表示が必要な場合は、form.errors をテンプレートで利用
        }
    });
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen font-sans">
        <div class="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">

            <Head title="Urls" />

            <form @submit.prevent="submit" class="max-w-7xl mx-auto sm:px-6 lg:px-8">

                <div class="mb-6">
                    <CFormLabel
                        label="名前"
                        label-for="link_name"
                        class="block text-sm font-medium text-gray-700 mb-1 mt-4"
                    />
                    <CFormInput
                        id="link_name"
                        v-model="form.link_name"
                        required
                        placeholder="サイト名などを入力"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                     </div>

                 <div class="mb-6">
                    <CFormLabel
                        label="URL"
                        label-for="link_url"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    />
                     <CFormInput
                        id="link_url"
                        v-model="form.link_url"
                        type="url" required
                        placeholder="https://example.com"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    </div>

                <CButton
                    type="submit"
                    color="primary"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all mt-8"
                    >
                    登録
                </CButton>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* 必要であればページ固有のスタイルをここに記述 */
</style>