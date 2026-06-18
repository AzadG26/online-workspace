export interface InteractiveItem {
  label: string
  emoji: string
  phrase: string
  description: string
  color?: string
}

export const abcInteractive: InteractiveItem[] = [
  { label: "A", emoji: "✈️", phrase: "A for Aeroplane!", description: "Aeroplanes fly high in the sky!" },
  { label: "B", emoji: "⚽", phrase: "B for Ball!", description: "Balls bounce and roll!" },
  { label: "C", emoji: "🐱", phrase: "C for Cat!", description: "Cats purr and play!" },
  { label: "D", emoji: "🐕", phrase: "D for Dog!", description: "Dogs are loyal friends!" },
  { label: "E", emoji: "🐘", phrase: "E for Elephant!", description: "Elephants are the biggest land animals!" },
  { label: "F", emoji: "🌸", phrase: "F for Flower!", description: "Flowers are colorful and smell nice!" },
  { label: "G", emoji: "🎸", phrase: "G for Guitar!", description: "Guitars make beautiful music!" },
  { label: "H", emoji: "🏠", phrase: "H for House!", description: "A house is where we live!" },
  { label: "I", emoji: "🍦", phrase: "I for Ice Cream!", description: "Ice cream is a yummy cold treat!" },
  { label: "J", emoji: "🪅", phrase: "J for Juggle!", description: "Juggling is fun to watch!" },
  { label: "K", emoji: "🪁", phrase: "K for Kite!", description: "Kites fly high in the wind!" },
  { label: "L", emoji: "🍋", phrase: "L for Lemon!", description: "Lemons are sour and yellow!" },
  { label: "M", emoji: "🐵", phrase: "M for Monkey!", description: "Monkeys love to climb trees!" },
  { label: "N", emoji: "🌙", phrase: "N for Night!", description: "Night is when we see the moon!" },
  { label: "O", emoji: "🐙", phrase: "O for Octopus!", description: "Octopuses have eight arms!" },
  { label: "P", emoji: "🐧", phrase: "P for Penguin!", description: "Penguins live where it's cold!" },
  { label: "Q", emoji: "👑", phrase: "Q for Queen!", description: "A queen rules a kingdom!" },
  { label: "R", emoji: "🌈", phrase: "R for Rainbow!", description: "Rainbows have seven beautiful colors!" },
  { label: "S", emoji: "☀️", phrase: "S for Sun!", description: "The sun gives us light and warmth!" },
  { label: "T", emoji: "🐢", phrase: "T for Turtle!", description: "Turtles carry their homes on their backs!" },
  { label: "U", emoji: "☂️", phrase: "U for Umbrella!", description: "Umbrellas keep us dry in the rain!" },
  { label: "V", emoji: "🎻", phrase: "V for Violin!", description: "Violins make beautiful music!" },
  { label: "W", emoji: "⌚", phrase: "W for Watch!", description: "A watch tells us the time!" },
  { label: "X", emoji: "❌", phrase: "X for X-ray!", description: "X-rays help doctors see inside!" },
  { label: "Y", emoji: "🪀", phrase: "Y for Yo-yo!", description: "A yo-yo goes up and down!" },
  { label: "Z", emoji: "🦓", phrase: "Z for Zebra!", description: "Zebras have black and white stripes!" },
]

export const numberInteractive: InteractiveItem[] = [
  { label: "1", emoji: "🍎", phrase: "1 Apple!", description: "One red apple a day keeps the doctor away!" },
  { label: "2", emoji: "👀", phrase: "2 Eyes!", description: "We see the world with our two eyes!" },
  { label: "3", emoji: "🐱", phrase: "3 Cats!", description: "Three little cats playing together!" },
  { label: "4", emoji: "🍀", phrase: "4 Leaves!", description: "A four-leaf clover brings good luck!" },
  { label: "5", emoji: "✋", phrase: "5 Fingers!", description: "Each hand has five fingers!" },
  { label: "6", emoji: "🐝", phrase: "6 Bees!", description: "Six busy bees buzzing around!" },
  { label: "7", emoji: "🌈", phrase: "7 Colors!", description: "The rainbow has seven beautiful colors!" },
  { label: "8", emoji: "🐙", phrase: "8 Arms!", description: "An octopus has eight tentacles!" },
  { label: "9", emoji: "🪐", phrase: "9 Planets!", description: "Our solar system has eight planets!" },
  { label: "10", emoji: "🍩", phrase: "10 Doughnuts!", description: "Ten yummy doughnuts in a box!" },
]

export const colorInteractive: InteractiveItem[] = [
  { label: "Red", emoji: "🍎", phrase: "Red like an Apple!", description: "Red is a bright, warm color!" },
  { label: "Blue", emoji: "🌊", phrase: "Blue like the Ocean!", description: "Blue is a calm, cool color!" },
  { label: "Yellow", emoji: "☀️", phrase: "Yellow like the Sun!", description: "Yellow is a happy, bright color!" },
  { label: "Green", emoji: "🌿", phrase: "Green like Leaves!", description: "Green is the color of nature!" },
  { label: "Purple", emoji: "🍇", phrase: "Purple like Grapes!", description: "Purple is a royal color!" },
  { label: "Orange", emoji: "🍊", phrase: "Orange like an Orange!", description: "Orange is a warm, fruity color!" },
  { label: "Pink", emoji: "🩷", phrase: "Pink like a Flower!", description: "Pink is a soft, pretty color!" },
  { label: "Brown", emoji: "🧸", phrase: "Brown like a Teddy Bear!", description: "Brown is a warm, earthy color!" },
  { label: "Black", emoji: "🐈‍⬛", phrase: "Black like a Cat!", description: "Black is a dark, strong color!" },
  { label: "White", emoji: "☁️", phrase: "White like Clouds!", description: "White is a clean, pure color!" },
]

export function getItemByLabel(items: InteractiveItem[], label: string): InteractiveItem | undefined {
  return items.find((item) => item.label === label)
}
