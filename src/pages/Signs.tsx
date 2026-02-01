import { useState } from 'react'

const signCategories = {
  'Regulatory Signs': [
    { name: 'Stop Sign', shape: 'Octagon', color: 'Red with white letters', meaning: 'Come to a complete stop', emoji: '🛑' },
    { name: 'Yield Sign', shape: 'Triangle (point down)', color: 'Red and white', meaning: 'Slow down and give right-of-way', emoji: '⚠️' },
    { name: 'Speed Limit', shape: 'Rectangle', color: 'White with black', meaning: 'Maximum legal speed', emoji: '🚗' },
    { name: 'Do Not Enter', shape: 'Square', color: 'Red and white', meaning: 'Do not drive into this area', emoji: '⛔' },
    { name: 'Wrong Way', shape: 'Rectangle', color: 'Red with white', meaning: 'You are going the wrong direction', emoji: '🚫' },
    { name: 'One Way', shape: 'Rectangle', color: 'Black and white', meaning: 'Traffic flows in one direction only', emoji: '➡️' },
    { name: 'No U-Turn', shape: 'Square', color: 'White with red circle', meaning: 'U-turns are prohibited', emoji: '🚷' },
    { name: 'No Parking', shape: 'Rectangle', color: 'White with red', meaning: 'Parking is not allowed', emoji: '🅿️' },
  ],
  'Warning Signs': [
    { name: 'Curve Ahead', shape: 'Diamond', color: 'Yellow with black', meaning: 'Road curves ahead', emoji: '↪️' },
    { name: 'Slippery When Wet', shape: 'Diamond', color: 'Yellow with black', meaning: 'Road may be slick in rain', emoji: '💧' },
    { name: 'Merge', shape: 'Diamond', color: 'Yellow with black', meaning: 'Two lanes become one', emoji: '🔀' },
    { name: 'Pedestrian Crossing', shape: 'Diamond/Pentagon', color: 'Yellow with black', meaning: 'Watch for people crossing', emoji: '🚶' },
    { name: 'School Zone', shape: 'Pentagon', color: 'Yellow-green with black', meaning: 'School area ahead', emoji: '🏫' },
    { name: 'Railroad Crossing', shape: 'Circle', color: 'Yellow with black X', meaning: 'Train tracks ahead', emoji: '🚂' },
    { name: 'Deer Crossing', shape: 'Diamond', color: 'Yellow with black', meaning: 'Watch for animals', emoji: '🦌' },
    { name: 'Road Work', shape: 'Diamond', color: 'Orange with black', meaning: 'Construction ahead', emoji: '🚧' },
  ],
  'Guide Signs': [
    { name: 'Interstate Route', shape: 'Shield', color: 'Blue and red', meaning: 'Interstate highway marker', emoji: '🛣️' },
    { name: 'US Route', shape: 'Shield', color: 'White with black', meaning: 'US highway marker', emoji: '🛤️' },
    { name: 'State Route', shape: 'Various', color: 'Various', meaning: 'State highway marker', emoji: '📍' },
    { name: 'Exit Sign', shape: 'Rectangle', color: 'Green with white', meaning: 'Freeway exit ahead', emoji: '🚪' },
    { name: 'Mile Marker', shape: 'Rectangle', color: 'Green with white', meaning: 'Distance reference point', emoji: '📏' },
    { name: 'Hospital', shape: 'Rectangle', color: 'Blue with white H', meaning: 'Hospital nearby', emoji: '🏥' },
    { name: 'Gas/Food/Lodging', shape: 'Rectangle', color: 'Blue with symbols', meaning: 'Services at next exit', emoji: '⛽' },
    { name: 'Rest Area', shape: 'Rectangle', color: 'Blue with white', meaning: 'Rest stop ahead', emoji: '🅿️' },
  ],
}

