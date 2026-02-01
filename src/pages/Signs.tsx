import { useState } from 'react'

const signCategories = {
  'Regulatory Signs': [
    { name: 'Stop Sign', shape: 'Octagon (8-sided)', color: 'Red with white letters', meaning: 'Come to a complete stop at the limit line or crosswalk', emoji: '🛑' },
    { name: 'Yield Sign', shape: 'Triangle (point down)', color: 'Red and white', meaning: 'Slow down, be ready to stop, yield right-of-way to traffic and pedestrians', emoji: '🔻' },
    { name: 'Speed Limit', shape: 'Rectangle', color: 'White with black', meaning: 'Maximum legal speed in ideal conditions', emoji: '⬜' },
    { name: 'Do Not Enter', shape: 'Square with circle', color: 'Red and white', meaning: 'Do not enter this roadway - wrong direction', emoji: '⛔' },
    { name: 'Wrong Way', shape: 'Rectangle', color: 'Red with white letters', meaning: 'You are traveling against traffic - turn around', emoji: '🚫' },
    { name: 'One Way', shape: 'Rectangle', color: 'Black with white arrow', meaning: 'Traffic moves in one direction only', emoji: '➡️' },
    { name: 'No U-Turn', shape: 'Square', color: 'White with red circle/slash', meaning: 'U-turns are not allowed', emoji: '⤴️' },
    { name: 'No Left Turn', shape: 'Square', color: 'White with red circle/slash', meaning: 'Left turns are not allowed', emoji: '↰' },
    { name: 'No Right Turn', shape: 'Square', color: 'White with red circle/slash', meaning: 'Right turns are not allowed', emoji: '↱' },
    { name: 'No Parking', shape: 'Rectangle', color: 'White/red with symbol', meaning: 'Parking is not allowed in this area', emoji: '🅿️' },
    { name: 'Keep Right', shape: 'Square', color: 'White with black', meaning: 'Keep to the right of the obstruction or divider', emoji: '➡️' },
    { name: 'Do Not Pass', shape: 'Rectangle', color: 'White with black/red', meaning: 'Passing other vehicles is not allowed', emoji: '🚷' },
  ],
  'Warning Signs': [
    { name: 'Curve Ahead', shape: 'Diamond', color: 'Yellow with black', meaning: 'Road curves ahead - slow down', emoji: '↪️' },
    { name: 'Sharp Turn', shape: 'Diamond', color: 'Yellow with black', meaning: 'Very sharp turn ahead - reduce speed significantly', emoji: '↩️' },
    { name: 'Winding Road', shape: 'Diamond', color: 'Yellow with black', meaning: 'Series of curves ahead', emoji: '〰️' },
    { name: 'Slippery When Wet', shape: 'Diamond', color: 'Yellow with black', meaning: 'Road may be slippery when wet - reduce speed', emoji: '💧' },
    { name: 'Merge', shape: 'Diamond', color: 'Yellow with black', meaning: 'Traffic merging from another road - be prepared', emoji: '🔀' },
    { name: 'Lane Ends', shape: 'Diamond', color: 'Yellow with black', meaning: 'Your lane is ending - merge safely', emoji: '⬅️' },
    { name: 'Divided Highway Ahead', shape: 'Diamond', color: 'Yellow with black', meaning: 'Highway divides into two separate roadways ahead', emoji: '↕️' },
    { name: 'Divided Highway Ends', shape: 'Diamond', color: 'Yellow with black', meaning: 'Divided highway ends - two-way traffic ahead', emoji: '⬆️' },
    { name: 'Two-Way Traffic', shape: 'Diamond', color: 'Yellow with black', meaning: 'Two-way traffic ahead - stay in your lane', emoji: '↕️' },
    { name: 'Pedestrian Crossing', shape: 'Diamond', color: 'Yellow with black', meaning: 'Watch for pedestrians crossing the road', emoji: '🚶' },
    { name: 'School Zone/Crossing', shape: 'Pentagon (5-sided)', color: 'Fluorescent yellow-green', meaning: 'School area - watch for children, obey reduced speed', emoji: '🏫' },
    { name: 'Railroad Advance Warning', shape: 'Circle', color: 'Yellow with black X and RR', meaning: 'Railroad crossing ahead - prepare to stop', emoji: '🚂' },
    { name: 'Deer/Animal Crossing', shape: 'Diamond', color: 'Yellow with black', meaning: 'Watch for animals crossing the road', emoji: '🦌' },
    { name: 'Hill/Grade', shape: 'Diamond', color: 'Yellow with black', meaning: 'Steep hill ahead - check brakes, use lower gear', emoji: '⛰️' },
    { name: 'Dip', shape: 'Diamond', color: 'Yellow with black', meaning: 'Depression in the road ahead - slow down', emoji: '〰️' },
    { name: 'Bump', shape: 'Diamond', color: 'Yellow with black', meaning: 'Bump in the road ahead - slow down', emoji: '⬆️' },
    { name: 'Soft Shoulder', shape: 'Diamond', color: 'Yellow with black', meaning: 'Road edge is soft - do not drive on shoulder', emoji: '⚠️' },
    { name: 'Narrow Bridge', shape: 'Diamond', color: 'Yellow with black', meaning: 'Bridge ahead is narrower than the road', emoji: '🌉' },
    { name: 'Low Clearance', shape: 'Diamond', color: 'Yellow with black', meaning: 'Overhead structure - check your vehicle height', emoji: '📏' },
    { name: 'Signal Ahead', shape: 'Diamond', color: 'Yellow with black', meaning: 'Traffic signal ahead - prepare to stop', emoji: '🚦' },
    { name: 'Stop Ahead', shape: 'Diamond', color: 'Yellow with black', meaning: 'Stop sign ahead - prepare to stop', emoji: '🛑' },
    { name: 'Yield Ahead', shape: 'Diamond', color: 'Yellow with black', meaning: 'Yield sign ahead - prepare to yield', emoji: '🔻' },
  ],
  'Construction Signs': [
    { name: 'Road Work', shape: 'Diamond', color: 'Orange with black', meaning: 'Construction zone ahead - slow down, watch for workers', emoji: '🚧' },
    { name: 'Flagger Ahead', shape: 'Diamond', color: 'Orange with black', meaning: 'Worker directing traffic ahead - obey their signals', emoji: '👷' },
    { name: 'Detour', shape: 'Rectangle', color: 'Orange with black', meaning: 'Follow alternate route around construction', emoji: '↩️' },
    { name: 'Road Closed', shape: 'Rectangle', color: 'Orange with black', meaning: 'Road is closed - find alternate route', emoji: '🚫' },
    { name: 'One Lane Road', shape: 'Diamond', color: 'Orange with black', meaning: 'Traffic reduced to one lane ahead', emoji: '1️⃣' },
    { name: 'Workers Present', shape: 'Diamond', color: 'Orange with black', meaning: 'Workers in the area - use extra caution', emoji: '👷' },
  ],
  'Guide Signs': [
    { name: 'Interstate Route', shape: 'Shield', color: 'Blue/red with white', meaning: 'Interstate highway route number', emoji: '🛣️' },
    { name: 'US Route', shape: 'Shield', color: 'White with black', meaning: 'US highway route number', emoji: '🛤️' },
    { name: 'California State Route', shape: 'Spade/shield', color: 'Green with white', meaning: 'California state highway route number', emoji: '📍' },
    { name: 'Destination Sign', shape: 'Rectangle', color: 'Green with white', meaning: 'Direction and distance to cities/destinations', emoji: '🏙️' },
    { name: 'Exit Sign', shape: 'Rectangle', color: 'Green with white', meaning: 'Freeway exit ahead with name/number', emoji: '🚪' },
    { name: 'Mile Marker', shape: 'Small rectangle', color: 'Green with white', meaning: 'Distance marker for reference', emoji: '📏' },
    { name: 'Street Name', shape: 'Rectangle', color: 'Green with white', meaning: 'Name of cross street or road', emoji: '🛤️' },
  ],
  'Service Signs': [
    { name: 'Hospital', shape: 'Rectangle', color: 'Blue with white H', meaning: 'Hospital or emergency medical services nearby', emoji: '🏥' },
    { name: 'Gas', shape: 'Rectangle', color: 'Blue with symbol', meaning: 'Fuel station at next exit/nearby', emoji: '⛽' },
    { name: 'Food', shape: 'Rectangle', color: 'Blue with symbol', meaning: 'Restaurant/food services nearby', emoji: '🍽️' },
    { name: 'Lodging', shape: 'Rectangle', color: 'Blue with symbol', meaning: 'Hotel/motel at next exit', emoji: '🏨' },
    { name: 'Rest Area', shape: 'Rectangle', color: 'Blue with symbol', meaning: 'Rest stop ahead with facilities', emoji: '🅿️' },
    { name: 'Camping', shape: 'Rectangle', color: 'Blue with symbol', meaning: 'Campground nearby', emoji: '⛺' },
    { name: 'Handicapped Parking', shape: 'Rectangle', color: 'Blue with white symbol', meaning: 'Parking reserved for disabled persons', emoji: '♿' },
  ],
  'Railroad Signs': [
    { name: 'Advance Warning (Circle)', shape: 'Circle', color: 'Yellow with black X-R-R', meaning: 'Railroad crossing ahead - be prepared to stop', emoji: '⚫' },
    { name: 'Crossbuck', shape: 'X-shaped', color: 'White with black letters', meaning: 'Railroad crossing - yield to trains, look both ways', emoji: '✖️' },
    { name: 'Crossbuck with Lights', shape: 'X-shaped with lights', color: 'White/black with red lights', meaning: 'Stop when lights flash - train approaching', emoji: '🚨' },
    { name: 'Number of Tracks', shape: 'Circle below crossbuck', color: 'White with black', meaning: 'Shows how many tracks to cross', emoji: '2️⃣' },
    { name: 'Exempt Sign', shape: 'Rectangle', color: 'White with black', meaning: 'Certain vehicles don\'t need to stop (not buses with passengers)', emoji: '✅' },
  ],
}

