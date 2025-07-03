import fs from 'node:fs/promises'
import { fileTypeFromBuffer } from 'file-type'
import { nanoid } from 'nanoid'

/** 上传文件路径 */
const uploadDir = `./uploads`

export const miniService = {
  upload: async (file: File) => {
    const fileId = nanoid(8)
    const dir = `${uploadDir}/${fileId}`
    // 检查是否存在文件夹，不存在则创建
    try {
      await fs.access(dir, fs.constants.F_OK)
    }
    catch {
      await fs.mkdir(dir, {
        recursive: true,
      })
    }
    await fs.writeFile(`${dir}/${file.name}`, new Uint8Array((await file.arrayBuffer())))
    return {
      fileId,
      url: `/mini/get/${fileId}`,
    }
  },
  get: async (fileId: string) => {
    const path = `${uploadDir}/${fileId}`
    // 检查文件是否存在
    await fs.access(path, fs.constants.F_OK)
    const files = await fs.readdir(path)
    if (Array.isArray(files) && files.length) {
      const buffer = await fs.readFile(`${path}/${files[0]}`)
      const mime = (await fileTypeFromBuffer(buffer))?.mime
      return {
        mime,
        buffer,
      }
    }
    return false
  },
}
