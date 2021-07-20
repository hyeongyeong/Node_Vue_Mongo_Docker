<template>
    <div class="folder" v-on:dblclick="folderOnClick" >
        <div class="folder-icon">
            <img class="folder-img" :src="path">
        </div>
        <div class="folder-title">
            {{title}}
        </div>
    </div>
</template>

<script>
  import EventBus from '../../EventBus'
  export default {
    name: 'folder',
    components: {
    },
    methods: {
        folderOnClick(){
            var newComponent = [{
                    id: 1,
                    title: "new!!" + this.title,
                    file_path: this.path
            }];
            EventBus.$emit('enter-folder', newComponent);
        },
    },
    mounted(){
    },
    props: {
        title: {
            type: String,
            description: "Folder title"
        },
        path: {
            type: String,
            description: "Folder image path"
        }
    },
  }

</script>

<style>

.folder-img {
  width: 100;
  height: 100px;
  object-fit: cover;
  vertical-align: middle;
}

.folder-title { 
    font-size: 20px;
}

.folder-icon {
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    background: pink;
    clip-path: polygon(0 24%, 49% 24%, 49% 10%, 100% 10%, 100% 89%, 0 89%);
}
.folder-icon:after {
    display: inline-block;
    height: 100%;
    content: "";
    vertical-align: middle;
}

.folder {
    width: 150px;
    block-size: fit-content;
    text-align: center;
    display: inline-block;
    margin: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
}

.folder-icon:active {
    background-color: #6495ED
}

.folder:hover {
    background-color: #DCDCDC
}



</style>