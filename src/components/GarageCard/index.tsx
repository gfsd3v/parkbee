import React from 'react'
import ColoredBadge from '@/components/ColoredBadge'

const GarageCard: React.FC = () => {
  return (
    <div className="card bordered bg-base-100 lg:card-side lg:max-w-6xl lg:h-full ">
      <div className="w-full justify-center lg:w-auto lg:flex lg:h-auto lg:justify-start lg:overflow-hidden lg:max-w-4/5">
        <img
          alt="garage"
          src="https://picsum.photos/id/1005/400/250"
          className="w-full max-h-44 lg:min-h-full lg:max-h-full"
        />
      </div>
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
