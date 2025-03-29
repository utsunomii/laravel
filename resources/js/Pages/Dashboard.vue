<script setup>
import { ref } from 'vue';
import { BFormGroup, BListGroup, BListGroupItem } from 'bootstrap-vue-next';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// 正しいライブラリ名をインポート
import Vue3StarRatings from 'vue3-star-ratings';

library.add(faTrash, faEdit);

// urlsにratingプロパティを追加
const urls = ref([
    { name: 'Google', url: 'https://www.google.com', rating: 5 },
    { name: 'GitHub', url: 'https://www.github.com', rating: 4 },
    { name: 'Twitter', url: 'https://www.twitter.com', rating: 3 },
    { name: 'Facebook', url: 'https://www.facebook.com', rating: 2 },
    { name: 'Instagram', url: 'https://www.instagram.com', rating: 1 },
    // 他のURLを追加
]);

// 不要な url ref を削除
// const url = ref([...]) // <- 削除

// 削除機能
const removeUrl = (index) => {
    urls.value.splice(index, 1);
};

// 編集機能（仮）
const editUrl = (index) => {
    console.log(`Editing URL at index: ${index}`, urls.value[index]);
    // ここに実際の編集ロジックを実装
};

// レーティング更新機能を追加
const updateRating = (index, newRating) => {
    if (urls.value[index]) {
        // v-model を使わない場合はここで更新
        // urls.value[index].rating = newRating;
        console.log(`Updated rating for ${urls.value[index].name} to ${newRating}`);
        // 必要であれば、ここでサーバーに更新を送信するなどの処理を追加
    }
};

</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-yellow-100 to-red-100 font-sans">
        <div class="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
            <Head title="Dashboard" />

            <AuthenticatedLayout>
                <div class="py-12">
                    <BFormGroup class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <BListGroup class="overflow-hidden shadow-sm sm:rounded-lg">
                            <BListGroupItem
                                v-for="(item, index) in urls"
                                :key="item.url"
                                class="flex justify-between items-center py-3 px-4"
                            >
                            <a :href="item.url" target="_blank"
                                class="text-xl text-gray-700 hover:text-gray-900 hover:underline mr-4">
                                    {{ item.name }}
                            </a>
                                <div class="flex items-center space-x-4">
                                    <Vue3StarRatings
                                        v-model="item.rating"
                                        :starSize="'20'"
                                        :showRating="false"
                                        :numberOfStars="5"
                                    />

                                <div class="flex items-center space-x-3">
                                    <FontAwesomeIcon
                                        icon="edit"
                                        class="text-green-500 cursor-pointer hover:text-green-700"
                                        @click="editUrl(index)"
                                    />
                                    <FontAwesomeIcon
                                        icon="trash"
                                        class="text-red-500 cursor-pointer hover:text-red-700"
                                        @click="removeUrl(index)"
                                    />
                                </div>
                            </div>
                            </BListGroupItem>
                        </BListGroup>
                    </BFormGroup>
                </div>
            </AuthenticatedLayout>
        </div>
    </div>
</template>

<style>

</style>