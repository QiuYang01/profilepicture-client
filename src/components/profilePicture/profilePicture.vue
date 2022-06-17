<template>
  <div 
    ref="main"
    style="height:100vh"
    v-loading="loading" 
    element-loading-text="正在处理中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    
    <!-- 手机端 -->
    <div v-if="isMobile" class="mobileContainer">
      <h1 class="title" >证件照生成器</h1>
      <p>
        <span class="label">大小:</span>
        <el-radio-group v-model="size"  @change="changeSize">
          <el-radio-button  label="1" border>一寸</el-radio-button>
          <el-radio-button  label="2" border >两寸</el-radio-button>
        </el-radio-group>
      </p>
      <p>
        <span class="label">颜色:</span>
        <el-radio-group v-model="color">
          <el-radio-button label="red" border>红色</el-radio-button>
          <el-radio-button label="blue" border>蓝色</el-radio-button>
          <el-radio-button label="white" border>白色</el-radio-button>
        </el-radio-group>
      </p>
      <p>
        <span class="label">照片:</span>
        <input  type="file" id="input" @change="filechange" />
      </p>
      <p>
        <img style="max-width:300px" :src="previewImgUrl" />
      </p>
      <p class="action">
        <el-button :disabled="!previewImg" type="primary" @click="upload">开 始 制 作</el-button> 
      </p>
      <p style="margin-top:60px">
        <b>功能描述：</b><span>上传一张带有人像的照片，此程序能生成纯色（红、蓝、白）背景的特定尺寸（一寸、两寸）照片</span>
      </p>
    </div>
    <div v-else class="pcContainer">
      <!-- <img :src="resultImgUrl" alt=""> -->
      <h1  class="title" >证件照生成器</h1>
      <p>
        <span class="label">大小:</span>
        <el-radio v-model="size" label="1" border @change="changeSize">一寸</el-radio>
        <el-radio v-model="size" label="2" border @change="changeSize">两寸</el-radio>
      </p>
      <p>
        <span class="label">颜色:</span>
        <el-radio v-model="color" label="red" border>红色</el-radio>
        <el-radio v-model="color" label="blue" border>蓝色</el-radio>
        <el-radio v-model="color" label="white" border>白色</el-radio>
      </p>
      <p>
        <span class="label">照片:</span>
        <input  type="file" id="input" @change="filechange" />
      </p>
      <p>
        <img style="max-width:300px" :src="previewImgUrl" />
      </p>
      <p class="action">
        <el-button :disabled="!previewImg" type="primary" @click="upload">开 始 制 作</el-button> 
      </p>
      <p style="margin-top:60px">
        <b>功能描述：</b><span>上传一张带有人像的照片，此程序能生成纯色（红、蓝、白）背景的特定尺寸（一寸、两寸）照片</span>
      </p>
    </div>
    <el-dialog v-if="isMobile"  top="0" :visible.sync="cropperModelVisible" width="100%" center >
      <template slot="title" >
        请选择合适的区域
        <p>可使用双指缩放</p>
      </template>
      <cropper-image
          v-if="cropperModelVisible"
          :sizeData="sizeData"
          :resultImgUrl="resultImgUrl"
          ref="child">
      </cropper-image>
    </el-dialog>
    <el-dialog v-else title="选择合适区域，右边为预览" top="0" :visible.sync="cropperModelVisible" width="950px" center >
      <cropper-image
          v-if="cropperModelVisible"
          :sizeData="sizeData"
          :resultImgUrl="resultImgUrl"
          ref="child">
      </cropper-image>
    </el-dialog>
  </div>
</template>
<script>
import CropperImage from "./CropperImage";
export default {
  components: {CropperImage},
  data() {
    return {
      previewImg: null, //上传的原图片
      previewImgUrl: '', //选择后预览
      color: "red", //颜色
      size: "1", //尺寸
      sizeData:[295,413], //尺寸的大小
      resultImgUrl:"http://192.168.1.106:8000/imagepreview?path=uploadImg\\65205e66ed3911ecb3fdc1f3ba48453dresult.jpg", //处理后的 结果的图片url

      isMobile:null, //是手机为true
      loading:false,
      cropperModelVisible:false, //控制裁切弹框的显示
    };
  },
  
  mounted(){
    if(this.is_weixn()){ //判断是不是维信浏览器 是微信就提示使用系统浏览器
      this.$refs.main.innerHTML = "<div style='text-align:center;font-weight:700'><p>由于微信内置浏览器无法将图片保存至本地，</p>"
      +"<p>请点击右上角按钮，</p>"
      +"<p>使用其他浏览器打开。</p></div>"
    }
    this.isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    this.isMobile = this.isMobile!=null
  },
  methods: {
    is_weixn(){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    filechange(event){
      // console.log(event)
      var files = event.target.files, file;
      if (files && files.length > 0) {
          file = files[0];// 文件大小校验
          this.previewImg = file;
          if(file.size > 1024 * 1024 * 20) {
              this.warnMsg("文件不能超过20M")
              return false;
          }
          // 获取 window 的 URL 工具
          var URL = window.URL || window.webkitURL;
          // 通过 file 生成目标 url
          this.previewImgUrl = URL.createObjectURL(file);
      }
    },

    //上传图片和尺寸
    upload(){
      let forms = new FormData()
      forms.append('image', this.previewImg)
      forms.append('color', this.color)
      this.loading = true;
      this.$axios.post("/upload",forms)
      .then(res =>{
        console.log(res)
        this.loading = false;
        if(res.data==-1){
          this.errMsg("未检测到人脸，请重新上传")
        }else{
          console.log(res.data)
          this.resultImgUrl = this.$axios.defaults.baseURL+"imagepreview?path="+res.data;
          this.cropperModelVisible = true;
        }
      })
      .catch(err =>{
        console.log(err)
        this.loading = false;
        this.errMsg("调用python接口错误，请联系管理员")
      })
    },
    //将尺寸转为像素
    changeSize(val){
      console.log(val)
      if(val=="1"){
        this.sizeData = [295,413]
      }else if(val=="2"){
        this.sizeData = [413,626]
      }else{
        this.sizeData = [295,413]
      }
      console.log(this.sizeData)
    }
    
  }
}
</script>
<style scoped>
.title {
  padding: 5px;
  margin: 0;
  border-bottom: solid 1px #d2b9a6;
  background: #f6f1ee;
  font-size: 1.5em;
  line-height: 1em;
  text-align: center;
}
.label {
  font-weight: 700;
  padding-right: 20px;
  color: #7b563a;
}
.pcContainer {
  width: 600px;
  margin: 0 auto;
  text-align: left;
  padding: 5px 25px;
}
.mobileContainer {
  width: 100%;
  margin: 0 auto;
  text-align: left;
}
.mobileContainer p {
  padding: 0 5px;
}
.action {
  text-align: center;
}
</style>