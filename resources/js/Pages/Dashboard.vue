<script setup>
import { ref } from 'vue';
import DefaultLayout from '@/containers/DefaultLayout.vue';
import { useForm, router, Head } from '@inertiajs/vue3';

import {
    CListGroup,
    CListGroupItem,
    CModal,
    CFormInput,
    CFormLabel
} from '@coreui/vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faTrash, faEdit);
import Vue3StarRatings from 'vue3-star-ratings';

const props = defineProps({
    links: {
        type: Array,
        default: () => []
    }
});

const isModalVisible = ref(false);
const editingItem = ref(null);

const form = useForm({
    id: null,
    name: '',
    url: '',
});

const editUrl = (item) => {
    editingItem.value = item;
    form.defaults({
        id: item.id,
        name: item.name,
        url: item.url,
    });
    form.reset();
    isModalVisible.value = true;
};

const closeModal = () => {
    isModalVisible.value = false;
    editingItem.value = null;
    form.reset();
    form.clearErrors();
};

const saveChanges = () => {
    if (!editingItem.value) return;
    form.put(route('links.update', editingItem.value.id), {
        onSuccess: () => {
            closeModal();
        },
        onError: (errors) => {
            console.error("Save failed:", errors);
        },
        preserveScroll: true,
    });
};

const removeUrl = (item) => {
    if (confirm(`"${item.name}"を削除してもよろしいですか？`)) {
        router.delete(route('links.destroy', item.id), {
            onSuccess: () => {
                 console.log(`Deleted link: ${item.name}`);
            },
            onError: (errors) => {
                console.error("Delete failed:", errors);
            },
            preserveScroll: true,
        });
    }
};

const updatePriority = (id, newRating) => {
    const itemIndex = props.links.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        props.links[itemIndex].priority = newRating;

        router.put(route('links.update', id), { priority: newRating }, {
            preserveScroll: true,
            preserveState: true,

            onSuccess: () => {
                console.log(`Backend update success for ID ${id}`);
            },
            onError: (errors) => {
                console.error(`Backend update failed for ID ${id}:`, errors);
            },
        });
    }
};

</script>

<template>
    <Head title="Dashboard"/>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <CListGroup class="overflow-hidden shadow-sm sm:rounded-lg">
                <template v-if="props.links && props.links.length > 0">
                    <CListGroupItem
                        v-for="item in props.links"
                        :key="item.id"
                        class="flex justify-between items-center py-3 px-4"
                    >
                        <a :href="item.url" target="_blank"
                           class="text-xl text-gray-700 hover:text-gray-900 hover:underline mr-4">
                            {{ item.name }}
                        </a>
                        <div class="flex items-center space-x-4">
                            <Vue3StarRatings
                                :modelValue="item.priority"
                                @update:modelValue="newRating => updatePriority(item.id, newRating)"
                                :starSize="'20'"
                                :showRating="false"
                                :numberOfStars="5"
                                :key="`rating-${item.id}-${item.priority}`"
                            />
                            <div class="flex items-center space-x-3">
                                <FontAwesomeIcon
                                    icon="edit"
                                    class="text-green-500 cursor-pointer hover:text-green-700"
                                    @click="editUrl(item)" />
                                <FontAwesomeIcon
                                    icon="trash"
                                    class="text-red-500 cursor-pointer hover:text-red-700"
                                    @click="removeUrl(item)" />
                            </div>
                        </div>
                    </CListGroupItem>
                </template>
                <CListGroupItem v-else>
                    表示するリンクがありません。
                </CListGroupItem>
            </CListGroup>
        </div>
    </div>

    <CModal
        v-model:visible="isModalVisible"
        :title="editingItem ? 'リンクを編集: ' + editingItem.name : 'リンクを編集'"
        @close="closeModal"
        @save="saveChanges" ok-title="保存"
        cancel-title="キャンセル"
        :backdrop="true" :keyboard="true" >
        <div v-if="editingItem" class="d-block">
           <CFormLabel>リンク名:</CFormLabel>
               <CFormInput
                   v-model="form.name" required
               ></CFormInput>
            <div v-if="form.errors.name" class="text-red-500 text-sm mt-1">{{ form.errors.name }}</div>

           <CFormLabel class="mt-3">URL:</CFormLabel>
                <CFormInput
                   v-model="form.url" type="url"
                   required
               ></CFormInput>
            <div v-if="form.errors.url" class="text-red-500 text-sm mt-1">{{ form.errors.url }}</div>
        </div>
        <div v-else>
           項目が選択されていません。
        </div>

        </CModal>

</template>

<style scoped>
</style>