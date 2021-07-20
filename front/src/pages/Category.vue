<template>
  <div class="content">
        <div class="container-fluid">
            <card>
                <card>directory link</card>
                <span v-for="folder in folders" :key="folder.id" bag="first-bag" v-dragula="colOne">
                    <category :title="folder.title" :path="folder.file_path" />
                </span>

            </card>
        </div>
    </div>
</template>
<script>
  import EventBus from '../EventBus';
  import Category from '../components/Category/Folder'
  export default {
    name: 'beaverExploerer',
    components: {
        Category,
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
                    file_path: require('/data/test.png')
                },
                {
                    id: 2,
                    title: '두번째였던것',
                    file_path: require('/data/heart.png')
                },
                {
                    id: 3,
                    title: '세번째였던것',
                    file_path: require('/data/다운로드.png')
                },
                {
                    id: 4,
                    title: '네번째였던것',
                    file_path: require('/data/다운로드2.jpg')
                },
                {
                    id: 5,
                    title: '다섯번째였던것',
                    file_path: require('/data/robot.png')
                },
                {
                    id: 6,
                    title: '여섯번째였던것',
                    file_path: require('/data/다운로드3.jpg')
                },
                {
                    id: 7,
                    title: '일곱번째였던것',
                    file_path: require('/data/img-reading.png')
                },
                {
                    id: 8,
                    title: '여덟번째였던것',
                    file_path: require('/data/img-reading.png')
                },
                {
                    id: 9,
                    title: '아홉번째였던것',
                    file_path: require('/data/img-reading.png')
                },
                {
                    id: 10,
                    title: '열번째였던것',
                    file_path: require('/data/img-reading.png')
                },
            ],
        }
    },
    props: {
        
    },
  }

</script>

<style>

.floder-container {
    flex-wrap: wrap;
    display: inline;
}
</style>