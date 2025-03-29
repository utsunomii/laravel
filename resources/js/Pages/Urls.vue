<script setup>
import { ref } from 'vue';
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next';
import { Head, Link } from '@inertiajs/vue3'; // Linkコンポーネントは未使用のためコメントアウトまたは削除してもOK
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const urls = ref([]);
const name = ref('');
const url = ref('');

const addUrl = () => {
    if (name.value && url.value) {
        urls.value.push({ name: name.value, url: url.value });
        name.value = '';
        url.value = '';
    }
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-yellow-100 to-red-100 font-sans">
        <div class="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
            <Head title="Urls" />
            <AuthenticatedLayout>
                <BForm @submit.prevent="addUrl" class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <BFormGroup
                        label="名前"
                        label-for="name"
                        label-class="block text-sm font-medium text-gray-700 mb-1 mt-4"
                        class="mb-6" >
                        <BFormInput
                            id="name"
                            v-model="name"
                            required
                            placeholder="サイト名などを入力"
                            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </BFormGroup>

                    <BFormGroup
                        label="URL"
                        label-for="url"
                        label-class="block text-sm font-medium text-gray-700 mb-1"
                        class="mb-6" >
                        <BFormInput
                            id="url"
                            v-model="url"
                            type="url" required
                            placeholder="https://example.com"
                            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </BFormGroup>

                    <BButton
                        type="submit"
                        variant="primary" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all mt-8" >
                        登録
                    </BButton>
                </BForm>
            </AuthenticatedLayout>
        </div>
    </div>
</template>

<style>

</style>