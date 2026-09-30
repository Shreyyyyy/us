import { InteractiveQuestion, LoreMilestone, OpenWhenLetter, SongTrack, VoucherItem } from "@/types";

// GF Questions (Tailored thoughtfully for Divija)
export const GF_QUESTIONS: InteractiveQuestion[] = [
  {
    id: "gf-emotional-battery",
    title: "Divija's Emotional Battery Status",
    subtitle: "Calibrating the MSc Psychologist's inner energy reserves today:",
    category: "emotion",
    options: [
      {
        text: "⚡ 95%+ — Vibrant, bubbly, and ready to tease Shrey endlessly",
        response: "Warning to Shrey: High playful kalesh probability detected! Proceed with tight hugs and spontaneous laughter.",
        reaction: "“Bina bole bhi tumhara sparkle dikhta hai!”"
      },
      {
        text: "🌸 60% — Decent, but mild overthinking background threads running",
        response: "Diagnostic: Overthinking cache detected. Shrey is dispatched to provide 1 warm beverage and listen without offering engineer logic.",
        reaction: "“You don't have to carry the whole world on your shoulders today, Divu.”"
      },
      {
        text: "🌧️ 20% — Drained by adulting, need Shrey's shoulder to lean on",
        response: "Priority Alert! All AI models paused. Shrey's designated role: Human pillow + unlimited reassurance + quiet cuddles.",
        reaction: "“Close your eyes, breathe. I'm right here holding your hand.”"
      },
      {
        text: "😋 Need Paneer, tea & Shrey right now",
        response: "Order confirmed: Soul food + your favorite boy dispatched immediately on express delivery!",
        reaction: "“Food + Us = 100% cure rate.”"
      }
    ]
  },
  {
    id: "gf-shrey-debt",
    title: "What does Shrey legally owe you right now?",
    subtitle: "Select your non-negotiable boyfriend penalty / coupon:",
    category: "love",
    options: [
      {
        text: "🧸 20-minute bear hug without letting go first",
        response: "Voucher Generated! Shrey is barred from letting go until Divija taps out.",
        reaction: "“Non-negotiable. Bound by boyfriend law.”"
      },
      {
        text: "🤫 Listening to me vent for 30 mins with ZERO tech solutions",
        response: "Solution Mode: DISABLED. Active Empathetic Listening Mode: 100% ENGAGED.",
        reaction: "“Just listening, nodding, and holding your hand. Promised.”"
      },
      {
        text: "🚗 Rainy night drive with 'Behkana' on the speakers",
        response: "Weather protocol queued. Windows down, raindrops falling, holding hands at red lights.",
        reaction: "“Our quietest, happiest place in the whole universe.”"
      },
      {
        text: "🕺 2 AM Ranveer Singh dance performance to make me laugh",
        response: "Sicklot LALALA loaded into Shrey's neural core. Chaos mode initialized!",
        reaction: "“You'll laugh so hard your stomach hurts.”"
      }
    ]
  },
  {
    id: "gf-overthinking-decoder",
    title: "Divija's Mind Decompressor",
    subtitle: "What is currently occupying the most RAM in that brilliant mind?",
    category: "psychology",
    options: [
      {
        text: "🧠 Analyzing someone's behavioral micro-expression",
        response: "Psychology student instinct never rests! Shrey's analysis: He's just an open book when he looks at you.",
        reaction: "“You read minds, but with me, my heart is already in your hands.”"
      },
      {
        text: "🥺 Missing Shrey's voice and annoying presence",
        response: "Direct Ping: Shrey is missing his favorite person x1000 right now.",
        reaction: "“Check your notifications or expect a call soon!”"
      },
      {
        text: "⏳ Wondering about our future home and roadmaps",
        response: "Status: Locked and blessed. Cozy lights, warm coffee mugs, and continuous growth together.",
        reaction: "“Kanha ji is sketching our chapters. Have no fear.”"
      },
      {
        text: "✨ Just feeling immensely grateful and soft today",
        response: "Sweetness Overflow! Heart resonance at theoretical maximum.",
        reaction: "“You make life feel poetic, Divija.”"
      }
    ]
  }
];

