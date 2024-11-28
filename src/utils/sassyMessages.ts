const SASSY_INTROS = [
  "Listen up, buttercup!",
  "Oh for f*ck's sake,",
  "Ugh, here we go again...",
  "Yo, fitness freak!",
  "*eye roll* Time to",
  "Get your lazy a** up and",
  "Don't make me come over there...",
  "Well well well...",
  "Surprise, b*tch!",
  "Look who needs a reminder...",
];

const SASSY_ENDINGS = [
  "...or whatever 🙄",
  "Don't disappoint me! 💅",
  "Chop chop! ⚡️",
  "Let's gooooo! 🔥",
  "No excuses today! 🚫",
  "I mean it! 😤",
  "...or I'm telling your mom! 📱",
  "Time to shine! ✨",
  "...and make it snappy! ⚡️",
  "The audacity of me having to remind you... 🙄",
];

const FOLLOW_UP_INTROS = [
  "Still waiting... 🙄",
  "Hello??? Earth to human!",
  "Did you ghost me?",
  "Don't ignore me!",
  "Tick tock...",
  "I'm not going away...",
  "You thought I'd forget?",
  "Nice try avoiding me...",
  "Ahem... *taps foot*",
  "Back for round 2!",
];

export function generateSassyMessage(activity: string, isFollowUp: boolean = false): string {
  if (isFollowUp) {
    const intro = FOLLOW_UP_INTROS[Math.floor(Math.random() * FOLLOW_UP_INTROS.length)];
    return `${intro} Did you ${activity.toLowerCase()} or not? Reply 'YES' to confirm!`;
  }

  const intro = SASSY_INTROS[Math.floor(Math.random() * SASSY_INTROS.length)];
  const ending = SASSY_ENDINGS[Math.floor(Math.random() * SASSY_ENDINGS.length)];
  
  const message = `${intro} ${activity.toLowerCase()} ${ending}`;
  return message;
}