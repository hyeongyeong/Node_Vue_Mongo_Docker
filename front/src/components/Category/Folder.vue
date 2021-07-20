<template>
    <div class="folder">
        <div class="folder-icon">
            <img class="folder-img" src="../../../../data/동요/루하동요.png">
        </div>
        <div class="floder-title">
            {{title}} title
        </div>
    </div>
</template>

<script>

  export default {
    name: 'folder',
    components: {
    },
    props: {
        title: {
            type: String,
            description: "Folder title"
        },
    },
  }

</script>

<style>
.folder-img {
  width: 100;
  height: 100px;
  object-fit: cover;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
}

.floder-title { 
    font-size: 20px;
}

.folder-icon {
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
    height: 150px;
    margin: 50px;
    text-align: center;
}

.folder-icon:active {
    background-color: #6495ED
}
.folder:hover {
    background-color: #DCDCDC
}

</style>