// BF Questions (Tailored thoughtfully for Shrey)
export const BF_QUESTIONS: InteractiveQuestion[] = [
  {
    id: "bf-neural-load",
    title: "Shrey's CPU & Tensor Load Diagnostic",
    subtitle: "AI Engineer sanity calibration from Divija:",
    category: "code",
    options: [
      {
        text: "🔥 Loss is diverging / CUDA out of memory / Pain",
        response: "Prescription from Dr. Divija: Step away from terminal. Drink water, look at Divija's photo, and take 3 deep breaths.",
        reaction: "“The bug will yield, Shrey. You're brilliant, but don't melt your brain.”"
      },
      {
        text: "🚀 Weights converged! Zero hallucinations! We are flying!",
        response: "Divija's reaction: YAAAY! Proud girlfriend mode unlocked! High five + dessert ordered.",
        reaction: "“I never doubted you for a second, my genius boy.”"
      },
      {
        text: "🕺 2 AM Ranveer Singh mode activated (Pure Shrey chaos)",
        response: "Diagnosis: Dopamine spike + excessive caffeine. Go dance, then sleep, Laddoo!",
        reaction: "“Bhalu, rest those eyes before they turn into binary code.”"
      },
      {
        text: "🧀 Paneer fuel level critically low",
        response: "Immediate dispatch: Re-fuel with protein and text Divija before returning to matrix.",
        reaction: "“Eat properly! I'm watching you from here.”"
      }
    ]
  },
  {
    id: "bf-gf-decoder-test",
    title: "Divija Code Interpreter Challenge",
    subtitle: "Scenario: Divija sends a message containing only: 'Hhhmmm.' What is the loss gradient?",
    category: "psychology",
    options: [
      {
        text: "A: She is totally chill and just acknowledging the message",
        response: "INCORRECT! Massive penalty loss (+9999.0). Never assume 'Hhhmmm' is chill!",
        reaction: "“Boyfriend rookie error! Red alert!”"
      },
      {
        text: "B: Call her immediately, ask with gentle voice: 'Batao kya hua baby?'",
        response: "OPTIMAL GRADIENT! Loss = 0.000. Divija feels instantly seen, valued, and loved.",
        reaction: "“100% correct calibration. You know your girl so well.”"
      },
      {
        text: "C: Send 5 reels of puppies and paneer recipes",
        response: "PASSABLE fallback (+50 points). Cute diversion, but follow up with a call!",
        reaction: "“Distraction works, but your voice works better.”"
      }
    ]
  },
  {
    id: "bf-reassurance-anchor",
    title: "Shrey's Reassurance Vault",
    subtitle: "When the weight of big ambitions feels heavy:",
    category: "care",
    options: [
      {
        text: "🏔️ Feeling pressure to achieve everything yesterday",
        response: "From Divija: Remember how far you've come from Christ University. You are building monumental things. I am so proud of you, every single day.",
        reaction: "“Take it one step at a time. I'm standing by you through all of it.”"
      },
      {
        text: "🚇 Remembering the long metro rides across NCR",
        response: "From Divija: Travelling hours across NCR just to steal 45 minutes together... that effort lives in my heart forever. That's why I know our foundation is unbreakable.",
        reaction: "“I noticed every single step, Shrey.”"
      },
      {
        text: "🦚 Need spiritual quiet & peace",
        response: "From Divija: Kanha ji has guided us through every unspoken glance to where we are today. Surrender the worries, keep doing your karma.",
        reaction: "“Hare Krishna. Peace is already yours.”"
      }
    ]
  }
];

// Curated Soundtrack
export const SOUNDTRACK: SongTrack[] = [
  {
    id: "behkana",
    title: "Behkana",
    artist: "Ali Tariq & Harshdeep Kaur",
    youtubeId: "T8enTpsZx-M",
    annotation: "Our sacred anthem. Unspoken glances, heartbeats syncing without a single word.",
    tag: "Definitive Song",
    accent: "from-rose-500/20 to-pink-500/10"
  },
  {
    id: "sahiba",
    title: "Tera Hua Sahiba",
    artist: "Female Outro Verse Special",
    youtubeId: "r_8k_xL8-5c",
    annotation: "The ending verse that instantly brings a smile and thoughts of you.",
    tag: "Romantic Soul",
    accent: "from-amber-500/20 to-rose-500/10"
  },
  {
    id: "khat-medley",
    title: "Khat • Bairan • Banjaan",
    artist: "Shrey Infinite Focus Loop",
    youtubeId: "r_XQy4iV1Cg",
    annotation: "Your signature coding & focus playlist staples whenever you are locked in the zone.",
    tag: "Flow State",
    accent: "from-cyan-500/20 to-blue-500/10"
  },
  {
    id: "sicklot",
    title: "Hustle — Sicklot LALALA",
    artist: "Chaos Anthem (2 AM Energy)",
    youtubeId: "8x8P1g64_c4",
    annotation: "Peak Ranveer Singh energy. Dancing in the room, zero care in the world, pure Shrey!",
    tag: "Chaotic Good",
    accent: "from-purple-500/20 to-amber-500/10"
  }
];

