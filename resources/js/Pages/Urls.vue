<script setup>
import { ref } from 'vue';
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next';
import { Head, Link } from '@inertiajs/vue3'; // Linkコンポーネントをインポート
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
        <div class="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
            <Head title="Urls" />
        <AuthenticatedLayout>
            <BForm @submit.prevent="addUrl" class="py-12">
                <BFormGroup class="max-w-7xl mx-auto sm:px-6 lg:px-8" label="名前" label-for="name">
                    <BFormInput
                        id="name"
                        v-model="name"
                        required
                        class="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </BFormGroup>

                <BFormGroup class="max-w-7xl mx-auto sm:px-6" label="URL" label-for="url">
                    <BFormInput
                        id="url"
                        v-model="url"
                        required
                        class="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </BFormGroup>

                <BButton
                    type="submit"
                    variant="primary"
                    class="w-full py-12 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all shadow-md"
                >
                    登録
                </BButton>
            </BForm>
        </AuthenticatedLayout>
    </div>
    </div>
</template>