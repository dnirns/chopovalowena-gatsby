import { BackgroundColourType } from '../../types'

export const backgroundColours: BackgroundColourType[] = [
  'bg-clgreen',
  'bg-clred',
  'bg-clblue',
  'bg-clpink',
  'bg-clyellow',
]

export const randomBackgroundColour = () => {
  const randomIndex = Math.floor(Math.random() * backgroundColours.length)
  return backgroundColours[randomIndex]
}
