import React from 'react'
import ColoredBadge from '@/components/ColoredBadge'

const GarageCard: React.FC = () => {
  return (
    <div className="card lg:card-side lg:max-w-6xl bordered bg-base-100">
      <figure>
        <img src="https://picsum.photos/id/1005/400/250" className="max-h-44 lg:min-h-full" />
      </figure>
      <div className="card-body">
        <div className="flex min-w-full justify-between	prose mb-4">
          <h3 className="m-0">Ut nullam interdum iaculis in ut suscipit</h3>
          <ColoredBadge color="success">9/10 spots</ColoredBadge>
        </div>
        <p>
          Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae
          voluptates incidunt iure sapiente.
        </p>
        <div className="card-actions">
          <button className="btn btn-primary">Start Parking</button>
        </div>
      </div>
    </div>
  )
}

export default GarageCard
