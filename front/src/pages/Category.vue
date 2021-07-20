<template>
  <div class="content">
        <div class="container-fluid">
            <card>
                <card>directory link</card>
                <draggable class="moving-card" :animation=200>
                    <span v-for="folder in folders" :key="folder.id" :id="folder.id" >
                        <category :title="folder.title" :path="folder.file_path" />
                    </span>
                </draggable>
            </card>
        </div>
    </div>
</template>
<script>
  import Draggable from 'vuedraggable'
  import EventBus from '../EventBus';
  import Category from '../components/Category/Folder'
  export default {
    name: 'beaverExploerer',
    components: {
        Category,
        Draggable
    },
    created(){
        EventBus.$on('enter-folder', (payload)=> {
            this.folders = payload;
        })
    },
    data () {
        return {
            folders: [
                {
                    id: 1,
                    title: '첫번째였던것',
                    file_path: require('/data/princess.png'),
                    sequence: -1
                },
                {
                    id: 2,
                    title: '두번째였던것',
                    file_path: require('/data/princess2.png'),
                    sequence: -1
                },
                {
                    id: 3,
                    title: '세번째였던것',
                    file_path: require('/data/princess3.jpg'),
                    sequence: -1
                },
                {
                    id: 4,
                    title: '네번째였던것',
                    file_path: require('/data/princess4.jpg'),
                    sequence: -1
                },
                {
                    id: 5,
                    title: '다섯번째였던것',
                    file_path: require('/data/princess5.jpg'),
                    sequence: -1
                },
                {
                    id: 6,
                    title: '여섯번째였던것',
                    file_path: require('/data/princess6.jpg'),
                    sequence: -1
                },
                {
                    id: 7,
                    title: '일곱번째였던것',
                    file_path: require('/data/princess7.jpg'),
                    sequence: -1
                },
                {
                    id: 8,
                    title: '여덟번째였던것',
                    file_path: require('/data/princess8.jpg'),
                    sequence: -1
                },
                {
                    id: 9,
                    title: '아홉번째였던것',
                    file_path: require('/data/princess9.jpg'),
                    sequence: -1
                },
                {
                    id: 10,
                    title: '열번째였던것',
                    file_path: require('/data/princess10.jpg'),
                    sequence: -1
                },
            ],
        }
    },
    props: {
        
    },
  }

</script>

<style lang="scss">

.moving-card {
    @apply opacity-50 bg-gray-100 border border-blue-500;
}

.floder-container {
    flex-wrap: wrap;
    display: inline;
}
</style>