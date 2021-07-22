<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header"> <h3> 카테고리 생성 </h3> </slot>
                        <img class="create-folder" src="../../assets/icon/plus_folder.png" alt="Create Category">
                    </div>

                    <div class="modal-body">
                        <slot name="body"> 
                          <div class="grid-format">

                            <p> 카테고리 이름 : </p>
                            <base-input type="text"
                                      placeholder="Category Name"
                                      v-model="new_category.name">
                            </base-input>

                            <p>카테고리 이미지 파일 업로드 <img src="../../assets/icon/plus_img.png" alt="Create Category"> : </p>
                            <div class="filebox">
                              <div id="preview_file">
                                <img v-if="preview_url" :src="preview_url"/>
                              </div>
                              <label id="file_upload" for="upload_file">업로드</label> 
                              <input type="file" id="upload_file" @change="onFileChange"> 
                            </div>

                            <p>상위 카테고리 : </p>
                            <p>  </p>
                          </div>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="btn btn-info btn-fill float-right">
                                Submit
                            </button>
                            <button class="btn btn-info btn-fill float-right" @click="$emit('close')">
                                Close
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default{
  data(){
    return {
      preview_url: null,
      new_category: {
        name: '',
        parent_category: '',
        child_category: '',
        depth: '',
        img_path: '',
        sequence: -1,
      },
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.preview_url = URL.createObjectURL(file);
      document.getElementById('file_upload').innerHTML = 'Change';
    },
  },
}

</script>
<style scoped>
  .grid-format > * {
      padding: 10px 0;
  }
  
  .grid-format {
    display: grid;
    grid-template-columns: 30% 70%;	
  }
  .filebox 
  {
    display: flex;
    align-items: center;
  }

  .filebox label 
  { 
    padding: .5em .75em; 
    color: #999; 
    vertical-align: middle; 
    background-color: #fdfdfd; 
    cursor: pointer; 
    border: 1px solid #ebebeb; 
    border-bottom-color: #e2e2e2;
    border-radius: .25em; 
  } 
  
  .filebox input[type="file"] 
  { 
    position: absolute; 
    width: 1px; 
    height: 1px; 
    padding: 0; 
    margin: -1px; 
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0; 
  }

#preview_file img {
  max-width: 150px;
  max-height: auto;
  margin-right: 30px;
}

h3, p, label{
  font-family: NanumSquareRound;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1200px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>