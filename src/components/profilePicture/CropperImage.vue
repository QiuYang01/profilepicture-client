<template>
  <div>
    <!-- 手机端 -->
    <div v-if="isMobile" class="m-cropper-content">
      <div class="m-cropper-box">
        <div class="m-cropper">
          <vue-cropper
              ref="cropper"
              :img="resultImgUrl"
              :outputSize="option.outputSize"
              :outputType="option.outputType"
              :info="option.info"
              :canScale="option.canScale"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :full="option.full"
              :fixedBox="option.fixedBox"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :centerBox="option.centerBox"
              :height="option.height"
              :infoTrue="option.infoTrue"
              :maxImgSize="option.maxImgSize"
              :enlarge="option.enlarge"
              :mode="option.mode"
              @realTime="realTime"
              @imgLoad="imgLoad">
          </vue-cropper>
        </div>
        <!--底部操作工具按钮-->
        <div class="m-footer-btn">
          <div class="m-scope-btn">
            <el-button size="mini" type="danger" plain icon="el-icon-zoom-in" @click="changeScale(1)">放大</el-button>
            <el-button size="mini" type="danger" plain icon="el-icon-zoom-out" @click="changeScale(-1)">缩小</el-button>
            <el-button size="mini" type="danger" plain @click="rotateLeft">↺ 左旋转</el-button>
            <el-button size="mini" type="danger" plain @click="rotateRight">↻ 右旋转</el-button>
            <el-button size="mini" type="success" @click="downloadImg" >
              下载保存<i class="el-icon-download"></i>
            </el-button>
          </div>
        
        </div>
      </div>
      <!--预览效果图-->
      <!-- <div class="m-show-preview">
        <div :style="previews.div" class="m-preview">
          <img ref="resultImg" :src="previews.url" :style="previews.img" style="max-width:100%">
        </div>
      </div> -->
    </div>

    <!-- pc -->
    <div v-else class="cropper-content">
      <div class="cropper-box">
        <div class="cropper">
          <vue-cropper
              ref="cropper"
              :img="resultImgUrl"
              :outputSize="option.outputSize"
              :outputType="option.outputType"
              :info="option.info"
              :canScale="option.canScale"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :full="option.full"
              :fixedBox="option.fixedBox"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :centerBox="option.centerBox"
              :height="option.height"
              :infoTrue="option.infoTrue"
              :maxImgSize="option.maxImgSize"
              :enlarge="option.enlarge"
              :mode="option.mode"
              @realTime="realTime"
              @imgLoad="imgLoad">
          </vue-cropper>
        </div>
        <!--底部操作工具按钮-->
        <div class="footer-btn">
          <div class="scope-btn">
            <el-button size="mini" type="danger" plain icon="el-icon-zoom-in" @click="changeScale(1)">放大</el-button>
            <el-button size="mini" type="danger" plain icon="el-icon-zoom-out" @click="changeScale(-1)">缩小</el-button>
            <el-button size="mini" type="danger" plain @click="rotateLeft">↺ 左旋转</el-button>
            <el-button size="mini" type="danger" plain @click="rotateRight">↻ 右旋转</el-button>
          </div>
          <div class="upload-btn">
            <el-button size="mini" type="success" @click="downloadImg" >
              <!-- <a v-if="this.previews" :href="this.previews.url" download="b">下载保存</a>  -->
              下载保存<i class="el-icon-download"></i>
            </el-button>
          </div>
        </div>
      </div>
      <!--预览效果图-->
      <div class="show-preview">
        <div :style="previews.div" class="preview">
          <img ref="resultImg" :src="previews.url" :style="previews.img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  name: "CropperImage",
  components: {
    VueCropper
  },
  props:['resultImgUrl','sizeData'],
  data() {
    return {
      previews: {},
      option:{
        // img: resultImgUrl,             //裁剪图片的地址
        outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'jpeg',  //裁剪生成图片的格式（jpeg || png || webp）
        info: false,          //图片大小信息
        canScale: true,      //图片是否允许滚轮缩放
        autoCrop: true,      //是否默认生成截图框
        autoCropWidth: this.sizeData[0]/window.devicePixelRatio,  //默认生成截图框宽度
        autoCropHeight: this.sizeData[1]/window.devicePixelRatio, //默认生成截图框高度
        // fixed: true,         //是否开启截图框宽高固定比例
        // fixedNumber: [1, 1.4], //截图框的宽高比例
        full: false,         //false按原比例裁切图片，不失真
        fixedBox: true,      //固定截图框大小，不允许改变
        canMove: true,      //上传图片是否可以移动
        canMoveBox: true,    //截图框能否拖动
        original: true,     //上传图片按照原始比例渲染
        centerBox: false,    //截图框是否被限制在图片里面
        height: true,        //是否按照设备的dpr 输出等比例图片
        infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000,    //限制图片最大宽度和高度
        enlarge: 1,          //图片根据截图框输出比例倍数
        mode: 'contain'  //图片默认渲染方式
      },
      isMobile:false,
    };
  },
  watch: {
    sizeData (val) { // 关键
      this.option.autoCropWidth = this.sizeData[0]/window.devicePixelRatio,
      this.option.autoCropHeight =  this.sizeData[1]/window.devicePixelRatio
      this.$refs.cropper.res
    }
  },
  mounted(){
    this.isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    this.isMobile = this.isMobile!=null
  },
  methods: {
    //初始化函数
    imgLoad (msg) {
      console.log("工具初始化函数====="+msg)
    },
    //图片缩放
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    //向左旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    //向右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    //实时预览函数
    realTime (data) {
      // console.log(data)
      this.previews = data
    },
    //下载图片
    downloadImg(){
      console.log(this.$refs.cropper)
      // this.$refs.cropper.cropW=this.$refs.cropper.cropW/1.25
      // this.$refs.cropper.cropH=this.$refs.cropper.cropH/1.25
      this.$refs.cropper.getCropBlob(blob=>{
        this.downFileToLocal("证件照.jpg",blob)
      })
    },
    downFileToLocal(fileName, blob) {
      const d = document.createElement('a')
      d.href = window.URL.createObjectURL(blob)
      d.download = fileName
      d.style.display = 'none'
      document.body.appendChild(d)
      d.click()
      document.body.removeChild(d)
      window.URL.revokeObjectURL(d.href)
    }

  },
}
</script>

