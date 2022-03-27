import { gcpStorageUrl } from 'app/core/constants'

export function getImageUrl(name: string, folder: string) {
  return `${gcpStorageUrl}/${folder}/${name}`
}
