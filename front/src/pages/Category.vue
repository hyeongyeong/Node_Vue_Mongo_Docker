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
  import axios from 'axios';
  import Draggable from 'vuedraggable';
  import EventBus from '../EventBus';
  import Folder from '../components/Category/Folder'
  const config = require('../server.config');
  export default {
    name: 'beaverExploerer',
    components: {
        Folder,
        Draggable
    },
    methods: {
        fetchCategory(){
            var vm = this
            axios.get(config.serverUrl() + 'category')
                .then((result) => {
                    console.log("Categories : ", result);
                })
        },
        fetchVideo(){
            var vm = this
            axios.get(config.serverUrl() + 'video')
                .then((result) => {
                    console.log("Videos : " , result);
                })
        },
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
        this.fetchCategory();
        this.fetchVideo();
        EventBus.$on('enter-folder', (payload)=> {
            this.folders = payload;
        });
    },
    data () {
        return {
            folders: [
                {
                    id: 1,
                    title: 'amongus',
                    file_path: require('/data/test.jpg'),
                    sequence: 0
                },
                {
                    id: 2,
                    title: 'disney',
                    file_path: require('/data/test2.png'),
                    sequence: 1
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