import type { UploadFile } from 'tdesign-vue-next'
import { Upload } from 'tdesign-vue-next'
import { defineComponent } from 'vue'
import { apiUpload } from './api'

export default defineComponent(() => {
  /** 自定义上传方法 */
  const handleUpload = async (files: UploadFile | UploadFile[]) => {
    try {
      const _files = files as UploadFile[]
      const formData = new FormData()
      const file = _files[0].raw!
      formData.append('file', file)
      const data = await apiUpload(formData)
      return {
        status: 'success' as const,
        response: {
          url: data.url,
        },
      }
    }
    catch (error) {
      console.log('上传失败', error)
      return {
        status: 'fail' as const,
        response: {
          error: '上传失败',
        },
      }
    }
  }

  return () => (
    <div class="w-full h-full flex justify-center items-center bg-emerald-500">
      <Upload requestMethod={handleUpload} theme="image-flow" multiple={true} />
    </div>
  )
})