// Theme song that plays across the whole website (floating player)
export const THEME_SONG: SongTrack = SOUNDTRACK[0];

// Lore & Timeline with Candid Moments
export const LORE_TIMELINE: LoreMilestone[] = [
  {
    year: "Chapter 1",
    title: "CHRIST University Campus",
    subtitle: "The MCA Cool Guy Meets Quiet MSc Psychology Girl",
    description: "Two vastly different worlds on the same campus. He was the popular nerdy tech enthusiast with black frames; she was the observant, gentle psychology scholar. The universe was already setting the dominoes in motion.",
    icon: "🌱",
    loreSecret: "Fun fact: Chintu noticed the quiet intensity behind his nerdy spectacles long before he realized."
  },
  {
    year: "Chapter 2",
    title: "Two Years Later • The Rekindle",
    subtitle: "Instagram DMs collapsed the passage of time",
    description: "Years elapsed, paths diverged, and yet a simple conversation on Instagram dissolved months of silence in minutes. The wavelength was immediate, effortless, and impossible to mistake for anything casual.",
    icon: "📱",
    loreSecret: "The messages turned into 3-hour late night deep talks faster than any AI latency.",
    photo: "/photos/photo-1.jpeg",
    photoTag: "Lazy Cafe Sunbeams",
    photoCaption: "Our quiet, effortless wavelength beside the sunlit green window."
  },
  {
    year: "Chapter 3",
    title: "The NCR Metro Treks",
    subtitle: "Miles across Delhi-NCR for 45 stolen minutes",
    description: "Switching yellow lines, blue lines, crowded metro platforms in Delhi heat—just to sit beside each other for an hour before heading back. Unspoken devotion in every single transit card swipe.",
    icon: "🚇",
    loreSecret: "Chintu always noticed: 'He travelled all this way just to see me smile.' It meant everything.",
    photo: "/photos/photo-2.jpeg",
    photoTag: "100% Attention Matrix",
    photoCaption: "That look in the mall: Shrey mesmerized by Chintu with her pink rose."
  },
  {
    year: "Chapter 4",
    title: "The Rainy Noida Office Pickup",
    subtitle: "Pouring sky, glowing car headlights, infinite warmth",
    description: "The deluge outside, traffic crawling, but inside the car it was an oasis of warmth, laughter, and rain droplets streaming down the windshield with music softly playing.",
    icon: "🌧️",
    loreSecret: "The exact moment the front seat felt like home.",
    photo: "/photos/photo-6.jpeg",
    photoTag: "Sunroof Skies",
    photoCaption: "Under the panoramic glass sunroof: trading silly faces and warm laughter."
  },
  {
    year: "Chapter 5",
    title: "ISKCON Temple & Downtown Nights",
    subtitle: "Quiet reassurance with Kanha ji guiding steps",
    description: "Standing before the deities with incense in the air, bell ringing, praying not for superficial things, but for each other's peace, strength, and life journey. Kanha ji at the center of our bond.",
    icon: "🛕",
    loreSecret: "A promise made in sacred quietude is forever.",
    photo: "/photos/photo-4.jpeg",
    photoTag: "Downtown Brews",
    photoCaption: "Downtown toast under amber lights, sharing dreams and quiet promises."
  },
  {
    year: "Chapter 6",
    title: "THE ROOM INCIDENT 😂",
    subtitle: "Brother banging on the door while Shrey hid in pure terror",
    description: "Folklore of legendary proportions. The adrenaline rush, Shrey freezing like a statue behind furniture, heart pounding at 200 BPM, trying not to breathe. An unforgettable comedy chapter!",
    icon: "🚪",
    loreSecret: "Shrey's heart rate was officially higher than any GPU stress test on record.",
    photo: "/photos/photo-3.jpeg",
    photoTag: "Chaos Duo",
    photoCaption: "Matching cheeky thinking poses from the top atrium overlook."
  },
  {
    year: "Chapter 7",
    title: "July 2026 & Beyond",
    subtitle: "Official, documented, and completely irreversible",
    description: "From unspoken glances to a lifetime partnership. Two hearts calibrated forever.",
    icon: "❤️",
    loreSecret: "Model weights frozen forever. Zero rollback support.",
    photo: "/photos/photo-5.jpeg",
    photoTag: "Bollywood Romance",
    photoCaption: "Our cinematic cheek kiss under glowing red arches — pure poetry."
  }
];