const curbColors = [
  { color: 'Red', meaning: 'No stopping, standing, or parking at any time', emoji: '🔴' },
  { color: 'Yellow', meaning: 'Loading zone for freight only (time limits apply)', emoji: '🟡' },
  { color: 'White', meaning: 'Pick up or drop off passengers only (5 min max)', emoji: '⚪' },
  { color: 'Green', meaning: 'Limited time parking (check signs for time)', emoji: '🟢' },
  { color: 'Blue', meaning: 'Disabled parking only (permit required)', emoji: '🔵' },
]

export default function Signs() {
  const [activeCategory, setActiveCategory] = useState('Regulatory Signs')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-dmv-blue">Road Signs</h1>
        <p className="text-gray-600">
          Learn the signs you'll see on the CA DMV test
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(signCategories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === category
                ? 'bg-dmv-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Signs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {signCategories[activeCategory as keyof typeof signCategories].map((sign) => (
          <div
            key={sign.name}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-5xl mb-4">{sign.emoji}</div>
            <h3 className="font-bold text-dmv-blue mb-2">{sign.name}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {sign.shape} • {sign.color}
            </p>
            <p className="text-gray-700">{sign.meaning}</p>
          </div>
        ))}
      </div>

      {/* Curb Colors */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-dmv-blue mb-6">🎨 Curb Colors</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {curbColors.map((curb) => (
            <div key={curb.color} className="text-center">
              <div className="text-4xl mb-2">{curb.emoji}</div>
              <h3 className="font-bold text-gray-800">{curb.color}</h3>
              <p className="text-sm text-gray-600 mt-1">{curb.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Lights */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-dmv-blue mb-6">🚦 Traffic Signals</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-3xl mb-2">🔴</div>
            <h3 className="font-bold text-red-700">Red Light</h3>
            <p className="text-gray-700">Stop completely behind the limit line</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-3xl mb-2">🟡</div>
            <h3 className="font-bold text-yellow-700">Yellow Light</h3>
            <p className="text-gray-700">Stop if safe; light is about to turn red</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl mb-2">🟢</div>
            <h3 className="font-bold text-green-700">Green Light</h3>
            <p className="text-gray-700">Go if intersection is clear</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-3xl mb-2">🔴⚡</div>
            <h3 className="font-bold text-red-700">Flashing Red</h3>
            <p className="text-gray-700">Same as stop sign - stop completely</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-3xl mb-2">🟡⚡</div>
            <h3 className="font-bold text-yellow-700">Flashing Yellow</h3>
            <p className="text-gray-700">Proceed with caution</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl mb-2">➡️🟢</div>
            <h3 className="font-bold text-green-700">Green Arrow</h3>
            <p className="text-gray-700">Go in direction of arrow</p>
          </div>
        </div>
      </div>

      {/* Sign Shapes */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-dmv-blue mb-6">📐 Sign Shapes & Meanings</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="text-4xl mb-2">🛑</div>
            <h3 className="font-bold">Octagon</h3>
            <p className="text-gray-600">Stop</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="text-4xl mb-2">⚠️</div>
            <h3 className="font-bold">Triangle</h3>
            <p className="text-gray-600">Yield</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="text-4xl mb-2">◆</div>
            <h3 className="font-bold">Diamond</h3>
            <p className="text-gray-600">Warning</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="text-4xl mb-2">⬠</div>
            <h3 className="font-bold">Pentagon</h3>
            <p className="text-gray-600">School Zone</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="text-4xl mb-2">⚫</div>
            <h3 className="font-bold">Circle</h3>
            <p className="text-gray-600">Railroad</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="text-4xl mb-2">▭</div>
            <h3 className="font-bold">Rectangle</h3>
            <p className="text-gray-600">Regulatory/Guide</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="text-4xl mb-2">✖</div>
            <h3 className="font-bold">Crossbuck (X)</h3>
            <p className="text-gray-600">Railroad Crossing</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="text-4xl mb-2">⬡</div>
            <h3 className="font-bold">Pennant</h3>
            <p className="text-gray-600">No Passing Zone</p>
          </div>
        </div>
      </div>
    </div>
  )
}
