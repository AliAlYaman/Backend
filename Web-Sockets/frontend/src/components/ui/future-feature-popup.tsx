
import { useState } from "react"

export default function FutureFeaturePopup() {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setShow(true)}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Future Feature
      </button>

      {show && (
        <div className="absolute top-12 left-0 bg-white text-black rounded shadow-lg border border-gray-300 p-4 z-10">
          <p className="font-semibold">🚧 Feature coming soon!</p>
          <button
            onClick={() => setShow(false)}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}
