import fs from 'node:fs/promises'
import { nanoid } from 'nanoid'
import sharp from 'sharp'
/** 上传文件路径 */
const UploadDir = './uploads'

export const miniService = {
  mini: async (file: File) => {
    // 检查是否存在文件夹，不存在则创建
    try {
      await fs.access(UploadDir, fs.constants.F_OK)
    }
    catch {
      await fs.mkdir(UploadDir)
    }
    const image = sharp(await file.arrayBuffer()).jpeg({
      quality: 20,
      mozjpeg: true,
      trellisQuantisation: true,
      overshootDeringing: true,
      optimiseScans: true,
    })
    await fs.writeFile(`${UploadDir}/${nanoid(8)}-${file.name}`, new Uint8Array((await image.toBuffer())))
    return true
  },
}
