import Image from 'next/image'

interface AvatarProps {
  src?: string | null
  size?: number
  className?: string
}

export function Avatar({ src, size = 44, className }: AvatarProps) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="avatar"
      referrerPolicy="no-referrer"
      className={`${className ?? ''} rounded-full object-cover`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  ) : (
    <div
      style={{
        backgroundColor: 'grey',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
      }}
    ></div>
  )
}
