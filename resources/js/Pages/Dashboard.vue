<script setup>
import { ref } from 'vue';
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTrash, faEdit);

const urls = ref([
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'GitHub', url: 'https://www.github.com' },
    // 他のURLを追加
]);

const removeUrl = (index) => {
    urls.value.splice(index, 1);
};

</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-yellow-100 to-red-100 font-sans">
        <div class="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
            <Head title="Dashboard" />

            <AuthenticatedLayout>
                <BForm class="py-12">
                    <BFormGroup class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <ul class="list-group">
                                <li v-for="(url, index) in urls" :key="url.url" class="list-group-item flex justify-between items-center">
                                    <a :href="url.url" target="_blank" class="text-blue-500 hover:underline">{{ url.name }}</a>
                                    <FontAwesomeIcon icon="edit" class="text-green-500 cursor-pointer mx-2"/>
                                    <FontAwesomeIcon icon="trash" class="text-red-500 cursor-pointer" @click="removeUrl(index)" />
                                </li>
                            </ul>
                        </div>
                    </BFormGroup>
                </BForm>
            </AuthenticatedLayout>
        </div>
    </div>
</template>

<style>
@keyframes gradient {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}
</style>