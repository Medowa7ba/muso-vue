import { projectStorage } from '../firebase/config'
import { ref } from "vue"
import getUser from "./getUser"

const { user } = getUser()

const useStorage = () => {
  const error = ref<null | string>(null)
  const url = ref(null)
  const filePath = ref<null | string>(null)

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = projectStorage.ref(filePath.value)
    
    try {
      const res = await storageRef.put(file)
      console.log(res);
      url.value = await res.ref.getDownloadURL()
    } catch (err:any) {
      console.log(err.message)
      error.value = err
    }
  }

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);

    try {
      await storageRef.delete()
    } catch (err) {
      console.log(err.message)
      error.value = err
    }
  }

  return { uploadImage, deleteImage, url, filePath, error }
}

export default useStorage;