import { useState } from 'react'

interface Sign {
  name: string
  image: string
  meaning: string
}

const signCategories: Record<string, Sign[]> = {
  'Stop & Yield': [
    { name: 'Stop', image: 'stop.png', meaning: 'Come to a complete stop at the limit line or crosswalk. Yield to pedestrians and traffic.' },
    { name: 'Four Way Stop', image: 'four-way-stop.png', meaning: 'All vehicles must stop. First to arrive goes first; if tied, yield to the right.' },
    { name: 'Yield', image: 'yield.png', meaning: 'Slow down, be ready to stop, and yield right-of-way to traffic and pedestrians.' },
    { name: 'Stop Here on Red', image: 'stop-here-on-red.png', meaning: 'Stop at this sign when the traffic light is red, not at the intersection.' },
    { name: 'Stop Except Right Turn', image: 'stop-except-right-turn.png', meaning: 'All traffic must stop except vehicles making a right turn.' },
  ],
  'Speed & Lane Control': [
    { name: 'Speed Limit', image: 'speed-limit.png', meaning: 'Maximum legal speed under ideal conditions. Slow down in bad weather.' },
    { name: 'Speed Limit (Max & Min)', image: 'speed-limit--maximum-and-minimum.png', meaning: 'Shows both maximum and minimum speeds. Don\'t drive faster or slower than posted.' },
    { name: 'Minimum Speed Limit', image: 'minimum-speed-limit.png', meaning: 'You must drive at least this speed if conditions allow. Slower traffic should exit.' },
    { name: 'Slower Traffic Keep Right', image: 'slower-traffic-keep-right.png', meaning: 'If you are driving slower than other traffic, stay in the right lane.' },
    { name: 'Keep Right', image: 'keep-right.png', meaning: 'Keep to the right side of a divider or obstruction.' },
    { name: 'Lane Use Control', image: 'lane-use-control-sign.png', meaning: 'Shows which lanes can be used for which movements (turns, through traffic).' },
    { name: 'Center Turn Lane', image: 'center-turn-lane.png', meaning: 'Shared center lane for left turns only. Do not travel in this lane.' },
    { name: 'HOV/Carpool Lane', image: 'restricted-or-hov-or-carpool-lane-ahead.png', meaning: 'Lane restricted to high-occupancy vehicles (carpools, buses, motorcycles).' },
  ],
  'Do Not Enter & Wrong Way': [
    { name: 'Do Not Enter', image: 'do-not-enter.png', meaning: 'Do not enter this road or lane. You would be going the wrong direction.' },
    { name: 'Wrong Way', image: 'wrong-way.png', meaning: 'You are traveling against traffic. Stop and turn around immediately.' },
    { name: 'Road Closed', image: 'road-closed.png', meaning: 'Road is closed to all traffic. Find an alternate route.' },
    { name: 'One Way', image: 'one-way.png', meaning: 'Traffic flows in one direction only, as shown by the arrow.' },
    { name: 'Divided Highway', image: 'divided-highway.png', meaning: 'Highway ahead is divided. Keep right of the divider.' },
  ],
  'No Turns & U-Turns': [
    { name: 'No U-Turn', image: 'no-u-turn.png', meaning: 'U-turns are not allowed at this location.' },
    { name: 'No Left Turn', image: 'no-left-turn.png', meaning: 'Left turns are not allowed at this intersection.' },
    { name: 'No Right Turn', image: 'no-right-turn.png', meaning: 'Right turns are not allowed at this intersection.' },
    { name: 'No Turns', image: 'no-turns.png', meaning: 'No turns of any kind allowed. You must continue straight.' },
    { name: 'No Turn on Red', image: 'no-turn-on-red.png', meaning: 'You may not turn during a red light. Wait for green.' },
    { name: 'No Left Turn on Red', image: 'no-left-turn-on-red.png', meaning: 'Left turn on red is not allowed (even from one-way to one-way).' },
    { name: 'No Right Turn on Red', image: 'no-right-turn-on-red.png', meaning: 'Right turn on red is not allowed. Wait for green light.' },
  ],
  'Turn & Direction Signs': [
    { name: 'Turn Left Only', image: 'turn-left-only.png', meaning: 'This lane is for left turns only. You must turn left.' },
    { name: 'Turn Right Only', image: 'turn-right-only.png', meaning: 'This lane is for right turns only. You must turn right.' },
    { name: 'Turn Left or Right', image: 'turn-left-or-right.png', meaning: 'You must turn either left or right. No going straight.' },
    { name: 'Straight or Turn Right', image: 'straight-or-turn-right.png', meaning: 'You may go straight or turn right from this lane.' },
    { name: 'Right Turn Signal', image: 'right-turn-signal.png', meaning: 'Right turn is controlled by a separate signal. Obey the arrow signals.' },
    { name: 'Left Turn Yield on Green', image: 'left-turn-yeild-on-green.png', meaning: 'Left turn permitted on green but you must yield to oncoming traffic.' },
    { name: 'Opposite Traffic Extended Green', image: 'opposite-traffic-extended-green.png', meaning: 'Oncoming traffic has an extended green light. Wait before turning.' },
  ],
  'Passing & Parking': [
    { name: 'Do Not Pass', image: 'do-not-pass.png', meaning: 'Do not pass other vehicles in this area. Stay in your lane.' },
    { name: 'Pass with Care', image: 'pass-with-care.png', meaning: 'Passing is allowed but use extra caution. Check for oncoming traffic.' },
    { name: 'No Parking', image: 'no-parking.png', meaning: 'Parking is not allowed in this area. Check sign for times/restrictions.' },
    { name: 'Reserved Handicap Parking', image: 'reserved-parking-for-handicap.png', meaning: 'Parking reserved for vehicles with disabled placard or plates only.' },
    { name: 'Emergency Stopping Only', image: 'emergency-stopping-only.png', meaning: 'Only stop here for emergencies. No parking or standing.' },
  ],
  'Prohibited Vehicles & Pedestrians': [
    { name: 'No Trucks', image: 'no-trucks.png', meaning: 'Trucks or commercial vehicles are not allowed on this road.' },
    { name: 'No Bicycles', image: 'no-bicycles.png', meaning: 'Bicycles are not allowed on this road or path.' },
    { name: 'No Pedestrian Crossing', image: 'no-pedestrian-crossing.png', meaning: 'Pedestrians may not cross at this location.' },
  ],
  'Railroad Crossings': [
    { name: 'Railroad Crossing', image: 'railroad-crossing.png', meaning: 'Railroad tracks ahead. Look both ways, listen, and be prepared to stop.' },
    { name: 'Railroad Crossing Gate', image: 'railroad-crossing-gate.png', meaning: 'Crossing has automatic gates. Stop when gates are down or lights flash.' },
  ],
}

