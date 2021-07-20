<template>
  <div class="content">
        <div class="container-fluid">
            <card>
                <card>directory link</card>
                <draggable class="moving-card" id="category" :animation=200 :component-data="getComponentData()">
                    <span v-for="folder in folders" :key="folder.id" :id="folder.id">
                        <folder :title="folder.title" :path="folder.file_path" />
                    </span>
                </draggable>
            </card>
        </div>
    </div>
</template>
<script>
  import Draggable from 'vuedraggable'
  import EventBus from '../EventBus';
  import Folder from '../components/Category/Folder'
  export default {
    name: 'beaverExploerer',
    components: {
        Folder,
        Draggable
    },
    methods: {
        handleChange() {
            var parent = document.getElementById("category");
            var child = parent.childNodes;
            
            child.forEach((element, index) => {
                var target = this.folders.findIndex( e => e.id == element.id);
                this.folders[target].sequence = index;
            });

            // update folder data to db
            // 정렬된건 다시 안가져와도 됨 처음에 할 때만 sequence로 로딩
        },
        getComponentData() {
            return {
                on: {
                    change: this.handleChange,
                },
                attrs:{
                    wrap: true
                },
            };
        },
    },
    created(){
        EventBus.$on('enter-folder', (payload)=> {
            this.folders = payload;
        });
    },
    data () {
        return {
            folders: [
                {
                    id: 100,
                    title: '첫번째였던것',
                    file_path: require('/data/princess.png'),
                    sequence: 0
                },
                {
                    id: 112,
                    title: '두번째였던것',
                    file_path: require('/data/princess2.png'),
                    sequence: 1
                },
                {
                    id: 103,
                    title: '세번째였던것',
                    file_path: require('/data/princess3.jpg'),
                    sequence: 2
                },
                {
                    id: 1034,
                    title: '네번째였던것',
                    file_path: require('/data/princess4.jpg'),
                    sequence: 3
                },
                {
                    id: 5,
                    title: '다섯번째였던것',
                    file_path: require('/data/princess5.jpg'),
                    sequence: 4
                },
                {
                    id: 600,
                    title: '여섯번째였던것',
                    file_path: require('/data/princess6.jpg'),
                    sequence: 5
                },
                {
                    id: 72,
                    title: '일곱번째였던것',
                    file_path: require('/data/princess7.jpg'),
                    sequence: 6
                },
                {
                    id: 81,
                    title: '여덟번째였던것',
                    file_path: require('/data/princess8.jpg'),
                    sequence: 7
                },
                {
                    id: 93,
                    title: '아홉번째였던것',
                    file_path: require('/data/princess9.jpg'),
                    sequence: 8
                },
                {
                    id: 1011,
                    title: '열번째였던것',
                    file_path: require('/data/princess10.jpg'),
                    sequence: 9
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