// Open When Letters
export const OPEN_WHEN_LETTERS: OpenWhenLetter[] = [
  {
    id: "miss",
    title: "You Miss Me Immensely",
    icon: "🫂",
    preview: "When the distance feels tangible and you just want my warmth...",
    body: "Close your eyes for a moment. Remember the way we sit side by side in silence, where neither of us has to pretend or put on a show. That comfort is not bounded by geography. I am carrying you with me in every thought, every little funny thing I see throughout the day, and every quiet breath. You are always my first and last thought.",
    ps: "P.S. Squeeze your pillow right now—that's a certified bear hug dispatched to you."
  },
  {
    id: "bad",
    title: "A Bad or Tiring Day",
    icon: "🌧️",
    preview: "When work, people, or circumstance feel exhausting...",
    body: "Take off the armor. You don't have to be resilient or strong for the next few hours. Whatever went wrong today does not define your worth or our tomorrow. Kanha ji is always keeping watch over us. Every rough day is just a noisy training epoch before the model converges into beauty. I believe in you even when you're too exhausted to believe in yourself.",
    ps: "P.S. Wash your face with warm water and let me listen to you vent."
  },
  {
    id: "stress",
    title: "Overwhelmed by Big Goals",
    icon: "🧠",
    preview: "When the weight of deadlines and ambition presses on your chest...",
    body: "Look back at where you started. You have navigated every single hurdle that you once thought was insurmountable. You have brilliant intelligence, unmatched drive, and a heart made of gold. Don't let transient bug reports, sprint stress, or anxious thoughts rob you of your present peace. One small step today is enough.",
    ps: "P.S. Stretch your shoulders, unclench your jaw, and take a sip of water."
  },
  {
    id: "sleep",
    title: "Can't Fall Asleep at Night",
    icon: "🌙",
    preview: "When your brain is running 50 background processes at 2 AM...",
    body: "Shut down your mental browser tabs. Nothing needs to be resolved tonight. The world can wait until the sun rises. Imagine our future living room with warm fairy lights, soft rain pattering on the glass, and our quiet laughter. You are safe, you are loved, and tomorrow has fresh grace waiting for you.",
    ps: "P.S. Goodnight my Chintu. Sleep peacefully, wrapped in my love."
  },
  {
    id: "reassure",
    title: "Need Pure Reassurance",
    icon: "🥹",
    preview: "When little doubts whisper or you need to be reminded...",
    body: "I choose you. Not just when it's easy or breezy, but in every mood, through every busy week, through every goofy argument, and through all the years ahead. I value your effort, your humor, your devotion, and your authentic self. You are my favorite human being in this entire 8-billion-person world.",
    ps: "P.S. Irreversible contract. No refund, no return policy!"
  },
  {
    id: "laugh",
    title: "Need a Quick Laugh",
    icon: "😂",
    preview: "Emergency serotonin injection for your face...",
    body: "Reminder: Somewhere in an alternate universe, you are still hiding behind that door while the brother is knocking, wondering if you should jump out the window or pretend to be a coat rack. Also reminder: You are my brilliant boy, I am your Chintu, and together we run our own happy chaotic world!",
    ps: "P.S. Smile right now! Yes, I saw that half-smile."
  },
  {
    id: "future",
    title: "Dreaming of Our Future",
    icon: "🏡",
    preview: "A warm sneak peek into what we are building together...",
    body: "Picture it: A warm, minimalist, plant-filled home. Fairy lights strung along the bookshelf. Smell of fresh spices and coffee. Rainy weekend evenings with no alarms set. Packing bags for mountain trips and seaside walks. Growing old, staying curious, cheering each other's triumphs. We are creating that reality step by step.",
    ps: "P.S. With Kanha ji's blessings, everything is falling into place."
  }
];

