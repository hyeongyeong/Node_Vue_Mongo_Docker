<template>
  <div class="content">
        <div class="container-fluid">
            <card>
                <card>directory link</card>
                <category></category>
                폴더 구조
            </card>
        </div>
    </div>
</template>
<script>
    import Category from '../components/Category/Folder'
  export default {
    name: 'folder',
    components: {
        Category,
    },
    props: {
    },
  }

</script>