const curbColors = [
  { color: 'Red', meaning: 'No stopping, standing, or parking at any time (fire lanes, bus stops)', emoji: '🔴' },
  { color: 'Yellow', meaning: 'Loading/unloading freight only during business hours (check time limits)', emoji: '🟡' },
  { color: 'White', meaning: 'Pick up or drop off passengers only - 5 minute maximum', emoji: '⚪' },
  { color: 'Green', meaning: 'Limited time parking - check posted sign for time limit', emoji: '🟢' },
  { color: 'Blue', meaning: 'Parking for disabled persons only - valid placard/plate required', emoji: '🔵' },
]

const pavementMarkings = [
  { marking: 'Solid Yellow Line', meaning: 'No passing - do not cross (on your side)', emoji: '🟨' },
  { marking: 'Broken Yellow Line', meaning: 'Passing allowed when safe (on your side)', emoji: '➖' },
  { marking: 'Double Yellow Lines', meaning: 'No passing in either direction', emoji: '🟨🟨' },
  { marking: 'Solid White Line', meaning: 'Lane change discouraged - stay in your lane', emoji: '⬜' },
  { marking: 'Broken White Line', meaning: 'Lane change permitted when safe', emoji: '➖' },
  { marking: 'White Diamond', meaning: 'HOV/Carpool lane - occupancy requirements apply', emoji: '♦️' },
  { marking: 'White Arrow', meaning: 'Required direction of travel for that lane', emoji: '⬆️' },
  { marking: 'Yellow X', meaning: 'Lane closed or reversible lane - do not use', emoji: '❌' },
  { marking: 'Sharrow (Bike)', meaning: 'Shared lane - bicycles may use full lane', emoji: '🚲' },
]