// Boyfriend / Girlfriend Vouchers
export const LOVE_VOUCHERS: VoucherItem[] = [
  {
    id: "v-1",
    title: "Unlimited Forehead Kisses",
    subtitle: "Redeemable anytime, anywhere with zero expiration.",
    icon: "💋",
    redeemed: false,
    forWhom: "Divija"
  },
  {
    id: "v-2",
    title: "No-Questions-Asked Paneer Feast",
    subtitle: "Divija sponsors your favorite paneer treat with a warm smile.",
    icon: "🧀",
    redeemed: false,
    forWhom: "Shrey"
  },
  {
    id: "v-3",
    title: "Vibe Check & 30-Min Rant Session",
    subtitle: "Complete active listening, zero technical solutions, 100% empathy.",
    icon: "🍵",
    redeemed: false,
    forWhom: "Divija"
  },
  {
    id: "v-4",
    title: "2 AM Ranveer Singh Chaos Pass",
    subtitle: "Free pass to blast Punjabi / Sicklot tunes and dance wildly without judgment.",
    icon: "🕺",
    redeemed: false,
    forWhom: "Shrey"
  },
  {
    id: "v-5",
    title: "Temple & Peaceful Evening Walk",
    subtitle: "Hand-in-hand quiet evening under the temple lights and cool breeze.",
    icon: "🛕",
    redeemed: false,
    forWhom: "Divija"
  }
];

// Photo Gallery - Real memories of Shrey & Divija
export const GALLERY_PHOTOS: import("@/types").MemoryPhoto[] = [
  {
    id: "photo-kiss-cinema",
    src: "/photos/photo-5.jpeg",
    title: "Our Bollywood Cinematic Kiss",
    caption: "DDLJ glowing in the cinema background, warm neon arch lights, and a gentle cheek kiss that makes all the noisy bustle of Delhi-NCR fade into silence. Pure poetry.",
    tag: "Favorite Memory",
    vibe: "“Bina bole jo nazar keh jaaye…”",
    category: "romantic",
    aspect: "aspect-[3/4]"
  },
  {
    id: "photo-that-look",
    src: "/photos/photo-2.jpeg",
    title: "That Look (100% Attention Matrix)",
    caption: "Shrey in his signature black frames and black sleeveless top, completely captivated by Divija. Divija with a sweet pink rose pinned to her bag, linking hands. The way he looks at her says more than a million words.",
    tag: "Unconditional Love",
    vibe: "Attention Matrix: 1.000",
    category: "romantic",
    aspect: "aspect-[3/4]"
  },
  {
    id: "photo-car-sunroof",
    src: "/photos/photo-6.jpeg",
    title: "Sunroof Skies & Car Bickering",
    caption: "Under the panoramic glass sunroof! Shrey in his red basketball jersey resting his chin, totally fascinated, while Divija in her glasses makes cute goofy faces. The best memories are made between red lights.",
    tag: "Noida Drives",
    vibe: "Front Seat Royalty",
    category: "chaos",
    aspect: "aspect-[4/3]"
  },
  {
    id: "photo-cafe-sunlight",
    src: "/photos/photo-1.jpeg",
    title: "Lazy Cafe Sunbeams & Warmth",
    caption: "Sitting side-by-side beside the sunlit green window. Divija in her crimson floral dress with that radiant smile, and Shrey right next to her. Effortless comfort that needs zero pretense.",
    tag: "Quiet Comfort",
    vibe: "Heartbeat Synced",
    category: "romantic",
    aspect: "aspect-[9/16]"
  },
  {
    id: "photo-mall-thinking",
    src: "/photos/photo-3.jpeg",
    title: "Masterminds of Kalesh & Cuddles",
    caption: "Top floor atrium overlook! Matching cheeky thinking poses with fingers under our chins. Posing like we're solving grand mathematical theorems when we're just plotting which snack to devour next.",
    tag: "Chaos Duo",
    vibe: "Overthinking Mode: Peak",
    category: "chaos",
    aspect: "aspect-[4/3]"
  },
  {
    id: "photo-downtown-brews",
    src: "/photos/photo-4.jpeg",
    title: "Downtown Brews & Midnight Talks",
    caption: "Two frosty mugs of craft beer under the warm amber pub lights, spectacles set down on the table. A toast to surviving tough sprints, chasing wild dreams, and cherishing stolen hours together.",
    tag: "Date Night",
    vibe: "Cheers to Us",
    category: "dates",
    aspect: "aspect-[3/4]"
  }
];
