export interface NavItem {
  label: string
  href: string
  icon?: string
  children?: NavItem[]
}

export interface Category {
  id: string
  title: string
  description: string
  icon: string
  color: string
  gradient: string
  href: string
  emoji: string
  count: number
  ageRange: string
}

export interface LearningItem {
  id: string
  title: string
  description: string
  icon: string
  color: string
  href: string
}

export interface VideoItem {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  category: string
  href: string
  featured?: boolean
  youtubeId?: string
}

export interface GameItem {
  id: string
  title: string
  description: string
  icon: string
  color: string
  gradient: string
  href: string
  ageRange: string
  skills: string[]
}

export interface ShortItem {
  id: string
  title: string
  emoji: string
  color: string
  href: string
  youtubeId?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  date: string
  author: string
  href: string
}

export interface Character {
  name: string
  role: string
  emoji: string
  color: string
  description: string
}

export const characters: Character[] = [
  {
    name: "Pogo",
    role: "The Brave Leader",
    emoji: "🦊",
    color: "var(--color-coral)",
    description: "Pogo is a clever fox who loves solving puzzles and leading adventures. He always encourages kids to try their best!",
  },
  {
    name: "Tuni",
    role: "The Smart Bunny",
    emoji: "🐰",
    color: "var(--color-purple)",
    description: "Tuni is a brilliant bunny who knows everything about numbers and letters. She makes learning feel like magic!",
  },
  {
    name: "Bobo",
    role: "The Funny Bear",
    emoji: "🐻",
    color: "var(--color-sky)",
    description: "Bobo is a silly bear who loves to make everyone laugh. He always remembers important lessons and shares them with joy!",
  },
]

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Videos", href: "/videos" },
  { label: "Shorts", href: "/shorts" },
  {
    label: "Learn",
    href: "/categories",
    children: [
      { label: "ABC", href: "/abc" },
      { label: "Hindi", href: "/hindi" },
      { label: "Counting", href: "/counting" },
      { label: "Colors", href: "/colors" },
      { label: "Animals", href: "/animals" },
    ],
  },
  { label: "Games", href: "/games" },
  { label: "Quiz", href: "/quiz" },
  { label: "Worksheets", href: "/worksheets" },
  { label: "Blog", href: "/blog" },
]

export const categories: Category[] = [
  {
    id: "abc",
    title: "ABC Learning",
    description: "Learn letters A to Z with fun songs and games",
    icon: "abc",
    color: "var(--color-coral)",
    gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
    href: "/abc",
    emoji: "🔤",
    count: 26,
    ageRange: "2-5",
  },
  {
    id: "hindi",
    title: "Hindi Learning",
    description: "Discover Hindi alphabets and words",
    icon: "hindi",
    color: "var(--color-purple)",
    gradient: "linear-gradient(135deg, #B28DFF, #CCB0FF)",
    href: "/hindi",
    emoji: "🕉️",
    count: 48,
    ageRange: "3-6",
  },
  {
    id: "counting",
    title: "Counting",
    description: "Learn numbers 1 to 100 with fun activities",
    icon: "counting",
    color: "var(--color-yellow)",
    gradient: "linear-gradient(135deg, #FFD93D, #FFE680)",
    href: "/counting",
    emoji: "🔢",
    count: 100,
    ageRange: "2-6",
  },
  {
    id: "colors",
    title: "Colors",
    description: "Explore the wonderful world of colors",
    icon: "colors",
    color: "var(--color-green)",
    gradient: "linear-gradient(135deg, #6EE7B7, #96F0CC)",
    href: "/colors",
    emoji: "🎨",
    count: 12,
    ageRange: "2-4",
  },
  {
    id: "animals",
    title: "Animals",
    description: "Meet amazing animals from around the world",
    icon: "animals",
    color: "var(--color-sky)",
    gradient: "linear-gradient(135deg, #6BCBFF, #A0DEFF)",
    href: "/animals",
    emoji: "🐾",
    count: 40,
    ageRange: "2-6",
  },
  {
    id: "shapes",
    title: "Shapes",
    description: "Learn about circles, squares, triangles and more",
    icon: "shapes",
    color: "var(--color-coral)",
    gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
    href: "/shapes",
    emoji: "🔷",
    count: 10,
    ageRange: "2-4",
  },
  {
    id: "fruits",
    title: "Fruits",
    description: "Discover tasty fruits and their names",
    icon: "fruits",
    color: "var(--color-green)",
    gradient: "linear-gradient(135deg, #6EE7B7, #96F0CC)",
    href: "/fruits",
    emoji: "🍎",
    count: 20,
    ageRange: "2-5",
  },
  {
    id: "vegetables",
    title: "Vegetables",
    description: "Learn about healthy vegetables",
    icon: "vegetables",
    color: "var(--color-green-dark)",
    gradient: "linear-gradient(135deg, #4CD0A0, #6EE7B7)",
    href: "/vegetables",
    emoji: "🥕",
    count: 20,
    ageRange: "3-6",
  },
  {
    id: "birds",
    title: "Birds",
    description: "Fly high with beautiful birds",
    icon: "birds",
    color: "var(--color-sky)",
    gradient: "linear-gradient(135deg, #6BCBFF, #A0DEFF)",
    href: "/birds",
    emoji: "🐦",
    count: 20,
    ageRange: "2-6",
  },
  {
    id: "vehicles",
    title: "Vehicles",
    description: "Vroom vroom! Learn about vehicles",
    icon: "vehicles",
    color: "var(--color-yellow)",
    gradient: "linear-gradient(135deg, #FFD93D, #FFE680)",
    href: "/vehicles",
    emoji: "🚗",
    count: 15,
    ageRange: "2-5",
  },
  {
    id: "body-parts",
    title: "Body Parts",
    description: "Learn about your amazing body",
    icon: "body",
    color: "var(--color-coral)",
    gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
    href: "/body-parts",
    emoji: "🦶",
    count: 20,
    ageRange: "2-4",
  },
  {
    id: "phonics",
    title: "Phonics",
    description: "Learn letter sounds and phonics",
    icon: "phonics",
    color: "var(--color-purple)",
    gradient: "linear-gradient(135deg, #B28DFF, #CCB0FF)",
    href: "/phonics",
    emoji: "🔊",
    count: 30,
    ageRange: "3-6",
  },
]