const curbColors = [
  { color: 'Red', meaning: 'No stopping, standing, or parking at any time (fire lanes, bus stops)', hex: '#dc2626' },
  { color: 'Yellow', meaning: 'Loading/unloading freight only during business hours', hex: '#eab308' },
  { color: 'White', meaning: 'Pick up or drop off passengers only - 5 minute max', hex: '#e5e7eb' },
  { color: 'Green', meaning: 'Limited time parking - check posted sign for limit', hex: '#16a34a' },
  { color: 'Blue', meaning: 'Parking for disabled persons only - permit required', hex: '#2563eb' },
]

const pavementMarkings = [
  { marking: 'Solid Yellow Line', meaning: 'No passing - do not cross (on your side)', color: 'bg-yellow-400' },
  { marking: 'Broken Yellow Line', meaning: 'Passing allowed when safe (on your side)', color: 'bg-yellow-400' },
  { marking: 'Double Yellow Lines', meaning: 'No passing in either direction', color: 'bg-yellow-400' },
  { marking: 'Solid White Line', meaning: 'Lane change discouraged - stay in lane', color: 'bg-gray-300' },
  { marking: 'Broken White Line', meaning: 'Lane change permitted when safe', color: 'bg-gray-300' },
  { marking: 'Double White Lines', meaning: 'Do not cross or change lanes', color: 'bg-gray-300' },
  { marking: 'White Diamond (HOV)', meaning: 'Carpool/HOV lane - occupancy required', color: 'bg-gray-300' },
  { marking: 'Yellow X', meaning: 'Lane closed ahead or reversible lane', color: 'bg-yellow-400' },
]

