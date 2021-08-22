import React from 'react'
import EntryIcon from '@/icons/entry.svg'
import ExitIcon from '@/icons/exit.svg'
import UsersIcon from '@/icons/users.svg'
import { IGarageDoor } from '@/services/garageMockService/interfaces'

const titleWithIcon = 'flex items-center mb-1 '
const ulClass = 'space-y-3'

const CollapsableDoorsList: React.FC<{ doors: IGarageDoor[] }> = ({ doors }) => {
  const EntryDoor = ({ address }) => (
    <li>
      <div className={titleWithIcon + 'text-success'}>
        <EntryIcon className="w-4 h-4 mr-1 stroke-current" />
        <p className="text-sm font-medium text-success">Entry door</p>
      </div>
      <p className="text-xs font-light">{address}</p>
    </li>
  )

  const ExitDoor = ({ address }) => (
    <li>
      <div className={titleWithIcon + 'text-error'}>
        <ExitIcon className="w-4 h-4 mr-1 stroke-current" />
        <p className="text-sm font-medium text-error">Exit door</p>
      </div>
      <p className="text-xs font-light">{address}</p>
    </li>
  )

  const HumamDoor = ({ address }) => (
    <li>
      <div className={titleWithIcon + 'text-info'}>
        <UsersIcon className="w-4 h-4 mr-1 stroke-current" />
        <p className="text-sm font-medium text-info">Pedestrian door</p>
      </div>
      <p className="text-xs font-light">{address}</p>
    </li>
  )

  const renderDoorsList = () => {
    const doorsWithAddres = doors.filter(door => door.streetAddress)

    return doorsWithAddres.map(door => {
      switch (door.doorType) {
        case 'Entry':
          return <EntryDoor key={door.doorId} address={door.streetAddress} />
        case 'Exit':
          return <ExitDoor key={door.doorId} address={door.streetAddress} />
        case 'Human':
          return <HumamDoor key={door.doorId} address={door.streetAddress} />
      }
    })
  }

  return (
    <div className="collapse w-full">
      <input type="checkbox" />
      <div style={{ backgroundColor: 'transparent' }} className="collapse-title text-sm font-medium text-primary">
        View doors details
      </div>
      <div style={{ backgroundColor: 'transparent' }} className="collapse-content">
        <ul className={'list-unstyled ' + ulClass}>{renderDoorsList()}</ul>
      </div>
    </div>
  )
}

export default CollapsableDoorsList