export const featuredVideos: VideoItem[] = [
  { id: "v1", title: "ABC Song for Kids", thumbnail: "/api/placeholder/640/360", duration: "3:45", views: "2.5M", category: "ABC", href: "/videos/abc-song", featured: true, youtubeId: "ml20_XPDENI" },
  { id: "v2", title: "Learn Counting 1-10", thumbnail: "/api/placeholder/640/360", duration: "4:20", views: "1.8M", category: "Counting", href: "/videos/counting-1-10", featured: true, youtubeId: "x56sn6P-TeI" },
  { id: "v3", title: "Animal Sounds for Kids", thumbnail: "/api/placeholder/640/360", duration: "5:10", views: "3.2M", category: "Animals", href: "/videos/animal-sounds", featured: true, youtubeId: "oIIRTVt3eWg" },
  { id: "v4", title: "Colors Song", thumbnail: "/api/placeholder/640/360", duration: "3:30", views: "1.5M", category: "Colors", href: "/videos/colors-song", featured: true, youtubeId: "C4vrEtwoa7g" },
  { id: "v5", title: "Hindi Varnamala", thumbnail: "/api/placeholder/640/360", duration: "6:00", views: "900K", category: "Hindi", href: "/videos/hindi-varnamala", featured: true, youtubeId: "sadhJ7RIMtA" },
  { id: "v6", title: "Shape Song", thumbnail: "/api/placeholder/640/360", duration: "4:15", views: "2.1M", category: "Shapes", href: "/videos/shape-song", youtubeId: "P6tst9UecTk" },
  { id: "v7", title: "Fruit Names", thumbnail: "/api/placeholder/640/360", duration: "5:30", views: "1.2M", category: "Fruits", href: "/videos/fruit-names", youtubeId: "CQGzS5sh16g" },
  { id: "v8", title: "Animal Dance Party", thumbnail: "/api/placeholder/640/360", duration: "4:45", views: "4.0M", category: "Animals", href: "/videos/animal-dance", youtubeId: "k6ItISdnJ9g" },
]