<style scoped >
.m-cropper-content {
  width: 100%;
}
.m-cropper-box {
  flex: 1;
  width: 100%;
}
.m-cropper {
  width: 300px;
  height: 300px;
}
.m-show-preview {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
}
.cropper-content {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
}

.cropper-content .cropper-box {
  flex: 1;
  width: 100%;
}

.cropper-content .cropper-box .cropper {
  width: auto;
  height: 520px;
}

.cropper-content .show-preview {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
}

.cropper-content .show-preview .preview {
  overflow: hidden;
  border: 1px solid #67c23a;
  background: #cccccc;
}

.m-footer-btn {
  margin-top: 10px;
  display: flex;
  display: -webkit-flex;
  max-width: 100%;
  
}
.footer-btn {
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
}
.m-scope-btn {
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
}
.footer-btn .scope-btn {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding-right: 10px;
}

.footer-btn .upload-btn {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: right;
}
.m-scope-btn button {
  outline: none;
  display: inline-block;
  line-height: 1;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  -webkit-transition: .1s;
  transition: .1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 12px;
  border-radius: 3px;
  margin-right: 15px;
  margin-top: 10px;
}
.footer-btn .btn {
  outline: none;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  -webkit-transition: .1s;
  transition: .1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background-color: #409EFF;
  border-color: #409EFF;
  margin-right: 10px;
}


</style>

