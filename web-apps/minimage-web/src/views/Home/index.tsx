import type { UploadFile, UploadInstanceFunctions } from 'tdesign-vue-next'
import { Upload } from 'tdesign-vue-next'
import { defineComponent, useTemplateRef } from 'vue'
import { apiUpload } from './api'

export default defineComponent(() => {
  const uploadRef = useTemplateRef<UploadInstanceFunctions>('upload')
  /** 自定义上传方法 */
  const handleUpload = async (files: UploadFile | UploadFile[]) => {
    try {
      const _files = files as UploadFile[]
      const formData = new FormData()
      const file = _files[0].raw!
      formData.append('file', file)
      const data = await apiUpload(formData, (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          )
          uploadRef.value?.uploadFilePercent({file:_files[0],percent})
        }
      })
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
      <Upload ref={'upload'} requestMethod={handleUpload} theme="file-flow" multiple={true} />
    </div>
  )
})