export const shorts: ShortItem[] = [
  { id: "s1", title: "Letter A", emoji: "🍎", color: "var(--color-coral)", href: "/shorts/letter-a", youtubeId: "ml20_XPDENI" },
  { id: "s2", title: "Number 1", emoji: "1️⃣", color: "var(--color-yellow)", href: "/shorts/number-1", youtubeId: "x56sn6P-TeI" },
  { id: "s3", title: "Red Color", emoji: "🔴", color: "var(--color-coral)", href: "/shorts/red-color", youtubeId: "C4vrEtwoa7g" },
  { id: "s4", title: "Cat", emoji: "🐱", color: "var(--color-purple)", href: "/shorts/cat", youtubeId: "oIIRTVt3eWg" },
  { id: "s5", title: "Triangle", emoji: "🔺", color: "var(--color-green)", href: "/shorts/triangle", youtubeId: "P6tst9UecTk" },
  { id: "s6", title: "Dog", emoji: "🐶", color: "var(--color-sky)", href: "/shorts/dog", youtubeId: "6VC8xnmRaFE" },
  { id: "s7", title: "Apple", emoji: "🍎", color: "var(--color-coral)", href: "/shorts/apple", youtubeId: "kJRPx32mfUw" },
  { id: "s8", title: "Car", emoji: "🚗", color: "var(--color-yellow)", href: "/shorts/car", youtubeId: "k6ItISdnJ9g" },
]

export const games: GameItem[] = [
  { id: "g1", title: "Memory Match", description: "Find matching pairs of cute animals!", icon: "🧠", color: "var(--color-coral)", gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)", href: "/games/memory-match", ageRange: "3-6", skills: ["Memory", "Focus"] },
  { id: "g2", title: "Alphabet Puzzle", description: "Drag and drop letters in the right order!", icon: "🧩", color: "var(--color-sky)", gradient: "linear-gradient(135deg, #6BCBFF, #A0DEFF)", href: "/games/alphabet-puzzle", ageRange: "3-5", skills: ["ABC", "Ordering"] },
  { id: "g3", title: "Color Sort", description: "Sort colorful items into the right groups!", icon: "🎨", color: "var(--color-purple)", gradient: "linear-gradient(135deg, #B28DFF, #CCB0FF)", href: "/games/color-sort", ageRange: "2-4", skills: ["Colors", "Sorting"] },
  { id: "g4", title: "Number Match", description: "Match numbers to the right quantity!", icon: "🔢", color: "var(--color-yellow)", gradient: "linear-gradient(135deg, #FFD93D, #FFE680)", href: "/games/number-match", ageRange: "3-6", skills: ["Counting", "Matching"] },
  { id: "g5", title: "Shape Sorter", description: "Fit shapes into their matching holes!", icon: "🔷", color: "var(--color-green)", gradient: "linear-gradient(135deg, #6EE7B7, #96F0CC)", href: "/games/shape-sorter", ageRange: "2-4", skills: ["Shapes", "Problem Solving"] },
  { id: "g6", title: "Animal Puzzle", description: "Complete animal puzzles with dragging!", icon: "🐾", color: "var(--color-sky)", gradient: "linear-gradient(135deg, #6BCBFF, #A0DEFF)", href: "/games/animal-puzzle", ageRange: "3-6", skills: ["Puzzles", "Animals"] },
]

export const blogPosts: BlogPost[] = [
  { id: "b1", title: "10 Fun Ways to Teach Your Child the Alphabet", excerpt: "Make learning ABCs an exciting adventure with these creative activities...", category: "Learning Tips", image: "/api/placeholder/800/400", date: "2025-01-15", author: "Pogo Tunes Team", href: "/blog/teach-alphabet-fun-ways" },
  { id: "b2", title: "The Benefits of Music in Early Childhood Education", excerpt: "Discover how music can boost your child's brain development...", category: "Child Development", image: "/api/placeholder/800/400", date: "2025-01-10", author: "Pogo Tunes Team", href: "/blog/music-early-childhood" },
  { id: "b3", title: "Screen Time Guide for Parents", excerpt: "A balanced approach to digital learning for young children...", category: "Parenting", image: "/api/placeholder/800/400", date: "2025-01-05", author: "Pogo Tunes Team", href: "/blog/screen-time-guide" },
  { id: "b4", title: "Best Educational Apps for Preschoolers", excerpt: "Our top picks for learning apps that are actually fun...", category: "Reviews", image: "/api/placeholder/800/400", date: "2024-12-28", author: "Pogo Tunes Team", href: "/blog/best-educational-apps" },
]

export const abcLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

