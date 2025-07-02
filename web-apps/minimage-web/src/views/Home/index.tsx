import { Upload } from 'tdesign-vue-next'
import { defineComponent } from 'vue'

export default defineComponent(() => {
  return () => (
    <div class="w-full h-full flex justify-center items-center bg-emerald-500">
      <Upload action="/mini" />
    </div>
  )
})