export default function Signs() {
  const [activeCategory, setActiveCategory] = useState('Regulatory Signs')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy">Road Signs & Markings</h1>
        <p className="text-gray-600">
          Learn all signs and markings for the CA DMV test
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(signCategories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeCategory === category
                ? 'bg-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Signs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signCategories[activeCategory as keyof typeof signCategories].map((sign) => (
          <div
            key={sign.name}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{sign.emoji}</div>
              <div className="flex-1">
                <h3 className="font-bold text-navy mb-1">{sign.name}</h3>
                <p className="text-xs text-gray-500 mb-2">
                  {sign.shape} • {sign.color}
                </p>
                <p className="text-sm text-gray-700">{sign.meaning}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pavement Markings */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">🛣️ Pavement Markings</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {pavementMarkings.map((item) => (
            <div key={item.marking} className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{item.emoji}</span>
                <h3 className="font-bold text-gray-800">{item.marking}</h3>
              </div>
              <p className="text-sm text-gray-600">{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Curb Colors */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">🎨 Curb Colors</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {curbColors.map((curb) => (
            <div key={curb.color} className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-4xl mb-2">{curb.emoji}</div>
              <h3 className="font-bold text-gray-800">{curb.color}</h3>
              <p className="text-xs text-gray-600 mt-1">{curb.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Lights */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">🚦 Traffic Signals</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="font-bold text-red-700 mb-2">🔴 Red Light</h3>
            <p className="text-sm text-gray-700">Stop completely behind the limit line, crosswalk, or before entering intersection</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-700 mb-2">🟡 Yellow Light</h3>
            <p className="text-sm text-gray-700">Caution - stop if you can do so safely; light is about to turn red</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-700 mb-2">🟢 Green Light</h3>
            <p className="text-sm text-gray-700">Go if intersection is clear; yield to pedestrians and vehicles still in intersection</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="font-bold text-red-700 mb-2">🔴⚡ Flashing Red</h3>
            <p className="text-sm text-gray-700">Same as STOP sign - stop completely, yield, proceed when safe</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-700 mb-2">🟡⚡ Flashing Yellow</h3>
            <p className="text-sm text-gray-700">Proceed with caution - slow down and watch for hazards</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-700 mb-2">➡️🟢 Green Arrow</h3>
            <p className="text-sm text-gray-700">Protected turn - go in direction of arrow; oncoming traffic is stopped</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="font-bold text-red-700 mb-2">➡️🔴 Red Arrow</h3>
            <p className="text-sm text-gray-700">Do not turn in direction of arrow until green arrow or green light appears</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-700 mb-2">➡️🟡 Yellow Arrow</h3>
            <p className="text-sm text-gray-700">Protected turn is ending - complete your turn or stop safely</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-700 mb-2">➡️🟡⚡ Flashing Yellow Arrow</h3>
            <p className="text-sm text-gray-700">Turn permitted but yield to oncoming traffic and pedestrians</p>
          </div>
        </div>
      </div>

      {/* Sign Shapes */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">📐 Sign Shapes & Their Meanings</h2>
        <p className="text-gray-600 mb-4">Sign shapes help you identify them even from a distance or if damaged.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-red-50 rounded-lg text-center border border-red-200">
            <div className="text-4xl mb-2">🛑</div>
            <h3 className="font-bold">Octagon (8 sides)</h3>
            <p className="text-sm text-gray-600">STOP - only sign with this shape</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg text-center border border-red-200">
            <div className="text-4xl mb-2">🔻</div>
            <h3 className="font-bold">Triangle (point down)</h3>
            <p className="text-sm text-gray-600">YIELD - only sign with this shape</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center border border-yellow-200">
            <div className="text-4xl mb-2">◆</div>
            <h3 className="font-bold">Diamond</h3>
            <p className="text-sm text-gray-600">WARNING - hazard ahead</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center border border-green-200">
            <div className="text-4xl mb-2">⬠</div>
            <h3 className="font-bold">Pentagon (5 sides)</h3>
            <p className="text-sm text-gray-600">SCHOOL zone or crossing</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center border border-yellow-200">
            <div className="text-4xl mb-2">⚫</div>
            <h3 className="font-bold">Circle</h3>
            <p className="text-sm text-gray-600">RAILROAD advance warning</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="text-4xl mb-2">▭</div>
            <h3 className="font-bold">Rectangle</h3>
            <p className="text-sm text-gray-600">REGULATORY or GUIDE info</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="text-4xl mb-2">✖️</div>
            <h3 className="font-bold">Crossbuck (X)</h3>
            <p className="text-sm text-gray-600">RAILROAD crossing (at tracks)</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center border border-yellow-200">
            <div className="text-4xl mb-2">▷</div>
            <h3 className="font-bold">Pennant (triangle right)</h3>
            <p className="text-sm text-gray-600">NO PASSING zone</p>
          </div>
        </div>
      </div>

      {/* Sign Colors */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">🎨 Sign Colors & Their Meanings</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-red-100 rounded-lg border-2 border-red-500">
            <h3 className="font-bold text-red-700">Red</h3>
            <p className="text-sm text-gray-700">Stop, yield, prohibition, or wrong way</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg border-2 border-yellow-500">
            <h3 className="font-bold text-yellow-700">Yellow</h3>
            <p className="text-sm text-gray-700">General warning of hazards ahead</p>
          </div>
          <div className="p-4 bg-orange-100 rounded-lg border-2 border-orange-500">
            <h3 className="font-bold text-orange-700">Orange</h3>
            <p className="text-sm text-gray-700">Construction and work zones</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg border-2 border-green-600">
            <h3 className="font-bold text-green-700">Green</h3>
            <p className="text-sm text-gray-700">Direction, distance, destinations</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg border-2 border-blue-500">
            <h3 className="font-bold text-blue-700">Blue</h3>
            <p className="text-sm text-gray-700">Motorist services (food, gas, hospital)</p>
          </div>
          <div className="p-4 bg-amber-100 rounded-lg border-2 border-amber-700">
            <h3 className="font-bold text-amber-800">Brown</h3>
            <p className="text-sm text-gray-700">Recreation areas, parks, historic sites</p>
          </div>
          <div className="p-4 bg-white rounded-lg border-2 border-gray-400">
            <h3 className="font-bold text-gray-800">White</h3>
            <p className="text-sm text-gray-700">Regulatory (speed limits, rules)</p>
          </div>
          <div className="p-4 bg-lime-200 rounded-lg border-2 border-lime-500">
            <h3 className="font-bold text-lime-800">Fluorescent Yellow-Green</h3>
            <p className="text-sm text-gray-700">School, pedestrian, bicycle zones</p>
          </div>
        </div>
      </div>
    </div>
  )
}