export const hindiVarnamala = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ",
  "क", "ख", "ग", "घ", "च", "छ", "ज", "झ", "ट", "ठ",
  "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ",
  "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स",
  "ह"
]

export const animalData = [
  { name: "Dog", emoji: "🐶", sound: "Woof Woof!", fact: "Dogs are called man's best friend" },
  { name: "Cat", emoji: "🐱", sound: "Meow Meow!", fact: "Cats can jump up to 6 times their length" },
  { name: "Elephant", emoji: "🐘", sound: "Trumpet!", fact: "Elephants are the largest land animals" },
  { name: "Lion", emoji: "🦁", sound: "Roar!", fact: "Lions are called the king of the jungle" },
  { name: "Monkey", emoji: "🐒", sound: "Ooh Ooh!", fact: "Monkeys are very smart and playful" },
  { name: "Bird", emoji: "🐦", sound: "Chirp Chirp!", fact: "Birds have feathers but no teeth" },
  { name: "Fish", emoji: "🐟", sound: "Blub Blub!", fact: "Fish have been on Earth for 500 million years" },
  { name: "Horse", emoji: "🐴", sound: "Neigh!", fact: "Horses can run shortly after being born" },
  { name: "Cow", emoji: "🐮", sound: "Moo Moo!", fact: "Cows have four stomachs to digest food" },
  { name: "Frog", emoji: "🐸", sound: "Ribbit!", fact: "Frogs can jump up to 20 times their body length" },
  { name: "Bee", emoji: "🐝", sound: "Buzz Buzz!", fact: "Bees help flowers grow by pollinating them" },
  { name: "Butterfly", emoji: "🦋", sound: "Flutter!", fact: "Butterflies taste with their feet" },
]

export const colorData = [
  { name: "Red", hex: "#FF6B6B", emoji: "🔴" },
  { name: "Blue", hex: "#6BCBFF", emoji: "🔵" },
  { name: "Yellow", hex: "#FFD93D", emoji: "🟡" },
  { name: "Green", hex: "#6EE7B7", emoji: "🟢" },
  { name: "Purple", hex: "#B28DFF", emoji: "🟣" },
  { name: "Orange", hex: "#FF9F43", emoji: "🟠" },
  { name: "Pink", hex: "#FF85A1", emoji: "💗" },
  { name: "Brown", hex: "#A0724A", emoji: "🟤" },
  { name: "Black", hex: "#2D3436", emoji: "⚫" },
  { name: "White", hex: "#FFFFFF", emoji: "⚪" },
]

export interface BlogContent {
  id: string
  title: string
  content: string[]
  category: string
  date: string
  author: string
  image: string
  relatedPosts: string[]
}