export default function Signs() {
  const [activeCategory, setActiveCategory] = useState('Stop & Yield')

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

      {/* Signs Grid with Images */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signCategories[activeCategory].map((sign) => (
          <div
            key={sign.name}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <img 
                src={`/signs/${sign.image}`} 
                alt={sign.name}
                className="w-20 h-20 object-contain flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-navy mb-1 text-sm">{sign.name}</h3>
                <p className="text-sm text-gray-700">{sign.meaning}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Curb Colors */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">🎨 Curb Colors</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {curbColors.map((curb) => (
            <div key={curb.color} className="text-center p-4 bg-slate-50 rounded-lg">
              <div 
                className="w-full h-6 rounded-full mb-3 border border-gray-300"
                style={{ backgroundColor: curb.hex }}
              />
              <h3 className="font-bold text-gray-800">{curb.color}</h3>
              <p className="text-xs text-gray-600 mt-1">{curb.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pavement Markings */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">🛣️ Pavement Markings</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pavementMarkings.map((item) => (
            <div key={item.marking} className="p-4 bg-slate-50 rounded-lg">
              <div className={`h-3 ${item.color} rounded mb-3`} />
              <h3 className="font-bold text-gray-800 text-sm">{item.marking}</h3>
              <p className="text-xs text-gray-600 mt-1">{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Lights */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">🚦 Traffic Signals</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="w-8 h-8 rounded-full bg-red-500 mb-2" />
            <h3 className="font-bold text-red-700">Red Light</h3>
            <p className="text-sm text-gray-700">Stop completely behind the limit line or crosswalk</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-8 h-8 rounded-full bg-yellow-400 mb-2" />
            <h3 className="font-bold text-yellow-700">Yellow Light</h3>
            <p className="text-sm text-gray-700">Caution - stop if safe; light is turning red</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-8 h-8 rounded-full bg-green-500 mb-2" />
            <h3 className="font-bold text-green-700">Green Light</h3>
            <p className="text-sm text-gray-700">Go if intersection is clear; yield to pedestrians</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex gap-1 mb-2">
              <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-500 text-xs">FLASHING</span>
            </div>
            <h3 className="font-bold text-red-700">Flashing Red</h3>
            <p className="text-sm text-gray-700">Same as STOP sign - stop, yield, then proceed</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex gap-1 mb-2">
              <div className="w-6 h-6 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-600 text-xs">FLASHING</span>
            </div>
            <h3 className="font-bold text-yellow-700">Flashing Yellow</h3>
            <p className="text-sm text-gray-700">Proceed with caution - slow down and watch</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-green-600 text-lg">→</span>
              <div className="w-6 h-6 rounded-full bg-green-500" />
            </div>
            <h3 className="font-bold text-green-700">Green Arrow</h3>
            <p className="text-sm text-gray-700">Protected turn in arrow direction; oncoming stopped</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-red-600 text-lg">→</span>
              <div className="w-6 h-6 rounded-full bg-red-500" />
            </div>
            <h3 className="font-bold text-red-700">Red Arrow</h3>
            <p className="text-sm text-gray-700">Do not turn in that direction; wait for green</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-yellow-600 text-lg">→</span>
              <div className="w-6 h-6 rounded-full bg-yellow-400 animate-pulse" />
            </div>
            <h3 className="font-bold text-yellow-700">Flashing Yellow Arrow</h3>
            <p className="text-sm text-gray-700">Turn allowed, but yield to oncoming traffic</p>
          </div>
        </div>
      </div>

      {/* Sign Shapes */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">📐 Sign Shapes</h2>
        <p className="text-gray-600 mb-4">Shapes help you identify signs even from a distance or if damaged.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-red-50 rounded-lg text-center border border-red-200">
            <div className="w-12 h-12 bg-red-600 mx-auto mb-2" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
            <h3 className="font-bold">Octagon</h3>
            <p className="text-sm text-gray-600">STOP only</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg text-center border border-red-200">
            <div className="w-0 h-0 mx-auto mb-2" style={{ borderLeft: '24px solid transparent', borderRight: '24px solid transparent', borderTop: '42px solid #dc2626' }} />
            <h3 className="font-bold">Triangle (down)</h3>
            <p className="text-sm text-gray-600">YIELD only</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center border border-yellow-200">
            <div className="w-10 h-10 bg-yellow-400 mx-auto mb-2 rotate-45" />
            <h3 className="font-bold">Diamond</h3>
            <p className="text-sm text-gray-600">Warning signs</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center border border-green-200">
            <div className="w-12 h-10 bg-yellow-300 mx-auto mb-2" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 81% 100%, 19% 100%, 0% 38%)' }} />
            <h3 className="font-bold">Pentagon</h3>
            <p className="text-sm text-gray-600">School zones</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center border border-yellow-200">
            <div className="w-10 h-10 rounded-full bg-yellow-400 border-4 border-black mx-auto mb-2 flex items-center justify-center text-xs font-bold">RR</div>
            <h3 className="font-bold">Circle</h3>
            <p className="text-sm text-gray-600">Railroad warning</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="w-12 h-8 bg-white border-2 border-black mx-auto mb-2" />
            <h3 className="font-bold">Rectangle</h3>
            <p className="text-sm text-gray-600">Regulatory/Guide</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="mx-auto mb-2 text-3xl">✖</div>
            <h3 className="font-bold">Crossbuck (X)</h3>
            <p className="text-sm text-gray-600">Railroad crossing</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center border border-yellow-200">
            <div className="w-0 h-0 mx-auto mb-2" style={{ borderTop: '20px solid transparent', borderBottom: '20px solid transparent', borderLeft: '36px solid #eab308' }} />
            <h3 className="font-bold">Pennant</h3>
            <p className="text-sm text-gray-600">No passing zone</p>
          </div>
        </div>
      </div>

      {/* Sign Colors */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">🎨 Sign Colors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border-2 border-red-500 bg-red-50">
            <h3 className="font-bold text-red-700">Red</h3>
            <p className="text-sm text-gray-700">Stop, yield, prohibition</p>
          </div>
          <div className="p-4 rounded-lg border-2 border-yellow-500 bg-yellow-50">
            <h3 className="font-bold text-yellow-700">Yellow</h3>
            <p className="text-sm text-gray-700">General warning</p>
          </div>
          <div className="p-4 rounded-lg border-2 border-orange-500 bg-orange-50">
            <h3 className="font-bold text-orange-700">Orange</h3>
            <p className="text-sm text-gray-700">Construction zones</p>
          </div>
          <div className="p-4 rounded-lg border-2 border-green-600 bg-green-50">
            <h3 className="font-bold text-green-700">Green</h3>
            <p className="text-sm text-gray-700">Directions, destinations</p>
          </div>
          <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50">
            <h3 className="font-bold text-blue-700">Blue</h3>
            <p className="text-sm text-gray-700">Services (gas, food, hospital)</p>
          </div>
          <div className="p-4 rounded-lg border-2 border-amber-700 bg-amber-50">
            <h3 className="font-bold text-amber-800">Brown</h3>
            <p className="text-sm text-gray-700">Parks, recreation</p>
          </div>
          <div className="p-4 rounded-lg border-2 border-gray-400 bg-white">
            <h3 className="font-bold text-gray-800">White</h3>
            <p className="text-sm text-gray-700">Regulatory rules</p>
          </div>
          <div className="p-4 rounded-lg border-2 border-lime-500 bg-lime-100">
            <h3 className="font-bold text-lime-800">Fluorescent Yellow-Green</h3>
            <p className="text-sm text-gray-700">School, pedestrian, bike</p>
          </div>
        </div>
      </div>
    </div>
  )
}
