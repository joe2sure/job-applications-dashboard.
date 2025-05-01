import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: '#f0f0f0',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          borderRadius: '50%',
        }}
      >
        {/* You can use text or an SVG here */}
        C&R
      </div>
    ),
    // ImageResponse options
    {
      // For production, adjust the width and height
      width: 180,
      height: 180,
    }
  )
}