export const blogContent: BlogContent[] = [
  {
    id: "teach-alphabet-fun-ways",
    title: "10 Fun Ways to Teach Your Child the Alphabet",
    content: [
      "Learning the alphabet is a crucial milestone in your child's educational journey. But it doesn't have to be boring! Here are 10 fun ways to make ABC learning an exciting adventure.",
      "1. Sing the ABC Song Every Day: Music makes learning stick. Sing the ABC song during car rides, bath time, or while playing. Add fun actions to each letter!",
      "2. Use Alphabet Puzzles: Hands-on learning with puzzles helps children recognize letter shapes. Our Alphabet Puzzle game at Pogo Tunes makes this digital and fun!",
      "3. Create a Letter Hunt: Hide letter cards around the house and go on a treasure hunt. Call out a letter and have your child find it.",
      "4. Practice with Playdough Letters: Roll playdough into letter shapes. This builds fine motor skills while teaching letter recognition.",
      "5. Read Alphabet Books: Books like 'Chicka Chicka Boom Boom' and 'Dr. Seuss's ABC' make letters come alive through stories.",
      "6. Try Letter Crafts: Turn letter learning into art. Make an 'A' out of apple prints or a 'B' out of buttons.",
      "7. Use Digital Learning Apps: Interactive apps like Pogo Tunes offer engaging alphabet games that adapt to your child's pace.",
      "8. Practice Tracing: Use finger paints, sand trays, or our worksheets to practice writing letters.",
      "9. Label Everything: Put labels on objects around the house — 'door', 'bed', 'table'. Your child will learn letters in context!",
      "10. Make it a Game: Turn alphabet practice into a challenge. Can they find something starting with 'B'? How many 'S' sounds can they hear in a story?",
      "Remember: Every child learns at their own pace. Celebrate small victories and keep it fun!"
    ],
    category: "Learning Tips",
    date: "2025-01-15",
    author: "Pogo Tunes Team",
    image: "/api/placeholder/800/400",
    relatedPosts: ["music-early-childhood", "screen-time-guide"],
  },
  {
    id: "music-early-childhood",
    title: "The Benefits of Music in Early Childhood Education",
    content: [
      "Music isn't just fun — it's a powerful tool for early childhood development. From boosting brain power to building social skills, here's why music matters.",
      "Brain Development: Studies show that music activates multiple areas of the brain simultaneously. Children exposed to music show improved memory, attention, and problem-solving skills.",
      "Language Skills: Songs introduce new vocabulary in a memorable way. The rhythm and rhyme of music help children break down words into sounds — a key skill for reading.",
      "Motor Skills: Clapping, dancing, and playing simple instruments develop both fine and gross motor skills. Our videos at Pogo Tunes encourage active participation!",
      "Emotional Regulation: Music helps children understand and express emotions. A calm lullaby can soothe, while an upbeat song can channel energy positively.",
      "Social Connection: Group music activities teach turn-taking, listening, and cooperation. Singing together creates a sense of belonging.",
      "Mathematical Thinking: Rhythm patterns, beats, and counting in songs lay the foundation for mathematical concepts.",
      "Creativity and Self-Expression: Music gives children a safe space to express themselves and explore their creativity.",
      "Tips for Parents: Play a variety of music at home. Sing together daily. Use songs for transitions (clean-up song, good morning song). Let your child explore simple instruments.",
      "At Pogo Tunes, we create songs that are both educational and incredibly fun. Tune in and watch your child's love for learning grow!"
    ],
    category: "Child Development",
    date: "2025-01-10",
    author: "Pogo Tunes Team",
    image: "/api/placeholder/800/400",
    relatedPosts: ["teach-alphabet-fun-ways", "best-educational-apps"],
  },
  {
    id: "screen-time-guide",
    title: "Screen Time Guide for Parents",
    content: [
      "Screen time is a hot topic for modern parents. How much is too much? What kind of content is best? Here's a balanced guide to digital learning for young children.",
      "Quality Over Quantity: Not all screen time is equal. Passive TV watching differs greatly from interactive learning with apps like Pogo Tunes. Focus on content quality first.",
      "Age-Appropriate Guidelines: The AAP recommends no screens for children under 18 months (except video calls), and limited, high-quality programming for ages 2-5 with parent co-viewing.",
      "Make it Interactive: Choose apps and videos that encourage participation — singing along, tapping answers, or creating. Passive consumption should be limited.",
      "Co-View With Your Child: Watch together! Ask questions about what's happening. This turns screen time into a bonding and learning experience.",
      "Set Healthy Boundaries: Create screen-free zones (like the dinner table) and times (like before bed). Use timers to help children transition.",
      "Balance With Physical Activity: For every 30 minutes of screen time, ensure active play time. Our movement songs encourage dancing and exercise!",
      "Choose Educational Content: Look for content that teaches letters, numbers, social skills, and creativity. Avoid shows with fast-paced scene changes that can overstimulate.",
      "Use Screen Time as a Tool, Not a Babysitter: Engage with your child during and after screen time. Ask 'What did you learn?' or 'Can you show me that song?'",
      "Remember: You know your child best. Use these guidelines as a starting point, but trust your instincts as a parent."
    ],
    category: "Parenting",
    date: "2025-01-05",
    author: "Pogo Tunes Team",
    image: "/api/placeholder/800/400",
    relatedPosts: ["music-early-childhood", "best-educational-apps"],
  },
  {
    id: "best-educational-apps",
    title: "Best Educational Apps for Preschoolers",
    content: [
      "Looking for the best educational apps for your preschooler? We've tested hundreds of apps and compiled our top picks that combine learning with genuine fun.",
      "1. Pogo Tunes: Our own app! Interactive games, educational songs, and videos covering ABCs, counting, colors, shapes, animals, and more. Completely free.",
      "2. Khan Academy Kids: A comprehensive free app covering reading, math, and social-emotional learning through engaging activities and books.",
      "3. PBS Kids Games: Features favorite characters from PBS shows in educational games covering various subjects.",
      "4. Endless Alphabet: Teaches letter sounds and vocabulary with adorable monster characters and interactive puzzles.",
      "5. Homer Learning: A personalized learn-to-read program that adapts to your child's level and interests.",
      "6. Quick Math Jr.: Makes math fun with playful characters and games that teach counting, addition, and number recognition.",
      "7. Toca Boca: A series of open-ended play apps that encourage creativity, storytelling, and imagination.",
      "8. Reading Eggs: A comprehensive reading program with phonics lessons, games, and e-books for ages 2-13.",
      "What to Look For: No ads, no in-app purchases, age-appropriate content, and skills that align with your child's developmental stage.",
      "Try a few and see which ones your child enjoys most. The best app is one they'll actually want to use!"
    ],
    category: "Reviews",
    date: "2024-12-28",
    author: "Pogo Tunes Team",
    image: "/api/placeholder/800/400",
    relatedPosts: ["screen-time-guide", "teach-alphabet-fun-ways"],
  },
]

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  category: string
  emoji: string
}

