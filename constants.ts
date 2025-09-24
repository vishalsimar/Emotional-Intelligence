import { Emotion } from './types';

export const EMOTIONS: Emotion[] = [
  {
    id: 'emotion-1',
    name: 'Anger',
    emoji: '🔴',
    color: 'red',
    description: 'A strong feeling of annoyance, displeasure, or hostility.',
    relatedWords: ['Irritation', 'Frustration', 'Rage'],
    strategies: {
      immediate: [
        { id: 's1-1', title: 'Deep Breathing', steps: ['Inhale slowly through your nose for 4 seconds.', 'Hold your breath for 4 seconds.', 'Exhale slowly through your mouth for 6 seconds.', 'Repeat this 5 times to calm your nervous system.'] },
        { id: 's1-2', title: 'Change Your Scenery', steps: ['If possible, step outside for fresh air.', 'If not, move to a different room.', 'This creates mental distance from the trigger.'] },
        { id: 's1-3', title: 'Count to Ten', steps: ['Pause before you react.', 'Slowly count to 10 in your head.', 'This gives your rational brain time to catch up.'] },
      ],
      shortTerm: [
        { id: 's1-4', title: 'Vigorous Exercise', steps: ['Engage in at least 15 minutes of physical activity.', 'Try a brisk walk, a run, or dancing.', 'Exercise is a powerful physical outlet for angry energy.'] },
        { id: 's1-5', title: 'Journaling', steps: ['Write down exactly what you\'re feeling and why.', 'Don\'t censor yourself; let the thoughts flow out.', 'This helps you process the emotion without acting on it.'] },
        { id: 's1-6', title: 'Problem-Solve', steps: ['Once you feel calmer, identify the specific problem.', 'Brainstorm 2-3 potential solutions you can try.', 'Focus on what you can control.'] },
      ],
      longTerm: [
        { id: 's1-7', title: 'Identify Triggers', steps: ['Notice what consistently makes you angry.', 'Keep a log of situations, people, or thoughts.', 'Recognizing your triggers is the first step to managing them.'] },
        { id: 's1-8', title: 'Develop Empathy', steps: ['Try to see the situation from the other person\'s point of view.', 'Ask yourself: "What might they be thinking or feeling?"', 'This can soften feelings of resentment.'] },
        { id: 's1-9', title: 'Mindfulness Meditation', steps: ['Practice 5-10 minutes of mindfulness each day.', 'Focus on your breath and observe your thoughts without judgment.', 'This reduces reactivity over time.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho1-1', title: 'Stay Calm and Validate', steps: ['Do not mirror their anger. Use a calm tone.', 'Say "I can see why you\'re so angry." This shows you\'re listening, not judging.', 'Avoid smiling or laughing, which can feel dismissive.'] },
      { id: 'ho1-2', title: 'Give Them Space', steps: ['Ask if they need some time alone before talking.', 'Don\'t crowd them or physically block them.', 'Let them know you\'re there for them when they\'re ready to talk.'] },
      { id: 'ho1-3', title: 'Listen Without Defensiveness', steps: ['Avoid saying "You shouldn\'t be angry" or making excuses.', 'Listen to their perspective first, even if you disagree.', 'Focus on understanding their feelings before responding.'] },
    ],
  },
  {
    id: 'emotion-2',
    name: 'Sadness',
    emoji: '🔵',
    color: 'blue',
    description: 'A feeling of unhappiness, sorrow, or grief.',
    relatedWords: ['Grief', 'Despair', 'Loneliness'],
    strategies: {
      immediate: [
        { id: 's2-1', title: 'Acknowledge the Feeling', steps: ['Allow yourself to feel sad without judgment.', 'Say to yourself: "It\'s okay that I feel sad right now."', 'Suppressing it can make it worse.'] },
        { id: 's2-2', title: 'Self-Soothing', steps: ['Wrap yourself in a warm blanket.', 'Listen to calming music or a comforting podcast.', 'Have a warm, non-caffeinated drink like herbal tea.'] },
        { id: 's2-3', title: 'Mindful Observation', steps: ['Notice where you feel sadness in your body.', 'Is it a tightness in your chest? A heaviness in your limbs?', 'Just observe without trying to change it.'] },
      ],
      shortTerm: [
        { id: 's2-4', title: 'Connect with Nature', steps: ['Spend at least 10 minutes outdoors.', 'If you can, go for a walk in a park or near trees.', 'Nature has a proven restorative effect on mood.'] },
        { id: 's2-5', title: 'Engage in a Gentle Hobby', steps: ['Do something you usually enjoy, even if you don’t feel like it.', 'Examples: reading, drawing, listening to music.', 'The activity itself can be gently uplifting.'] },
        { id: 's2-6', title: 'Reach Out for Support', steps: ['Call or text a trusted friend or family member.', 'You don\'t have to talk about the sadness; just connecting can help.', 'Social connection is a powerful buffer.'] },
      ],
      longTerm: [
        { id: 's2-7', title: 'Practice Gratitude', steps: ['Each day, write down or think of three specific things you are grateful for.', 'It could be as simple as a sunny day or a good cup of coffee.', 'This shifts focus from loss to appreciation.'] },
        { id: 's2-8', title: 'Build a Support System', steps: ['Actively cultivate relationships that make you feel valued.', 'Schedule regular check-ins with friends or family.', 'Strong social ties are key to long-term well-being.'] },
        { id: 's2-9', title: 'Seek Professional Help', steps: ['If sadness persists and impacts your daily life, consider therapy.', 'A therapist can provide tools and strategies to manage it effectively.', 'It is a sign of strength to ask for help.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho2-1', title: 'Just Be Present', steps: ['You don\'t need to have the right words. Simply sitting with them in silence can be powerful.', 'Your non-judgmental presence shows you care.', 'Let them lead the conversation, if there is one.'] },
      { id: 'ho2-2', title: 'Listen Without \'Fixing\'', steps: ['Let them talk without interrupting.', 'Avoid giving unsolicited advice or saying "Look on the bright side."', 'The goal is to understand and validate, not to solve their problem.'] },
      { id: 'ho2-3', title: 'Offer Specific, Practical Help', steps: ['Instead of "Let me know if you need anything," try "Can I bring you dinner tonight?" or "I can walk your dog this afternoon."', 'This is easier for them to accept.' ] },
    ],
  },
  {
    id: 'emotion-3',
    name: 'Fear',
    emoji: '🟣',
    color: 'purple',
    description: 'An unpleasant emotion caused by the belief that someone or something is dangerous.',
    relatedWords: ['Anxiety', 'Worry', 'Nervousness'],
    strategies: {
      immediate: [
        { id: 's3-1', title: '5-4-3-2-1 Grounding', steps: ['Name 5 things you can see.', 'Name 4 things you can physically feel.', 'Name 3 things you can hear.', 'Name 2 things you can smell.', 'Name 1 thing you can taste.'] },
        { id: 's3-2', title: 'Box Breathing', steps: ['Breathe in for 4 seconds.', 'Hold your breath for 4 seconds.', 'Breathe out for 4 seconds.', 'Hold your breath for 4 seconds. Repeat.'] },
        { id: 's3-3', title: 'Cold Water', steps: ['Splash cold water on your face.', 'Or, hold an ice cube in your hand.', 'The shock of the cold can interrupt a fear cycle.'] },
      ],
      shortTerm: [
        { id: 's3-4', title: 'Challenge Anxious Thoughts', steps: ['Write down the worry that is scaring you.', 'Ask: "What is the evidence for this thought? Against it?"', 'Try to come up with a more balanced, realistic thought.'] },
        { id: 's3-5', title: 'Progressive Muscle Relaxation', steps: ['Starting with your toes, tense a muscle group for 5 seconds.', 'Release the tension completely for 10 seconds.', 'Work your way up your body.'] },
        { id: 's3-6', title: 'Limit Caffeine & News', steps: ['Avoid stimulants like coffee that can mimic anxiety symptoms.', 'Limit your exposure to distressing news for a day or two.', 'Protect your mental space.'] },
      ],
      longTerm: [
        { id: 's3-7', title: 'Gradual Exposure', steps: ['Identify a fear you want to overcome.', 'Break it down into very small, manageable steps.', 'Practice the first step until it feels less scary, then move to the next.'] },
        { id: 's3-8', title: 'Establish a Routine', steps: ['Create predictable routines for mornings and evenings.', 'Consistent sleep, meals, and work times provide stability.', 'This reduces the sense of uncertainty that fuels anxiety.'] },
        { id: 's3-9', title: 'Regular Exercise', steps: ['Aim for 30 minutes of moderate exercise most days of the week.', 'Physical activity is one of the most effective long-term strategies for anxiety.', 'It burns off stress hormones and releases endorphins.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho3-1', title: 'Don\'t Dismiss Their Fear', steps: ['Avoid saying "Don\'t worry" or "It\'s not a big deal." Their fear is real to them.', 'Instead, say "That sounds really scary" or "I\'m here with you."', 'Validation is key to making them feel safe.'] },
      { id: 'ho3-2', title: 'Help Them Ground Themselves', steps: ['Gently guide them to focus on the present.', 'You can use the 5-4-3-2-1 technique with them, or ask them to describe their immediate surroundings.', 'Slow, deep breathing with them can also help.'] },
      { id: 'ho3-3', title: 'Offer Reassurance of Safety', steps: ['Remind them that they are physically safe right now (if true).', 'Let them know you\'re with them and you\'re not going anywhere.', 'A calm and steady presence is very powerful.'] },
    ],
  },
  {
    id: 'emotion-4',
    name: 'Happiness',
    emoji: '🟡',
    color: 'yellow',
    description: 'A feeling of pleasure, contentment, or joy.',
    relatedWords: ['Joy', 'Contentment', 'Elation'],
    strategies: {
      immediate: [
        { id: 's4-1', title: 'Savor the Moment', steps: ['Pause what you are doing for 30 seconds.', 'Pay attention to the positive feelings in your body.', 'Notice the specific sights, sounds, and sensations around you.'] },
        { id: 's4-2', title: 'Express It', steps: ['Smile genuinely, even if you are alone.', 'If you can, laugh out loud.', 'Tell someone what you\'re happy about.'] },
        { id: 's4-3', title: 'Positive Body Language', steps: ['Stand up straight and tall.', 'Open your posture (uncross arms).', 'Your physical state can reinforce your emotional state.'] },
      ],
      shortTerm: [
        { id: 's4-4', title: 'Share Your Joy', steps: ['Tell a supportive friend or family member about your good news.', 'Celebrating with others can amplify positive emotions.', 'Choose someone who you know will be happy for you.'] },
        { id: 's4-5', title: 'Journal About It', steps: ['Write down the details of what brought you happiness.', 'Describe what happened, who was there, and how it felt.', 'This helps you relive and solidify the experience.'] },
        { id: 's4-6', title: 'Create a "Joy List"', steps: ['Make a list of 10-15 simple things that reliably bring you happiness.', 'Examples: a specific song, a type of tea, a funny video.', 'Keep this list handy for when you need a boost.'] },
      ],
      longTerm: [
        { id: 's4-7', title: 'Practice Gratitude', steps: ['Keep a journal where you regularly write down things you are thankful for.', 'Make it a habit, like at the end of each day.', 'This trains your brain to notice the positive.'] },
        { id: 's4-8', title: 'Cultivate Optimism', steps: ['When you face a setback, practice looking for the lesson or opportunity.', 'Believe in a positive future and your ability to handle challenges.', 'This is a skill that can be developed over time.'] },
        { id: 's4-9', title: 'Perform Acts of Kindness', steps: ['Do something kind for someone else without expecting anything in return.', 'It can be small, like giving a genuine compliment.', 'Helping others is a reliable way to boost your own happiness.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho4-1', title: 'Be Genuinely Happy For Them', steps: ['Share in their excitement. Ask questions to hear more about their good news.', 'Your genuine enthusiasm will amplify their joy.', 'Mirror their positive energy.'] },
      { id: 'ho4-2', title: 'Celebrate With Them', steps: ['Don\'t downplay their achievement or change the subject.', 'Offer a sincere "Congratulations!" or "That\'s amazing news, tell me more!"', 'Let them have the spotlight.'] },
      { id: 'ho4-3', title: 'Avoid One-Upping', steps: ['Resist the urge to immediately share a similar, bigger story of your own.', 'Let this be their moment.', 'The focus should be entirely on their positive experience.'] },
    ],
  },
  {
    id: 'emotion-5',
    name: 'Disgust',
    emoji: '🟢',
    color: 'green',
    description: 'A feeling of revulsion or strong disapproval.',
    relatedWords: ['Aversion', 'Revulsion', 'Contempt'],
    strategies: {
      immediate: [
        { id: 's5-1', title: 'Create Physical Distance', steps: ['If possible, physically move away from the source of your disgust.', 'This is your body\'s natural protective instinct.', 'Step into another room or go outside.'] },
        { id: 's5-2', title: 'Sensory Shift', steps: ['Engage a different, pleasant sense.', 'Look at a beautiful picture on your phone.', 'Smell something you enjoy, like coffee, a flower, or essential oil.'] },
        { id: 's5-3', title: 'Neutral Observation', steps: ['Acknowledge the feeling without judgment.', 'Say to yourself: "I am feeling disgust, and that\'s okay."', 'This separates you from the intensity of the emotion.'] },
      ],
      shortTerm: [
        { id: 's5-4', title: 'Cognitive Reappraisal', steps: ['Ask yourself: "Is there another way to look at this situation?"', 'Try to find a more neutral or objective perspective.', 'This can reduce the emotional charge.'] },
        { id: 's5-5', title: 'Practice Compassion', steps: ['If disgust is aimed at a person (contempt), try to understand their story.', 'Consider the factors that might have led to their behavior.', 'This can foster empathy and reduce judgment.'] },
        { id: 's5-6', title: 'Focus on Your Breath', steps: ['Breathe in through your nose and out through your mouth.', 'Focusing on the physical sensation of breathing can ground you.', 'It helps you tolerate the uncomfortable physical sensations of disgust.'] },
      ],
      longTerm: [
        { id: 's5-7', title: 'Understand Its Purpose', steps: ['Recognize that disgust is a protective emotion.', 'Its purpose is to keep you safe from contamination or social violations.', 'Appreciating its function can reduce its power.'] },
        { id: 's5-8', title: 'Expand Your Perspective', steps: ['Gently expose yourself to different cultures, ideas, and ways of life.', 'Read books or watch documentaries about unfamiliar topics.', 'This broadens your acceptance and reduces reactive disgust.'] },
        { id: 's5-9', title: 'Mindful Self-Compassion', steps: ['Practice being kind to yourself when you feel disgust.', 'This is especially important if the feeling turns inward as self-criticism.', 'Treat yourself as you would a good friend.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho5-1', title: 'Acknowledge Their Reaction', steps: ['Validate their feeling by saying something like, "I can understand why that would be upsetting to you."', 'Don\'t tell them they are overreacting.', 'Respect their experience.'] },
      { id: 'ho5-2', title: 'Don\'t Force Engagement', steps: ['If they are disgusted by something, don\'t try to convince them it\'s not so bad.', 'Respect their boundary and help them create distance if needed.', 'Allow them to disengage from the trigger.'] },
      { id: 'ho5-3', title: 'Gently Shift Focus', steps: ['After acknowledging their feeling, you can try to change the topic or move to a different environment.', 'This can help them move past the immediate feeling.', 'Offer a distraction.'] },
    ],
  },
  {
    id: 'emotion-6',
    name: 'Surprise',
    emoji: '🟠',
    color: 'orange',
    description: 'A brief feeling of astonishment or amazement.',
    relatedWords: ['Shock', 'Astonishment', 'Awe'],
    strategies: {
      immediate: [
        { id: 's6-1', title: 'Pause and Breathe', steps: ['Take one deep, conscious breath.', 'Surprise is the shortest-lived emotion; this gives you a second to process.', 'Resist the urge to react instantly.'] },
        { id: 's6-2', title: 'Scan Your Body', steps: ['Quickly notice the physical sensations of surprise.', 'Are your eyes wide? Is your mouth open? Is your heart rate up?', 'This brings you into the present moment.'] },
        { id: 's6-3', title: 'Label the After-Emotion', steps: ['After the initial shock, what do you feel?', 'Is it happiness, fear, confusion, or something else?', 'Naming the next emotion helps you manage it.'] },
      ],
      shortTerm: [
        { id: 's6-4', title: 'Gather Information', steps: ['If the surprise was due to unexpected news, ask clarifying questions.', 'Avoid making assumptions.', 'Get a clearer picture of the situation before you decide how to feel or act.'] },
        { id: 's6-5', title: 'Talk It Out', steps: ['Describe the surprising event to a trusted person.', 'Explaining what happened can help your brain make sense of it.', 'Verbalizing can organize your thoughts.'] },
        { id: 's6-6', title: 'Check Your Assumptions', steps: ['Ask yourself: "What did I believe would happen?"', 'Understanding your prior expectation can reveal why this event was so surprising.', 'This can be a valuable learning moment.'] },
      ],
      longTerm: [
        { id: 's6-7', title: 'Cultivate Curiosity', steps: ['Adopt a mindset of curiosity and openness to the unknown.', 'View surprising events not as threats, but as potential adventures.', 'This makes the unexpected less jarring.'] },
        { id: 's6-8', title: 'Practice Mindfulness', steps: ['Engage in daily mindfulness practice.', 'This helps you stay grounded in the present moment.', 'Being present reduces the shock of the unexpected.'] },
        { id: 's6-9', title: 'Embrace a Growth Mindset', steps: ['View surprises as opportunities to learn and grow.', 'Ask yourself: "What can I learn from this?"', 'This reframes surprises from disruptive to constructive.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho6-1', title: 'Stay Calm and Grounding', steps: ['Your calm presence can be very reassuring.', 'Help them take a deep breath with you.', 'This co-regulation can be very effective.'] },
      { id: 'ho6-2', title: 'Validate and Give Space', steps: ['Acknowledge the shock by saying "Wow, that\'s a lot to take in."', 'Ask if they need a minute to process before talking.', 'Don\'t rush them.'] },
      // FIX: The object below had an incorrect structure. Corrected to use 'title' and 'steps' properties.
      { id: 'ho6-3', title: 'Help Process Information', steps: ['Once the initial shock passes, help them make sense of it.', 'Ask open-ended questions like "How are you feeling about this?"', 'Listen without judgment.'] },
    ],
  },
  {
    id: 'emotion-7',
    name: 'Guilt',
    emoji: '🟤',
    color: 'stone',
    description: 'A feeling of responsibility or remorse for a perceived offense, real or imagined.',
    relatedWords: ['Remorse', 'Regret', 'Self-reproach'],
    strategies: {
      immediate: [
        { id: 's7-1', title: 'Acknowledge Without Judgment', steps: ['Notice the feeling of guilt.', 'Say to yourself, "I am feeling guilt," instead of "I am guilty."', 'This separates the feeling from your identity.'] },
        { id: 's7-2', title: 'Fact-Check Your Guilt', steps: ['Ask: "Did I actually do something wrong, or do I just feel like I did?"', '"What is the evidence for my responsibility?"', 'Separate appropriate guilt (I did something wrong) from inappropriate guilt (I feel responsible for things outside my control).'] },
      ],
      shortTerm: [
        { id: 's7-3', title: 'Make Amends (If Appropriate)', steps: ['If you harmed someone, consider a sincere apology.', 'Think about what you can do to repair the situation.', 'Taking reparative action can resolve feelings of guilt.'] },
        { id: 's7-4', title: 'Practice Self-Compassion', steps: ['Talk to yourself as you would a friend who made a mistake.', 'Acknowledge that everyone makes mistakes.', 'Remind yourself that one action does not define your entire character.'] },
      ],
      longTerm: [
        { id: 's7-5', title: 'Learn From the Mistake', steps: ['Identify what you can do differently next time.', 'View guilt as a signal that you violated one of your values.', 'Use it as a guide for future behavior, turning a negative into a positive.'] },
        { id: 's7-6', title: 'Practice Self-Forgiveness', steps: ['Write a letter of forgiveness to yourself.', 'Recognize that holding onto guilt can be a form of self-punishment that is no longer productive.', 'Letting go allows you to move forward.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho7-1', title: 'Listen and Validate', steps: ['Let them express their feelings without trying to dismiss them.', 'Say things like "That sounds really difficult to carry."', 'Avoid saying "Don\'t feel guilty" or "It wasn\'t a big deal."'] },
      { id: 'ho7-2', title: 'Separate the Person from the Behavior', steps: ['Remind them that making a mistake does not make them a bad person.', 'Help them see their inherent worth outside of this one action.', 'Focus on their positive qualities.'] },
    ],
  },
  {
    id: 'emotion-8',
    name: 'Envy',
    emoji: '🟩',
    color: 'lime',
    description: "The painful feeling of wanting what someone else has (e.g., their success, possessions, or qualities). Envy is a two-person situation: You and the person you envy. It's about wanting something you lack.",
    relatedWords: ['Covetousness', 'Resentment', 'Longing'],
    strategies: {
      immediate: [
        { id: 's8-1', title: 'Name It to Tame It', steps: ['Acknowledge the feeling: "I am feeling envy right now."', 'Don\'t judge yourself for feeling it; it\'s a common human emotion.', 'Observing it reduces its power.'] },
        { id: 's8-2', title: 'Shift to Gratitude', steps: ['Quickly name three things in your own life you are grateful for.', 'This can be anything, big or small.', 'It\'s hard to feel envious and grateful at the exact same moment.'] },
      ],
      shortTerm: [
        { id: 's8-3', title: 'Limit Social Media Exposure', steps: ['Recognize that social media often shows a curated highlight reel.', 'If a particular account is a trigger, mute or unfollow it for a while.', 'Protect your mental space.'] },
        { id: 's8-4', title: 'Use Envy as a Compass', steps: ['Ask yourself: "What is my envy telling me that I want?"', 'Use this information to clarify your own goals and aspirations.', 'Let it be a source of motivation, not misery.'] },
      ],
      longTerm: [
        { id: 's8-5', title: 'Practice "Mudita" (Sympathetic Joy)', steps: ['Actively practice feeling happy for others\' successes.', 'Start small, with people you aren\'t envious of.', 'This rewires your brain to see others\' good fortune as a positive, not a threat.'] },
        { id: 's8-6', title: 'Focus on Your Own Journey', steps: ['Remind yourself that comparison is the thief of joy.', 'Regularly review your own progress and accomplishments.', 'Compete with who you were yesterday, not with who someone else is today.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho8-1', title: 'Validate the Underlying Desire', steps: ['Look past the envy to the desire underneath.', 'Say "It sounds like you really value that, and it\'s hard to see someone else have it."', 'This shows you understand the root of the pain.'] },
      { id: 'ho8-2', title: 'Shift Focus to Their Strengths', steps: ['Gently remind them of their own unique talents and accomplishments.', 'Help them see what others might envy about them.', 'This can help rebalance their perspective.'] },
    ],
  },
  {
    id: 'emotion-9',
    name: 'Overwhelm',
    emoji: '🌀',
    color: 'indigo',
    description: 'Feeling swamped by mental, emotional, or physical demands, often leading to a sense of paralysis.',
    relatedWords: ['Stressed', 'Swamped', 'Burnout'],
    strategies: {
      immediate: [
        { id: 's9-1', title: 'Brain Dump', steps: ['Take a piece of paper and write down everything that is on your mind.', 'Don\'t organize it, just get it all out.', 'This clears your head and makes the tasks feel more manageable.'] },
        { id: 's9-2', title: 'Pick One Small Thing', steps: ['Look at your list and choose the smallest, easiest task you can complete in 2 minutes.', 'Do it immediately.', 'This breaks the paralysis and creates forward momentum.'] },
      ],
      shortTerm: [
        { id: 's9-3', title: 'Prioritize with the Eisenhower Matrix', steps: ['Divide your tasks into four quadrants: Urgent/Important, Not Urgent/Important, Urgent/Not Important, Not Urgent/Not Important.', 'Focus on the "Urgent/Important" box first.', 'This helps you focus your energy where it matters most.'] },
        { id: 's9-4', title: 'Schedule Breaks and Rest', steps: ['Block out time in your calendar for breaks, just as you would for meetings.', 'Ensure you are getting enough sleep.', 'Rest is not a luxury; it is essential for effective functioning.'] },
      ],
      longTerm: [
        { id: 's9-5', title: 'Simplify and Say No', steps: ['Regularly review your commitments and obligations.', 'Practice politely declining requests that are not aligned with your priorities.', 'Protecting your time and energy is a key skill.'] },
        { id: 's9-6', title: 'Build Stress-Reduction Habits', steps: ['Incorporate small, regular stress-reducing activities into your day.', 'Examples: a 5-minute meditation, a short walk, listening to music.', 'This builds resilience against future overwhelm.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho9-1', title: 'Offer Specific Help', steps: ['Instead of "Let me know if you need anything," say "Can I take care of dinner tonight?" or "I can handle that email for you."', 'This removes the mental load of them having to delegate.'] },
      { id: 'ho9-2', title: 'Help Them Brain Dump and Prioritize', steps: ['Sit with them and a piece of paper.', 'Act as a scribe while they list everything on their mind.', 'Then, help them identify just one or two things to focus on first.'] },
    ],
  },
  {
    id: 'emotion-10',
    name: 'Shame',
    emoji: '⚫️',
    color: 'rose',
    description: 'A painful feeling that you are fundamentally flawed, caused by a consciousness of wrong or foolish behavior.',
    relatedWords: ['Humiliation', 'Embarrassment', 'Worthlessness'],
    strategies: {
      immediate: [
        { id: 's10-1', title: 'Ground Yourself', steps: ['Use the 5-4-3-2-1 technique to connect with your senses.', 'This pulls you out of the internal shame spiral and into the present moment.', 'Focus on your physical surroundings.'] },
        { id: 's10-2', title: 'Soothe Your Nervous System', steps: ['Place a hand on your heart and another on your belly.', 'Breathe deeply and slowly.', 'This activates your parasympathetic nervous system and reduces the physical intensity of shame.'] },
      ],
      shortTerm: [
        { id: 's10-3', title: 'Share with a Trusted Person', steps: ['Shame thrives in secrecy and isolation.', 'Share your experience with a non-judgmental friend or partner.', 'Hearing "I still love and respect you" is a powerful antidote.'] },
        { id: 's10-4', title: 'Separate Self from Behavior', steps: ['Reframe the thought. Instead of "I am a bad person," say "I did something I regret."', 'This is the core difference between shame (self) and guilt (action).'] },
      ],
      longTerm: [
        { id: 's10-5', title: 'Practice Self-Compassion', steps: ['Treat yourself with the same kindness you would offer a good friend.', 'Acknowledge that to be human is to be imperfect and make mistakes.', 'Counter your inner critic with a compassionate voice.'] },
        { id: 's10-6', title: 'Identify Shame Triggers', steps: ['Notice what situations, people, or thoughts tend to trigger feelings of shame.', 'Awareness is the first step toward building resilience against them.', 'Recognize your patterns.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho10-1', title: 'Empathize Without Judgment', steps: ['Listen to their story without showing shock, pity, or disgust.', 'Say, "That sounds incredibly painful," or "Thank you for trusting me with that."', 'Your calm acceptance is crucial.'] },
      { id: 'ho10-2', title: 'Reassure Them of Their Worth', steps: ['Remind them of their positive qualities.', 'Stress that their actions do not define their entire being.', 'Express your continued love and respect for them as a person.'] },
    ],
  },
  {
    id: 'emotion-11',
    name: 'Jealousy',
    emoji: '💠',
    color: 'cyan',
    description: "The fear of losing a valued relationship you have to a third party. Jealousy is a three-person situation: You, your partner, and a perceived rival. It's about the threat of losing something you possess.",
    relatedWords: ['Insecurity', 'Suspicion', 'Possessiveness'],
    strategies: {
      immediate: [
        { id: 's11-1', title: 'Pause, Don\'t Pounce', steps: ['Resist the urge to immediately act on jealous feelings (e.g., checking phone, making accusations).', 'Take a few deep breaths to create space between the feeling and your reaction.'] },
        { id: 's11-2', title: 'Reality Check', steps: ['Ask yourself: "What is the concrete evidence for my fear?"', 'Is there another, more generous explanation for what I\'m seeing or hearing?', 'Challenge your assumptions.'] },
      ],
      shortTerm: [
        { id: 's11-3', title: 'Communicate Your Feelings Gently', steps: ['Use "I" statements. Instead of "You were flirting!", try "When I saw that, I felt insecure and scared of losing you."', 'Focus on your feeling, not their perceived crime.'] },
        { id: 's11-4', title: 'Address the Underlying Insecurity', steps: ['What is the jealousy really about? Is it a fear of not being good enough?', 'Journal or reflect on the root cause of the insecurity.'] },
      ],
      longTerm: [
        { id: 's11-5', title: 'Build Your Self-Esteem', steps: ['Invest in your own hobbies, friendships, and goals.', 'The more confident and fulfilled you are as an individual, the less your worth is tied to the relationship.', 'Become your own source of validation.'] },
        { id: 's11-6', title: 'Cultivate Relational Trust', steps: ['Work on building a foundation of trust with your partner.', 'This comes from open communication, consistent behavior, and mutual respect over time.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho11-1', title: 'Listen to the Underlying Fear', steps: ['Hear the fear of loss beneath their anger or suspicion.', 'Validate it: "It sounds like you\'re really scared of losing me/this relationship."', 'Acknowledge the vulnerability.'] },
      { id: 'ho11-2', title: 'Offer Honest Reassurance', steps: ['Provide honest, specific reassurance of your commitment and feelings for them.', 'Avoid being dismissive ("You\'re being crazy"). This will only escalate their fear.'] },
    ],
  },
  {
    id: 'emotion-12',
    name: 'Awe',
    emoji: '✨',
    color: 'sky',
    description: 'A feeling of reverential respect mixed with wonder, often in response to something vast that transcends understanding.',
    relatedWords: ['Wonder', 'Amazement', 'Veneration'],
    strategies: {
      immediate: [
        { id: 's12-1', title: 'Stay With the Feeling', steps: ['Don\'t rush to take a photo or post about it.', 'Just be present with the sensation. Notice how it feels in your body.', 'Let yourself feel small, in a good way.'] },
        { id: 's12-2', title: 'Let Go of Understanding', steps: ['Awe often comes from things we can\'t fully comprehend.', 'Allow yourself to simply experience it without needing to analyze it immediately.', 'Embrace the mystery.'] },
      ],
      shortTerm: [
        { id: 's12-3', title: 'Share the Experience', steps: ['Talk about what you saw, heard, or felt with someone else.', 'Explaining it to another person can prolong and deepen the feeling for you.', 'Share the wonder.'] },
        { id: 's12-4', title: 'Journal or Create', steps: ['Write about the experience in detail.', 'Draw it, or express it in some other creative way.', 'This helps you integrate the feeling and its meaning.'] },
      ],
      longTerm: [
        { id: 's12-5', title: 'Actively Seek Awe', steps: ['Make time for activities that are likely to induce awe.', 'Examples: spending time in nature, visiting a museum, listening to epic music, learning about space.'] },
        { id: 's12-6', title: 'Practice "Awe Walks"', steps: ['Go for a walk with the specific intention of noticing things that are vast, amazing, or wonderful.', 'Shift your focus from the mundane to the magnificent that is all around you.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho12-1', title: 'Share the Silence', steps: ['If you are with someone experiencing awe, resist the urge to fill the silence with chatter.', 'Simply be present with them and share the moment.', 'Respect their internal experience.'] },
      { id: 'ho12-2', title: 'Ask Open-Ended Questions Later', steps: ['After the moment has passed, you can ask questions like "What was that like for you?"', 'This helps them process and reflect on the powerful experience.'] },
    ],
  },
];