export const quizQuestions: QuizQuestion[] = [
  { id: "q1", question: "Which animal says 'Moo'?", options: ["Cow", "Dog", "Cat", "Lion"], correctIndex: 0, category: "Animals", emoji: "🐄" },
  { id: "q2", question: "What color is the sky on a sunny day?", options: ["Red", "Green", "Blue", "Yellow"], correctIndex: 2, category: "Colors", emoji: "🔵" },
  { id: "q3", question: "How many legs does a dog have?", options: ["2", "4", "6", "8"], correctIndex: 1, category: "Animals", emoji: "🐶" },
  { id: "q4", question: "Which shape has 3 sides?", options: ["Circle", "Square", "Triangle", "Star"], correctIndex: 2, category: "Shapes", emoji: "🔺" },
  { id: "q5", question: "What letter comes after A?", options: ["C", "B", "D", "E"], correctIndex: 1, category: "ABC", emoji: "🔤" },
  { id: "q6", question: "How many apples are there? 🍎🍎🍎", options: ["2", "3", "4", "5"], correctIndex: 1, category: "Counting", emoji: "🔢" },
  { id: "q7", question: "Which fruit is red and round?", options: ["Banana", "Apple", "Orange", "Grape"], correctIndex: 1, category: "Fruits", emoji: "🍎" },
  { id: "q8", question: "What do bees make?", options: ["Milk", "Honey", "Bread", "Cheese"], correctIndex: 1, category: "Animals", emoji: "🐝" },
  { id: "q9", question: "Which vehicle flies in the sky?", options: ["Car", "Boat", "Airplane", "Bicycle"], correctIndex: 2, category: "Vehicles", emoji: "✈️" },
  { id: "q10", question: "What color do you get mixing red and blue?", options: ["Green", "Purple", "Orange", "Pink"], correctIndex: 1, category: "Colors", emoji: "🟣" },
  { id: "q11", question: "Which is the largest animal?", options: ["Cat", "Dog", "Elephant", "Mouse"], correctIndex: 2, category: "Animals", emoji: "🐘" },
  { id: "q12", question: "How many fingers are on one hand?", options: ["3", "4", "5", "6"], correctIndex: 2, category: "Body Parts", emoji: "🖐️" },
]

export function getBlogPost(slug: string): BlogContent | undefined {
  return blogContent.find((post) => post.id === slug)
}

export function getRelatedPosts(slugs: string[]): BlogContent[] {
  return blogContent.filter((post) => slugs.includes(post.id))
}

export function getVideoContent(slug: string) {
  return featuredVideos.find((v) => v.href === `/videos/${slug}`)
}

export function getShortContent(slug: string) {
  return shorts.find((s) => s.href === `/shorts/${slug}`)
}

export function getGameContent(slug: string) {
  return games.find((g) => g.href === `/games/${slug}`)
}

export const learningTips = [
  {
    icon: "🎵",
    title: "Sing Along",
    description: "Music helps children remember concepts better",
    color: "var(--color-coral)",
  },
  {
    icon: "🎮",
    title: "Play & Learn",
    description: "Interactive games make learning feel like play",
    color: "var(--color-sky)",
  },
  {
    icon: "📖",
    title: "Daily Practice",
    description: "Just 15 minutes a day builds strong foundations",
    color: "var(--color-purple)",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Learn Together",
    description: "Parent involvement doubles learning outcomes",
    color: "var(--color-green)",
  },
]
